import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { format } from "date-fns-tz";
import { ExameProps } from "./../ExameProps";
import { getId } from "@/hooks/getId";

const unidades = [
  { id: 1, nome: "Unidade 1" },
  { id: 2, nome: "Unidade 2" },
];

const tipos = [
  { id: 1, nome: "Hemograma" },
  { id: 2, nome: "Exame" },
];

const timeZone = "America/Sao_Paulo";
const currentDate = format(new Date(), "yyyy-MM-dd", { timeZone });

const ExameForm: React.FC<ExameProps> = ({
  id,
  paciente,
  leito,
  prontuario,
}) => {
  const [unidade, setUnidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataSolicitacao, setDataSolicitacao] = useState(currentDate);
  const [nome, setNome] = useState("");
  const [nomePaciente, setPaciente] = useState(paciente);
  const [numProntuario, setProntuario] = useState(prontuario);
  const [numLeito, setLeito] = useState(leito);
  const [quarto, setQuarto] = useState("");
  const [solicitadoPor, setSolicitadoPor] = useState("");

  useEffect(() => {
    setSolicitadoPor(getId(localStorage.getItem("Authorization")));
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const exameData = {
      idPaciente: id,
      idSolicitante: solicitadoPor,
    };
    try {
      const response = await fetch(
        "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Exame/AddHemograma",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exameData),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Request successful!");
      } else {
        console.log("Request failed!");
      }
    } catch (error) {
      console.error("Error occurred during request:", error);
    }

    //console.log("Login credentials:", { username, password });
  };

  return (
    <div className={styles.form}>
      <div className={styles.divExame}>
        <div className={styles.unidade}>
          <label>Unidade</label>
          <select onChange={(e) => setUnidade(e.target.value)} value={unidade}>
            {unidades.map((unidadeOption) => (
              <option
                key={unidadeOption.id}
                value={unidadeOption.id.toString()}
              >
                {unidadeOption.nome}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.tipo}>
          <label>Tipo</label>
          <select onChange={(e) => setTipo(e.target.value)} value={tipo}>
            {tipos.map((tipoOption) => (
              <option key={tipoOption.id} value={tipoOption.id.toString()}>
                {tipoOption.nome}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.data}>
          <label>Data de solicitação</label>
          <input
            type="date"
            onChange={(e) => setDataSolicitacao(e.target.value)}
            value={dataSolicitacao}
          />
        </div>
      </div>
      <div className={styles.nome}>
        <label>Exame</label>
        <input
          type="text"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />
      </div>
      <div className={styles.divExame}>
        <label>Nº do Prontuário</label>
        <input
          type="text"
          disabled
          onChange={(e) => setProntuario(e.target.value)}
          value={numProntuario}
        />
        <label>Leito</label>
        <input
          type="text"
          disabled
          className={styles.shortInput}
          onChange={(e) => setLeito(e.target.value)}
          value={numLeito}
        />
        <label>Quarto</label>
        <input
          type="text"
          className={styles.shortInput}
          onChange={(e) => setQuarto(e.target.value)}
          value={quarto}
        />
      </div>
      <div className={styles.nome}>
        <label>Paciente</label>
        <input
          type="text"
          disabled
          onChange={(e) => setPaciente(e.target.value)}
          value={nomePaciente.toUpperCase()}
        />
      </div>
      <div>
        <label>Solicitado Por</label>
        <input disabled type="text" value={solicitadoPor} />
      </div>
      <div className={styles.btnDiv}>
        <button
          type="button"
          className="w-48 h-12 rounded-lg bg-[#C55A11] text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
          onClick={handleSubmit}
        >
          Enviar Solicitação
        </button>
      </div>
    </div>
  );
};

export default ExameForm;
