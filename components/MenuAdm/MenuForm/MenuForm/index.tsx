import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Router from "next/router";
import Protocolo from "@/types/Protocolo";
import { ProtocoloDB } from "@/types/ProtocoloDB";
import loading from "@/public/loading.gif";
import Image from "next/image";
import router from "next/router";
import tratamentoInicial from "@/components/MenuAdm/CriarTrat/initialTratamento";
import diagnosticoInicial from "@/components/MenuAdm/CriarDiag/initialDiagnostico";

const MenuFormContent = () => {

    const ListaProtocolos: ProtocoloDB[] = [
      {
        id: 1,
        descricao:{ id: 1, nome: "Protocolo Neutropenia 2022 V1.0", ano:"2023", versao:"1.0", diagnostico:{ nodes:{} }, tratamento:{ nodes:{ node1: { id:0, tipo:1, nome:"Nova Prescrição", variavel:"", condicao:"", descricao:"", dest:0, mensagem:"", posicao:[0, 0] } } } },
        ativo:true
      },
      {
        id: 2,
        descricao: { id: 2, nome: "Protocolo Neutropenia 2022 V1.1", ano:"2023", versao:"1.1", diagnostico:{ nodes: diagnosticoInicial }, tratamento: { nodes: tratamentoInicial } },
        ativo: false
      },
      {
        id: 3,
        descricao: { id: 3, nome: "Protocolo Neutropenia 2022 V1.2", ano:"2023", versao:"1.2", diagnostico:{ nodes: diagnosticoInicial }, tratamento:{ nodes: tratamentoInicial } },
        ativo: false
      },
      { 
        id: 4,
        descricao: { id: 4, nome: "Protocolo Neutropenia 2023 V2.0", ano:"2023", versao:"2.0", diagnostico:{ nodes: diagnosticoInicial }, tratamento:{ nodes: tratamentoInicial } },
        ativo: false
      },
    ];
    const [protocolos, setProtocolos] = useState<Protocolo[]>(ListaProtocolos.map(protocoloDB => protocoloDB.descricao));
    const [selectedItemId, setSelectedItemId] = useState<number>(1);

    const handleEfetivarProtocolo = (id: number) => {
      if (id) {

        //const descricao = protocolos.find(protocolo => protocolo.id === id);

        const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ativo: true }),
        };
    
        fetch(`URL/${id}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error("Erro ao efetivar o protocolo");
            }
            return response.json();
          })
          .then(data => {
            console.log("Protocolo efetivado com sucesso", data);
          })
          .catch(error => {
            console.error("Erro:", error);
          });
      }
      else {
        console.log("Selecione um protocolo!");
      }
    };

    const handleEditarProtocolo = (id: number) => {
      
      if (id) {
        const ativo = ListaProtocolos.find(protocoloDB => protocoloDB.ativo === true);

        if (id === ativo?.id) {
          console.log("Você não pode editar um protocolo em execução");
        }
        else {
          const protocoloDB = ListaProtocolos.find(protocoloDB => protocoloDB.id === id);

          router.push({
            pathname: "/criar-protocolo",
            query: { protocolo: JSON.stringify(protocoloDB) },
          });

        }
      }
    };

    const handleItemClick = (itemId: number) => {
      setSelectedItemId(itemId);
      console.log(ListaProtocolos);
    };

    useEffect(() => {
      fetch("")
        .then(response => response.json())
        .then(data => setProtocolos(data))
        .catch(error => console.error("Error ", error));
    }, []);

  return (
    <div className={styles.menuDiv}>
      <div className={styles.buttons}>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          Router.push("/criar-protocolo");
        }}
      >Novo Protocolo</button>
      <button
        className={styles.button}
        type="button"
        onClick={() => handleEditarProtocolo(selectedItemId)}
      >
        Editar Protocolo
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={() => handleEfetivarProtocolo(selectedItemId)}
      >
        Efetivar Protocolo
      </button>
      <div className="mt-8 mb-4 border"></div>
      <button className={styles.button}>
        <Link href="/crud-usuarios">Gerenciar Usuários</Link>
      </button>
      </div>
      <div className={styles.textDiv}>
        <ul>
            { ListaProtocolos.map(protocoloDB => (
              <li
                key={protocoloDB.id}
                onClick={() => handleItemClick(protocoloDB.id)}
                className={`${styles.listItem} ${selectedItemId === protocoloDB.id ? styles.selected : ""}`}
              >
                <span className={styles.marker}>•</span> {protocoloDB.descricao.nome}
                {protocoloDB.ativo && (
                  <Image src={loading} style={{ marginLeft: "10px", width: "30px", maxHeight: "30px" }} title="Em execução" alt="Protocolo vigente"/>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuFormContent;
