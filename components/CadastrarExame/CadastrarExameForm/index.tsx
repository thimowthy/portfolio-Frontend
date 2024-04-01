import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { format } from "date-fns-tz";
import { CrudExameProps } from "../CrudExameProps";
import { getId } from "@/hooks/getId";
import { TiposExame } from "@/types/Enum/TiposExame";
import { convertDateFormat } from "@/utils/convertDateFormat";
import fetcher from "@/api/fetcher";
import { formatCPF } from "@/utils/formatCPF";
import { getUserCargo } from "@/utils/getCargo";

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

const ExameForm: React.FC<CrudExameProps> = ({ exame }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Profissional[]>([]);

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
  const [cpfMedico, setCpfMedico] = useState(exame?.cpfSolicitante || "");
  const [solicitadoPor, setSolicitadoPor] = useState(exame?.nomeSolicitante || "");

  const [dataSolicitacao, setDataSolicitacao] = useState("");
  const [dataSolicitacaoFormated, setDataSolicitacaoFormated] = useState("");
  const [dataResultado, setDataResultado] = useState(currentDate);
  const [dataResultadoFormated, setDataResultadoFormated] = useState("");
  const [tipoExame, setTipoExame] = useState<TiposExame>(
    TiposExame.HEMORAGRAMA,
  );

  const [pacienteNaoEncontrado, setPacienteNaoEncontrado] = useState(false);
  const [medicoNaoEncontrado, setMedicoNaoEncontrado] = useState(false);
  const [neutrofilos, setNeutrofilos] = useState<number>(exame?.neutrofilos || 0);

  const [idInternacao, setIdInternacao] = useState<number>();
  const [permissaoLab, setPermissaoLab] = useState<boolean>(false);

  useEffect(() => {
    const cargo = getUserCargo();
    if (cargo == "LABORATORISTA") {
      setPermissaoLab(true);
    }
  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const pacientes = await fetcher({
          metodo: "GET",
          rota: "/Paciente/GetListPatientsSemAlta",
        });
        if (pacientes.length > 0) {
          setPacientes(pacientes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPacientes();
  }, []);
  
  useEffect(() => {
    const fetchMedicos = async () => {
      if (permissaoLab) {
        try {
          const medicos = await fetcher({
            metodo: "GET",
            rota: "/Usuario/GetListUsers?filtroCargo=MEDICO",
          });
          if (medicos.length > 0) {
            setMedicos(medicos);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMedicos();
  }, [permissaoLab]);

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
    setDataResultado("");
    setDataSolicitacao("");
    setDataResultadoFormated("");
    setDataSolicitacaoFormated("");
    setNeutrofilos(0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cleanUseStates = () => {
    cleanPacienteUseStates();
    cleanMedicoUseStates();
    cleanExameUseStates();
  };

  useEffect(() => {
    if (!exame) {
      cleanUseStates();
    }
    else {
      setCpfMedico(exame.cpfSolicitante);
      setSolicitadoPor(exame.nomeSolicitante);
    }
  }, [exame]);

  useEffect(() => {
    if (dataResultado)
      setDataResultadoFormated(dataResultado);//convertDateFormat(dataResultado, "yyyy-mm-dd"));
    if (dataSolicitacao)
      setDataSolicitacaoFormated(dataSolicitacao);//convertDateFormat(dataSolicitacao, "yyyy-mm-dd"));
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
    setCpfFormated(formatCPF(cpf));
  }, [cpf]);

  useEffect(() => {
    setCpfMedicoFormated(formatCPF(cpfMedico));
  }, [cpfMedico]);

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    if (dataSolicitacao && dataResultado) {
      const dataSolicitacaoDate = new Date(dataSolicitacao);
      const dataResultadoDate = new Date(dataResultado);

      if (dataResultadoDate < dataSolicitacaoDate) {
        alert("A data do resultado deve ser posterior à data da solicitação.");
        return;
      }
    }

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
            window.location.reload();
          } catch (error) {
            console.error("Error occurred during request:", error);
          }
        }
      }
    }
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
    if (exame) {
      fetchPacienteData();
      setDataSolicitacao(convertDateFormat(exame.dataSolicitacao, "yyyy-mm-dd"));
      setDataResultado(convertDateFormat(exame.dataResultado, "yyyy-mm-dd"));
      setNeutrofilos(exame.neutrofilos);
    } else {
      cleanUseStates();
    }
  }, [exame]);

  const autoFillPacienteInputs = () => {
    
    const pacienteEncontrado = pacientes.find(
      (paciente) => paciente.numeroProntuario === numProntuario,
    );  
    
    const internamento = pacienteEncontrado?.internacao;

    if (pacienteEncontrado && internamento) {
      setPacienteNaoEncontrado(false);
      setIdPaciente(pacienteEncontrado.id);
      setCPF(pacienteEncontrado.cpf || "");
      setNomePaciente(pacienteEncontrado.nome || "");
      setIdInternacao(internamento.id);
      setCNS(pacienteEncontrado.cns || "");
      setLeito(internamento.leito || "");
      setDataNasc(pacienteEncontrado.dataNascimento || "");
      setDataAdmissao(internamento.dataAdmissao || "");
    } else {
      setPacienteNaoEncontrado(true);
      setTimeout(() => {
        setPacienteNaoEncontrado(false);
      }, 3000);
      cleanPacienteUseStates();
    }
  };
  
  const removeMask = (str: string) => {
    return str.replace(/[-.]/g, "");
  };

  const autoFillMedicoInputs = () => {
    const medicoEncontrado = medicos.find((medico) => medico.cpf === cpfMedico);

    if (medicoEncontrado) {
      setMedicoNaoEncontrado(false);
      setIdMedico(medicoEncontrado.id);
      setCpfMedico(medicoEncontrado.cpf);
      setSolicitadoPor(medicoEncontrado.nome);
    } else {
      cleanMedicoUseStates();
      setMedicoNaoEncontrado(true);
      setTimeout(() => {
        setMedicoNaoEncontrado(false);
      }, 3000);
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
            required
            onChange={(e) => {
              setCpfMedico(removeMask(e.target.value));
            }}
            onBlur={autoFillMedicoInputs}
            disabled={Boolean(exame)}
          />
          {medicoNaoEncontrado && (
            <span className="text-red-500">Médico não encontrado</span>
          )}
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
            value={dataSolicitacao}
            disabled={!permissaoLab}
            required
          />
        </div>
        <div>
          <label>Data do Resultado</label>
          <input
            type="date"
            value={dataResultado}
            onChange={(e) => {
              setDataResultado(e.target.value);
            }}
            disabled={!permissaoLab}
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
            disabled={!permissaoLab}
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
                  min="0"
                  maxLength={5}
                  value={neutrofilos}
                  onChange={(e) =>
                    setNeutrofilos(parseInt(e.target.value || "0"))
                  }
                  disabled={!permissaoLab}
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
      {permissaoLab && (
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
      )}
    </form>
  );
};

export default ExameForm;
