/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Router from "next/router";
import Protocolo from "@/types/Protocolo";
import { ProtocoloDB } from "@/types/ProtocoloDB";
import loading from "@/public/loading.gif";
import Image from "next/image";
import SuccessToast from "@/components/toasts/successToast";
import ErrorToast from "@/components/toasts/errorToast";
import router from "next/router";
import fetcher from "@/api/fetcher";

type Prot = {
  id: number;
  descricao: Protocolo;
  ativo?: boolean | undefined;
};
const MenuFormContent = () => {
  const [listaProtocolos, setListaProtocolos] = useState<ProtocoloDB[]>();
  const [protocolos, setProtocolos] = useState<Prot[]>([]);
  const [efetivarSuccess, setEfetivarSuccess] = useState<Boolean>(false);
  const [efetivarError, setEfetivarError] = useState<Boolean>(false);
  const [efetivarEfetivadoError, setEfetivarEfetivadoError] =
    useState<Boolean>(false);
  const [excluirSuccess, setExcluirSuccess] = useState<Boolean>(false);
  const [excluirError, setExcluirError] = useState<Boolean>(false);
  const [editarError, setEditarError] = useState<Boolean>(false);
  const [ativo, setAtivo] = useState<number>();
  const [selectedItemId, setSelectedItemId] = useState<number>(1);

  const handleEfetivarProtocolo = async (id: number) => {
    if (id) {
      if (id === ativo) {
        setEfetivarEfetivadoError(true);
      } else {
        try {
          const response: Response = await fetcher({
            rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Protocolo/EfetivarProtocolo/${id}`,
            metodo: "PUT",
            cabecalho: { "Content-Type": "application/json" },
            body: JSON.stringify(id),
          });
          if (response.ok) setEfetivarSuccess(true);
          if (!response.ok) throw new Error("Erro ao excluir protocolo");
        } catch (error) {
          setEfetivarError(true);
        }
      }
    } else {
      console.log("Selecione um protocolo!");
    }
  };
  const handleEditarProtocolo = (id: number) => {
    if (id) {
      if (id === ativo) {
        console.log("Você não pode editar um protocolo em execução");
      } else {
        const protocoloDB = listaProtocolos?.find(
          (protocoloDB) => protocoloDB.id === id,
        );
        router.push({
          pathname: "/criar-protocolo",
          query: { protocolo: JSON.stringify(protocoloDB) },
        });
      }
    }
  };
  const handleExcluirProtocolo = async (id: number) => {
    if (!id) console.log("Selecione um protocolo!");

    if (id === ativo)
      console.log("Você não pode excluir o protocolo em execução");

    const shouldDelete = window.confirm(
      "Tem certeza de que deseja excluir este protocolo?",
    );

    if (shouldDelete) {
      try {
        const response: Response = await fetcher({
          metodo: "DELETE",
          rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Protocolo/DeleteProtocolo?protocoloId=${id}`,
          cabecalho: { "Content-Type": "application/json" },
          body: JSON.stringify(id),
        });
        console.log(response);
        setExcluirSuccess(true);
      } catch (error) {
        console.log(error);
        setExcluirError(true);
      }
    }
  };

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher({
          rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Protocolo/GetListProtocolo",
          metodo: "GET",
        });
        setListaProtocolos(response);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (listaProtocolos) {
      const protocolos = listaProtocolos?.map((protocoloDB) => ({
        ...protocoloDB,
        descricao: JSON.parse(protocoloDB.descricao),
      }));
      setProtocolos(protocolos);
      setAtivo(listaProtocolos?.find((item) => item.ativo)?.id);
    }
  }, [listaProtocolos]);

  return (
    <>
      <div className={styles.menuDiv}>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              Router.push("/criar-protocolo");
            }}
          >
            Novo Protocolo
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => handleEditarProtocolo(selectedItemId)}
          >
            Editar Protocolo
          </button>
          <button
            className={styles.button}
            type="submit"
            onClick={() => handleEfetivarProtocolo(selectedItemId)}
          >
            Efetivar Protocolo
          </button>
          <button
            className={styles.button}
            type="submit"
            onClick={() => {
              handleExcluirProtocolo(selectedItemId);
            }}
          >
            Excluir Protocolo
          </button>
          <div className="mt-4 mb-2 border"></div>
          <button className={styles.button}>
            <Link href="/crud-usuarios">Gerenciar Usuários</Link>
          </button>
        </div>
        <div className={styles.textDiv}>
          {listaProtocolos && (
            <ul>
              {protocolos.map((protocolo) => (
                <li
                  key={protocolo.id}
                  onClick={() => handleItemClick(protocolo.id)}
                  className={`${styles.listItem} ${
                    selectedItemId === protocolo.id ? styles.selected : ""
                  }`}
                >
                  <span className={styles.marker}>
                    •
                    {"   " +
                      protocolo.descricao.nome +
                      "  v" +
                      protocolo.descricao.versao}
                  </span>
                  {protocolo.ativo && (
                    <Image
                      src={loading}
                      style={{
                        marginLeft: "10px",
                        width: "30px",
                        maxHeight: "30px",
                      }}
                      title="Em execução"
                      alt="Protocolo vigente"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-5 right-5">
          {efetivarSuccess && (
            <SuccessToast
              title="Protocolo Efetivado"
              message="Protocolo efetivado com sucesso!"
              onClose={() => {
                setEfetivarSuccess(false);
              }}
            />
          )}
          {excluirSuccess && (
            <SuccessToast
              title="Protocolo Excluído"
              message="Protocolo excluído com sucesso!"
              onClose={() => {
                setExcluirSuccess(false);
              }}
            />
          )}
          {efetivarError && (
            <ErrorToast
              title="Erro ao efetivar protocolo"
              message="Ocorreu um problema ao efetivar o protocolo"
              onClose={() => {
                setEfetivarError(false);
              }}
            />
          )}
          {efetivarEfetivadoError && (
            <ErrorToast
              title="Protocolo já efetivado!"
              message="O protocolo selecionado já está em execução"
              onClose={() => {
                setEfetivarEfetivadoError(false);
              }}
            />
          )}
          {excluirError && (
            <ErrorToast
              title="Erro ao excluir protocolo"
              message="Ocorreu um problema ao excluir o protocolo"
              onClose={() => {
                setExcluirError(false);
              }}
            />
          )}
          {editarError && (
            <ErrorToast
              title="Erro ao editar protocolo"
              message="Você não pode editar um problema em execução"
              onClose={() => {
                setEditarError(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MenuFormContent;
