import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { format } from "date-fns-tz";
import { CrudExameProps } from "../CrudExameProps";
import { getId } from "@/hooks/getId";
import { TiposExame } from "@/types/Enum/TiposExame";
import { convertDateFormat } from "@/utils/convertDateFormat";

interface TipoOption {
  id: number;
  nome: string;
}

const tipos: TipoOption[] = Object.values(TiposExame).map((tipo, index) => ({
  id: index + 1,
  nome: tipo,
}));

const timeZone = "America/Sao_Paulo";
const currentDate = format(new Date(), "yyyy-MM-dd", { timeZone });


const ExameForm: React.FC<CrudExameProps> = ({
  pacientes,
  medicos,
  exame
}) => {
  const [idPaciente, setIdPaciente] = useState<number>();
  const [cpf, setCPF] = useState("");
  const [cpfFormated, setCpfFormated] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [numProntuario, setProntuario] = useState("");
  const [cns, setCNS] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [unidade, setUnidade] = useState("");
  
  const [idMedico, setIdMedico] = useState<number>();
  const [cpfMedicoFormated, setCpfMedicoFormated] = useState("");
  const [cpfMedico, setCpfMedico] = useState("");
  const [solicitadoPor, setSolicitadoPor] = useState("");

  const [cadastradoPor, setCadastradoPor] = useState("");
  const [dataSolicitacao, setDataSolicitacao] = useState("");
  const [dataSolicitacaoFormated, setDataSolicitacaoFormated] = useState("");
  const [dataResultado, setDataResultado] = useState(currentDate);
  const [dataResultadoFormated, setDataResultadoFormated] = useState("");
  const [tipoExame, setTipoExame] = useState<TiposExame>(TiposExame.HEMORAGRAMA);

  const [pacienteNaoEncontrado, setPacienteNaoEncontrado] = useState(false);
  const [neutrofilos, setNeutrofilos] = useState<number>(exame?.neutrofilos || 0);

  const [idInternacao, setIdInternacao] = useState<number>();
  
  const formatCPF = (cpf: string) => {

    const cpfFormatado = cpf.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );

    return cpfFormatado;
  };

  useEffect(() => {
    if (dataResultado)
      setDataResultadoFormated(convertDateFormat(dataResultado, "yyyy-mm-dd"));
    if (dataSolicitacao)
      setDataSolicitacaoFormated(convertDateFormat(dataSolicitacao, "yyyy-mm-dd"));
  }, [dataSolicitacao, dataResultado]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7091/Internacao/GetInternacaoAtual?pacienteId=${idPaciente}`,
          { method: "GET" }
        );
        if (response.ok) {
          const internacao = await response.json();  
          setIdInternacao(internacao.Id);
        }
      } catch (error) { }
    };
    if (idPaciente)
      fetchData();
  }, [idPaciente]);
  
  useEffect(() => {
    setCadastradoPor(getId(localStorage.getItem("Authorization")));
  }, []);

  useEffect(() => {
    setCpfFormated(formatCPF(cpf));
  }, [cpf]);

  useEffect(() => {
    setCpfMedicoFormated(formatCPF(cpfMedico));
  }, [cpfMedico]);

  const handleSubmit = async (): Promise<void> => {
    if (!exame) {
      if (tipoExame === TiposExame.HEMORAGRAMA) {
        const hemogramaData = {
          neutrofilos: neutrofilos,
          dataSolicitacao: dataSolicitacao,
          dataResultado: dataResultado,
          urgente: true,
          temperatura: 0,
          resultado: "string",
          idInternamento: idInternacao,
          idSolicitante: idMedico
        };
        try {
          const response = await fetch(
            "https://localhost:7091/Exame/AddHemograma",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(hemogramaData),
            },
          );
          if (response.ok) {
            const data = await response;
            console.log("Request successful!");
          } else {
            console.log("Request failed!");
          }
        } catch (error) {
          console.error("Error occurred during request:", error);
        }
      }
    } else {
      if (tipoExame === TiposExame.HEMORAGRAMA) {
        const hemogramaData = {
          contagemNeutrofilos: neutrofilos,
          dataSolicitacao: dataSolicitacao,
          dataResultado: dataResultado
        };
        console.log(hemogramaData);
        try {
          const response = await fetch(
            `https://localhost:7091/Exame/PutExame/${exame.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(hemogramaData),
            },
          );
          if (response.ok) {
            const data = await response;
            console.log("Request successful!");
          } else {
            console.log("Request failed!");
          }
        } catch (error) {
          console.error("Error occurred during request:", error);
        }
      } 
    }
  };

  const cleanUseStates = () => {
    setCPF("");
    setNomePaciente("");
    setCNS("");
    setUnidade("");
    setDataNasc("");
    setDataAdmissao("");
    setCpfMedico("");
    setSolicitadoPor("");
  };

  useEffect(() => {
    if (exame) {
      const medicoEncontrado = medicos.find(medico => medico.id === exame.idSolicitante);
      const pacienteEncontrado = pacientes.find(medico => medico.id === exame.idSolicitante);

      if (medicoEncontrado) {
        setIdMedico(medicoEncontrado.id);
        setCpfMedico(medicoEncontrado.cpf);
        setSolicitadoPor(medicoEncontrado.nome);
        // setIdPaciente(pacienteEncontrado.id);
        // setCPF(pacienteEncontrado.cpf || "");
        // setNomePaciente(pacienteEncontrado.nome || "");
        // setCNS(pacienteEncontrado.cns || "");
        // setUnidade(pacienteEncontrado.unidade || "");
        // setDataNasc(convertDateFormat(pacienteEncontrado.dataNascimento, "yyyy-mm-dd") || "");
        // setDataAdmissao(convertDateFormat(pacienteEncontrado.dataAdmissao, "yyyy-mm-dd") || "");
        setDataSolicitacao(convertDateFormat(exame.dataSolicitacao, "yyyy-mm-dd"));
        setDataResultado(convertDateFormat(exame.dataResultado, "yyyy-mm-dd"));
      }
      else {
        setCpfMedico("");
        setSolicitadoPor("");
        setSolicitadoPor("");
        setCPF("");
        setNomePaciente("");
        setCNS("");
        setUnidade("");
        setDataNasc("");
        setDataAdmissao("");
      }
    }
    else
      cleanUseStates();
  }, [exame, medicos, pacientes]);

  const autoFillPacienteInputs = () => {
    
    const pacienteEncontrado = pacientes.find(paciente => paciente.numeroProntuario === numProntuario);
    
    if (pacienteEncontrado) {
      setPacienteNaoEncontrado(false);
      setIdPaciente(pacienteEncontrado?.id);
      setCPF(pacienteEncontrado.cpf || "");
      setNomePaciente(pacienteEncontrado.nome || "");
      setCNS(pacienteEncontrado.cns || "");
      setUnidade(pacienteEncontrado.unidade || "");
      setDataNasc(pacienteEncontrado.dataNascimento || "");
      setDataAdmissao(pacienteEncontrado.dataAdmissao || "");
    }
    else {
      setPacienteNaoEncontrado(true);
      cleanUseStates();
    }
  };

  const autoFillMedicoInputs = () => {
    
    const medicoEncontrado = medicos.find(medico => medico.cpf === cpfMedico);
    
    if (medicoEncontrado) {
      setIdMedico(medicoEncontrado?.id);
      setCpfMedico(medicoEncontrado.cpf || "");
      setSolicitadoPor(medicoEncontrado.nome || "");
    }
    else {
      cleanUseStates();
    }
  };

  return (
    <div className={styles.form}>
      <div className="block">
        <div className="flex mb-4">
          <div>
            <label>Prontuário</label>
            <input
              className="w-36"
              type="number"
              step={1}
              value={numProntuario}
              onChange={(e) => { setProntuario(e.target.value); }}
              onBlur={autoFillPacienteInputs}
              disabled={Boolean(exame)}
            />
            {pacienteNaoEncontrado && (
              <span className="text-red-500">
                Paciente não encontrado
              </span>
            )}
          </div>
          <div>
            <label>CPF</label>
            <input
              className="w-36"
              type="text"
              maxLength={11}
              value={cpfFormated}
              onChange={(e) => { setCPF(e.target.value); }}
              disabled
            />
          </div>
          <div>
            <label>CNS</label>
            <input
              className="w-36"
              type="text"
              value={cns}
              disabled
            />
          </div>
          <div>
            <label>Data de Admissão</label>
            <input
              className="w-40"
              type="date"
              value={dataAdmissao}
              disabled
            />
          </div>
          <div className="w-32">
            <label>Unidade</label>
            <input
              className="w-full"
              type="text"
              value={unidade}
              disabled
            />
          </div>
        </div>
        <div className="flex mb-8">
          <div className="w-full">
            <label>Nome</label>
            <input
              className="w-full"
              type="text"
              value={nomePaciente}
              disabled
            />
          </div>
          <div className="ml-4">
            <label>Data de Nascimento</label>
            <input
              className="w-40"
              type="date"
              value={dataNasc}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div>
          <label>CPF do Solicitante</label>
          <input
            className="w-40"
            type="text"
            value={cpfMedicoFormated}
            maxLength={11}
            onChange={(e) => { setCpfMedico(e.target.value); }}
            onBlur={autoFillMedicoInputs}
            disabled={Boolean(exame)}
          />
        </div>
        <div className="w-4/5 ml-2">
          <label>Solicitante</label>
          <input
            className="w-full"
            type="text"
            value={solicitadoPor}
            onChange={(e) => { setSolicitadoPor(e.target.value); }}
            disabled
          />
        </div>
      </div>
      <div className={styles.divExame}>
        <div>
          <label>Data de Solicitação</label>
          <input
            type="date"
            onChange={(e) => setDataSolicitacao(e.target.value)}
            value={dataSolicitacaoFormated}
            required
          />
        </div>
        <div>
          <label>Data do Resultado</label>
          <input
            type="date"
            value={dataResultadoFormated}
            onChange={(e) => { setDataResultado(e.target.value); }}
            required
          />
        </div>
        <div className="ml-2">
          <label>Tipo</label>
          <select
            className="block h-10 border rounded p-2 border-gray-300 w-36"
            onChange={(e) => { setTipoExame(e.target.value as TiposExame); }}
            value={tipoExame}
          >
            {tipos.map((tipoOption) => (
              <option key={tipoOption.id} value={tipoOption.nome}>
                {tipoOption.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="flex ml-2">
          <div>
            { tipoExame === TiposExame.HEMORAGRAMA && (
            <div>
              <label>Contagem de Neutrófilos</label>
              <input
                type="number"
                maxLength={5}
                value={neutrofilos}
                onChange={(e) => setNeutrofilos(parseInt(e.target.value || "0")) }
                required
              />
            </div>
          )}
          { tipoExame === TiposExame.OUTRO && (
            <div>
              <label>Upload do Exame</label>
              <input
                className="w-64"
                type="file"
              />
            </div>
          )}
          </div>
        </div>
      </div>
      <div className={styles.btnDiv}>
        {
          !Boolean(exame) && (
            <button
              type="submit"
              className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-orange-400 transition-colors mt-2 mx-auto font-bold"
              onClick={handleSubmit}
            >
              Cadastrar Exame
            </button>
          )
        }
        {
          Boolean(exame) && (
            <button
            type="button"
            className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-orange-400 transition-colors mt-2 mx-auto font-bold"
            onClick={handleSubmit}
            >
              Salvar Exame
            </button>
          )
        }
      </div>
    </div>
  );
};

export default ExameForm;
