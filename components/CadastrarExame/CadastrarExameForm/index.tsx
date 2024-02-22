import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { format } from "date-fns-tz";
import { CrudExameProps } from "../CrudExameProps";
import { getId } from "@/hooks/getId";
import { TiposExame } from "@/types/Enum/TiposExame";
import { convertDateFormat } from "@/utils/convertDateFormat";
import fetcher from "@/api/fetcher";
import { formatCPF } from "@/utils/formatCPF";

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

const ExameForm: React.FC<CrudExameProps> = ({ pacientes, medicos, exame }) => {
  const [idPaciente, setIdPaciente] = useState<number>();
  const [cpf, setCPF] = useState("");
  const [cpfFormated, setCpfFormated] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [numProntuario, setProntuario] = useState("");
  const [cns, setCNS] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [leito, setLeito] = useState("");

  const [idMedico, setIdMedico] = useState<number>();
  const [cpfMedicoFormated, setCpfMedicoFormated] = useState("");
  const [cpfMedico, setCpfMedico] = useState("");
  const [solicitadoPor, setSolicitadoPor] = useState("");

  const [cadastradoPor, setCadastradoPor] = useState("");
  const [dataSolicitacao, setDataSolicitacao] = useState("");
  const [dataSolicitacaoFormated, setDataSolicitacaoFormated] = useState("");
  const [dataResultado, setDataResultado] = useState(currentDate);
  const [dataResultadoFormated, setDataResultadoFormated] = useState("");
  const [tipoExame, setTipoExame] = useState<TiposExame>(
    TiposExame.HEMORAGRAMA,
  );

  const [pacienteNaoEncontrado, setPacienteNaoEncontrado] = useState(false);
  const [neutrofilos, setNeutrofilos] = useState<number>(0);

  const [idInternacao, setIdInternacao] = useState<number>();

  useEffect(() => {
    if (dataResultado)
      setDataResultadoFormated(convertDateFormat(dataResultado, "yyyy-mm-dd"));
    if (dataSolicitacao)
      setDataSolicitacaoFormated(
        convertDateFormat(dataSolicitacao, "yyyy-mm-dd"),
      );
  }, [dataSolicitacao, dataResultado]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internacao = await fetcher({
          metodo: "GET",
          rota: `/Internacao/GetInternacaoAtual?pacienteId=${idPaciente}`,
        });
        setIdInternacao(internacao.id);
      } catch (error) {}
    };
    if (idPaciente) fetchData();
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

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    if (dataSolicitacao && dataResultado && numProntuario && cpfMedico) {
      if (!exame) {
        if (tipoExame === TiposExame.HEMORAGRAMA) {
          const hemogramaData = {
            neutrofilos: neutrofilos,
            dataSolicitacao: dataSolicitacao,
            dataResultado: dataResultado,
            urgente: true,
            idInternamento: idInternacao,
            idSolicitante: idMedico,
          };
          try {
            const response = await fetcher({
              metodo: "POST",
              rota: "/Exame/AddHemograma",
              body: JSON.stringify(hemogramaData),
              cabecalho: { "Content-Type": "application/json" },
            });
          } catch (error) {
            console.error("Error occurred during request:", error);
          }
        }
      } else {
        if (tipoExame === TiposExame.HEMORAGRAMA) {
          const hemogramaData = {
            contagemNeutrofilos: neutrofilos,
            dataSolicitacao: dataSolicitacao,
            dataResultado: dataResultado,
          };
          try {
            const response = await fetcher({
              metodo: "PUT",
              rota: `/Exame/PutExame/${exame.id}`,
              cabecalho: { "Content-Type": "application/json" },
              body: JSON.stringify(hemogramaData),
            });
          } catch (error) {
            console.error("Error occurred during request:", error);
          }
        }
      }
      window.location.reload();
    }
  };

  const cleanPacienteUseStates = () => {
    setCPF("");
    setProntuario("");
    setNomePaciente("");
    setCNS("");
    setLeito("");
    setDataNasc("");
    setDataAdmissao("");
  };

  const cleanMedicoUseStates = () => {
    setCpfMedico("");
    setSolicitadoPor("");
  };

  const cleanExameUseStates = () => {
    setDataResultadoFormated("");
    setDataSolicitacaoFormated("");
    setNeutrofilos(0);
  };

  const cleanUseStates = () => {
    cleanPacienteUseStates();
    cleanMedicoUseStates();
    cleanExameUseStates();
  };

  const fetchPacienteData = async () => {
    try {
      const internamento = await fetcher({
        metodo: "GET",
        rota: `/Internacao/GetPacientePeloInternamento?internamentoId=${exame?.idInternamento}`,
      });

      const pacienteEncontrado = internamento?.Paciente;

      if (pacienteEncontrado) {
        setIdPaciente(pacienteEncontrado.ID);
        setProntuario(pacienteEncontrado.NumeroProntuario);
        setCPF(pacienteEncontrado.CPF);
        setNomePaciente(pacienteEncontrado.Nome);
        setCNS(pacienteEncontrado.CNS);
        setLeito(internamento.Leito);
        setDataNasc(pacienteEncontrado.DataNascimento);
        setDataAdmissao(internamento.DataAdmissao);
        setPacienteNaoEncontrado(false);
      }
    } catch (error) {
      cleanPacienteUseStates();
    }
  };

  useEffect(() => {
    const fetchMedicoData = () => {
      const medicoEncontrado = medicos.find(
        (medico) => medico.id === exame!.idSolicitante,
      );

      if (medicoEncontrado) {
        setIdMedico(medicoEncontrado.id);
        setCpfMedico(medicoEncontrado.cpf);
        setSolicitadoPor(medicoEncontrado.nome);
      } else cleanMedicoUseStates();
    };
    const fetchExameData = () => {
      setDataSolicitacao(
        convertDateFormat(exame!.dataSolicitacao, "yyyy-mm-dd"),
      );
      setDataResultado(convertDateFormat(exame!.dataResultado, "yyyy-mm-dd"));
    };
    if (exame) {
      fetchPacienteData();
      fetchMedicoData();
      fetchExameData();
    } else {
      cleanPacienteUseStates();
      cleanMedicoUseStates();
      cleanExameUseStates();
    }
  }, [exame, medicos]);

  const autoFillPacienteInputs = async () => {
    const pacienteEncontrado = pacientes.find(
      (paciente) => paciente.numeroProntuario === numProntuario,
    );

    async function getInternamento() {
      try {
        const internacaoAtual = await fetcher({
          metodo: "GET",
          rota: `/Internacao/GetInternacaoAtual?pacienteId=${pacienteEncontrado?.id}`,
        });
        return internacaoAtual;
      } catch (err) {
        console.log(err);
      }
    }

    if (pacienteEncontrado) {
      try {
        const internamento = await getInternamento();
        setPacienteNaoEncontrado(false);
        setIdPaciente(pacienteEncontrado?.id);
        setCPF(pacienteEncontrado.cpf || "");
        setNomePaciente(pacienteEncontrado.nome || "");
        setIdInternacao(internamento.id);
        setCNS(pacienteEncontrado.cns || "");
        setLeito(internamento?.Leito);
        setDataNasc(pacienteEncontrado.dataNascimento || "");
        setDataAdmissao(pacienteEncontrado.dataAdmissao || "");
      } catch (error) {
        console.log(error);
      }
    } else {
      setPacienteNaoEncontrado(true);
      cleanPacienteUseStates();
    }
  };

  const autoFillMedicoInputs = () => {
    const medicoEncontrado = medicos.find((medico) => medico.cpf === cpfMedico);
    if (medicoEncontrado) {
      setIdMedico(medicoEncontrado?.id);
      setCpfMedico(medicoEncontrado.cpf || "");
      setSolicitadoPor(medicoEncontrado.nome || "");
    } else {
      cleanMedicoUseStates();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="block">
        <div className="flex mb-4">
          <div>
            <label>Prontuário</label>
            <input
              className="w-36"
              type="number"
              step={1}
              value={numProntuario}
              onChange={(e) => {
                setProntuario(e.target.value);
              }}
              onBlur={autoFillPacienteInputs}
              disabled={Boolean(exame)}
            />
            {pacienteNaoEncontrado && (
              <span className="text-red-500">Paciente não encontrado</span>
            )}
          </div>
          <div>
            <label>CPF</label>
            <input
              className="w-36"
              type="text"
              maxLength={11}
              value={cpfFormated}
              onChange={(e) => {
                setCPF(e.target.value);
              }}
              disabled
            />
          </div>
          <div>
            <label>CNS</label>
            <input className="w-36" type="text" value={cns} disabled />
          </div>
          <div>
            <label>Data de Admissão</label>
            <input className="w-40" type="date" value={dataAdmissao} disabled />
          </div>
          <div className="w-32">
            <label>Leito</label>
            <input className="w-full" type="text" value={leito} disabled />
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
            <input className="w-40" type="date" value={dataNasc} disabled />
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
            required
            onChange={(e) => {
              setCpfMedico(e.target.value);
            }}
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
            onChange={(e) => {
              setSolicitadoPor(e.target.value);
            }}
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
            onChange={(e) => {
              setDataResultado(e.target.value);
            }}
            required
          />
        </div>
        <div className="ml-2">
          <label>Tipo</label>
          <select
            className="block h-10 border rounded p-2 border-gray-300 w-36"
            onChange={(e) => {
              setTipoExame(e.target.value as TiposExame);
            }}
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
            {tipoExame === TiposExame.HEMORAGRAMA && (
              <div>
                <label>Contagem de Neutrófilos</label>
                <input
                  type="number"
                  maxLength={5}
                  value={neutrofilos}
                  onChange={(e) =>
                    setNeutrofilos(parseInt(e.target.value || "0"))
                  }
                  required
                />
              </div>
            )}
            {tipoExame === TiposExame.OUTRO && (
              <div>
                <label>Upload do Exame</label>
                <input className="w-64" type="file" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.btnDiv}>
        {!Boolean(exame) && (
          <button
            type="submit"
            className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-orange-400 transition-colors mt-2 mx-auto font-bold"
          >
            Cadastrar Exame
          </button>
        )}
        {Boolean(exame) && (
          <button
            type="submit"
            className="w-48 h-12 rounded-lg bg-orange-500 text-[#fff] hover:bg-orange-400 transition-colors mt-2 mx-auto font-bold"
          >
            Salvar Exame
          </button>
        )}
      </div>
    </form>
  );
};

export default ExameForm;
