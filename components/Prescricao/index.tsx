import React, { useEffect, useState } from "react";
import { Prescricao } from "@/types/Prescricao";
import { ItemMedicamento } from "@/types/ItemMedicamento";
import { ItemCuidado } from "@/types/ItemCuidado";
import { Medicamento } from "@/types/Medicamento";
import {
  UnidadeDosagem,
  dosagemNumericaMapping,
} from "@/types/Enum/UnidadeDosagem";
import {
  IntervaloTempo,
  IntervaloTempoMapping,
} from "@/types/Enum/IntervaloTempo";
import fetcher from "@/api/fetcher";
import Loader from "../Loader";
import moment from "moment";
import { getEnums } from "@/utils/getEnums";

interface PrescricaoFormProps {
  id: string;
}

const PrescricaoForm: React.FC<PrescricaoFormProps> = ({ id }) => {
  const [prescricao, setPrescricao] = useState<Prescricao>();

  const [internamento, setInternamento] = useState<Internacao>();

  const [medicacao, setMedicacao] = useState<ItemMedicamento>();
  const [medicacoes, setMedicacoes] = useState<ItemMedicamento[]>([]);

  const [cuidado, setCuidado] = useState<ItemCuidado>();
  const [cuidados, setCuidados] = useState<ItemCuidado[]>([]);

  const [medicamento, setMedicamento] = useState<Medicamento>();
  const [listaMedicamentos, setListaMedicamentos] = useState<Medicamento[]>([]);

  const [loading, setLoading] = useState(false);

  const [tempo, setTempo] = useState(1);
  const [intervalo, setIntervalo] = useState<IntervaloTempo>(
    IntervaloTempo.DIAS,
  );
  const [intervalos, setIntervalos] = useState<IntervaloTempo[]>([]);

  const [dose, setDose] = useState(1);
  const [dosagem, setDosagem] = useState<UnidadeDosagem>(
    UnidadeDosagem.COMPRIMIDO,
  );
  const [dosagens, setDosagens] = useState<UnidadeDosagem[]>([]);

  const [sugestoes, setSugestoes] = useState<{
    itensCuidado: ItemCuidado[];
    itensMedicamento: ItemSugestaoMedicamento[];
  }>({ itensCuidado: [], itensMedicamento: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enunsData = await getEnums();
        Object.keys(enunsData.TiposInfeccaoPreviaEnum).map((key) => ({
          nome: key.replace(/_/g, " "),
          valor: enunsData.TiposInfeccaoPreviaEnum[key],
        }));
        setDosagens(enunsData.UnidadesDosagemEnum);
        setIntervalos(enunsData.UnidadesIntervaloTempoEnum);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataMedicamentos = async () => {
      try {
        const listaMedicamentos = await fetcher({
          metodo: "GET",
          rota: "/Medicamento/GetAllMedicamentos",
        });
        setListaMedicamentos(listaMedicamentos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataMedicamentos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internamento = await fetcher({
          metodo: "GET",
          rota: `/Internacao/GetInternacaoAtual?pacienteId=${id}`,
        });
        setInternamento(internamento);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    setMedicacao({
      medicamento: medicamento,
      dose: dose,
      unidadeDosagem: dosagem,
      intervalo: tempo,
      intervaloTempo: intervalo,
    });
  }, [medicamento, dose, dosagem, tempo, intervalo]);

  useEffect(() => {
    setPrescricao({
      medicacoes: medicacoes,
      cuidados: cuidados,
    });
  }, [medicacoes, cuidados]);

  const handleAddMedicacao = () => {
    if (medicacao && medicacao.medicamento && medicacao.dose) {
      setMedicacoes((prevMedicacoes) => [medicacao, ...prevMedicacoes]);
      setDosagem(UnidadeDosagem.COMPRIMIDO);
      setDose(1);
      setIntervalo(IntervaloTempo.DIAS);
      setTempo(1);
    }
  };

  const handleRemoveMedicacao = (index: number) => {
    setMedicacoes((prevMedicacoes) => {
      const newMedicacoes = [...prevMedicacoes];
      newMedicacoes.splice(index, 1);
      return newMedicacoes;
    });
  };

  const handleAddCuidado = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (cuidado && cuidado?.descricao.trim() !== "") {
        setCuidados((prevCuidados) => [cuidado, ...prevCuidados]);
        setCuidado({ descricao: "" });
      }
    }
  };

  const handleRemoveCuidado = (index: number) => {
    setCuidados((prevCuidados) => {
      const newCuidados = [...prevCuidados];
      newCuidados.splice(index, 1);
      return newCuidados;
    });
  };

  const formatarMedicamentos = () => {
    if (prescricao?.medicacoes) {
      const medicamentosFormatados = prescricao.medicacoes.map((item) => {
        return {
          intervaloTempo: IntervaloTempoMapping[item.intervaloTempo],
          unidadeDosagem: dosagemNumericaMapping[item.unidadeDosagem],
          intervalo: item.intervalo,
          dose: item.dose,
          idMedicamento: item.medicamento ? item.medicamento.id : 0,
        };
      });
      return medicamentosFormatados;
    }
  };

  const gerarPrescricao = async () => {
    setLoading(true);
    // console.log(dosagemNumericaMapping["mg"]);
    // console.log(obterValorNumericoDosagem("mg"));
    const meds = formatarMedicamentos();
    try {
      console.log({
        dataSolicitacao: moment().toISOString(),
        itensCuidado: prescricao?.cuidados,
        itensMedicamento: meds,
        urgente: true,
        idInternamento: internamento?.id,
      });
      const response = await fetcher({
        rota: "/Prescricao/CadastrarPrescricao",
        metodo: "POST",
        body: {
          dataSolicitacao: moment().toISOString(),
          itensCuidado: prescricao?.cuidados,
          itensMedicamento: meds,
          urgente: true,
          idInternamento: internamento?.id,
        },
      });
      setCuidados([]);
      setMedicacoes([]);
      setPrescricao({
        medicacoes: medicacoes,
        cuidados: cuidados,
      });
    } catch (error) {
      console.error(error);
    }

    const filePath = `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Prescricao/GetPrescricaoMedica?pacienteId=${id}`;
    fetch(filePath)
      .then((res) => {
        res.arrayBuffer().then((bytes) => {
          const blob = new Blob([bytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setMedicacoes([]);
    setCuidados([]);
    const fetchData = async () => {
      try {
        const internacao = await fetcher({
          metodo: "GET",
          rota: `/Internacao/GetInternacaoAtual?pacienteId=${id}`,
        });
        setSugestoes(internacao.sugestoes);
      } catch (error) {}
    };
    if (id) fetchData();
  }, [id]);

  type ItemSugestaoMedicamento = {
    idMedicamento?: number;
    medicamento: string;
    dose: number;
    unidadeDosagem: UnidadeDosagem | string;
    intervalo: number;
    intervaloTempo: IntervaloTempo | string;
  };

  useEffect(() => {
    const setFormData = () => {
      const itensCuidado: ItemCuidado[] = sugestoes.itensCuidado
        .filter((item) => item.descricao !== "")
        .map((item) => ({
          descricao: item.descricao,
        }));

      setCuidados(itensCuidado);

      const itensMedicamento: ItemMedicamento[] =
        sugestoes.itensMedicamento.map((item: ItemSugestaoMedicamento) => ({
          medicamento: { id: item.idMedicamento, nome: item.medicamento },
          dose: item.dose,
          unidadeDosagem:
            UnidadeDosagem[item.unidadeDosagem as keyof typeof UnidadeDosagem],
          intervalo: item.intervalo,
          intervaloTempo:
            IntervaloTempo[item.intervaloTempo as keyof typeof IntervaloTempo],
        }));
      setMedicacoes(itensMedicamento);
    };
    if (sugestoes) setFormData();
  }, [sugestoes]);

  return (
    <>
      {loading && <Loader />}
      <div className="flex mx-1 flex-col gap-x-6 py-5 px-6 bg-[#EAEAEA] detalhes-paciente">
        <div className="flex items-center w-full">
          <h1 className="text-3xl mt-3">Prescrição</h1>
          <button
            className="flex items-center justify-center ml-auto bg-blue-700 hover:bg-blue-900 text-sm w-32 h-[40px] rounded font-semibold text-white justify-content"
            onClick={gerarPrescricao}
          >
            Prescrever
          </button>
        </div>
        <div className="pt-4 flex gap-4 pb-8">
          <div className="bg-white w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
            <div>
              <label htmlFor="add-medicacao">Adicionar medicação</label>
              <div
                id="add-medicacao"
                className="my-2 border p-2 rounded-md shadow-md gap-2"
              >
                <div className="flex items-center">
                  <label htmlFor="medicamento">Medicamento</label>
                  <select
                    className="ml-auto pr-2 py-1 text-right rounded"
                    id="medicamento"
                    value={medicamento?.nome}
                    onChange={(e) => {
                      const medicamento = listaMedicamentos.find(
                        (med) => med.nome === e.target.value,
                      );
                      setMedicamento(medicamento);
                    }}
                  >
                    <option value="">Selecione...</option>
                    {listaMedicamentos.map((opcao) => (
                      <option key={opcao.id} value={opcao.nome}>
                        {opcao.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="dose">Dose</label>
                  <input
                    className="ml-auto w-20 text-right pr-2 py-1 rounded"
                    id="dose"
                    min={1}
                    type="number"
                    pattern="[0-9]+([\.,][0-9]+)?"
                    step="0.01"
                    maxLength={8}
                    onChange={(e) => {
                      setDose(parseFloat(e.target.value));
                    }}
                    value={dose}
                  />
                  <select
                    className="ml-0 w-28 text-right pr-2 py-1 rounded"
                    id="dosagem"
                    value={dosagem}
                    onChange={(e) => {
                      const dose = Object.values(UnidadeDosagem).find(
                        (dose) => dose === e.target.value,
                      );
                      setDosagem(dose ? dose : UnidadeDosagem.COMPRIMIDO);
                    }}
                  >
                    {Object.values(UnidadeDosagem).map((opcao, index) => (
                      <option key={`${opcao}${index}`} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="tempo">Intervalo de tempo</label>
                  <input
                    className="ml-auto w-14 text-right pr-2 py-1 rounded"
                    min={1}
                    id="tempo"
                    type="number"
                    maxLength={6}
                    onChange={(e) => setTempo(parseInt(e.target.value))}
                    value={tempo}
                  />
                  <select
                    className="ml-0 w-28 text-right pr-2 py-1 rounded"
                    id="intervalo-tempo"
                    value={intervalo}
                    onChange={(e) => {
                      const intervalo = Object.values(IntervaloTempo).find(
                        (dose) => dose === e.target.value,
                      );
                      setIntervalo(intervalo ? intervalo : IntervaloTempo.DIAS);
                    }}
                  >
                    {Object.values(IntervaloTempo).map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="ml-auto mt-2 w-10 h-6 flex items-center justify-center bg-orange-500 text-white rounded-xl"
                    onClick={() => handleAddMedicacao()}
                  >
                    <span className="text-xl font-bold font-mono">+</span>
                  </button>
                </div>
              </div>
              <label htmlFor="lista-medicacoes">Medicações</label>
              <div
                id="lista-medicacoes"
                className="p-4 border mt-1 bg-gray-100"
              >
                <ul>
                  {medicacoes.map((item, index) => (
                    <>
                      <li
                        key={index}
                        className="flex items-center mb-2 mt-1 bg-gray-100 p-2 rounded"
                      >
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                            onClick={() => handleRemoveMedicacao(index)}
                          >
                            <span className="text-sm font-bold font-mono inline-block">
                              x
                            </span>
                          </button>
                        </div>
                        <span>
                          {item.medicamento?.nome +
                            " " +
                            item.dose +
                            " " +
                            item.unidadeDosagem +
                            " de " +
                            item.intervalo +
                            "/" +
                            item.intervalo +
                            " " +
                            item.intervaloTempo}
                        </span>
                      </li>
                      <div className="border-b border-gray"></div>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white w-[50%] min-h-[200px] bg-[#a9aee3] p-4 rounded-lg">
            <label htmlFor="add-cuidado">Adicionar cuidado</label>
            <div id="add-cuidado">
              <input
                className="border-2 border-solid w-full h-8 border-gray-300 focus:border-orange-500 focus:outline-none rounded p-2"
                id="add-cuidado"
                type="text"
                onChange={(e) => setCuidado({ descricao: e.target.value })}
                value={cuidado?.descricao || ""}
                onKeyDown={handleAddCuidado}
              />
            </div>
            <label htmlFor="lista-cuidados">Cuidados</label>
            <div id="lista-cuidados" className={"p-4 border mt-1 bg-gray-100"}>
              <ul>
                {cuidados.map((item, index) => (
                  <>
                    <li
                      key={index}
                      className="flex items-center mb-2 mt-1 bg-gray-100 p-2 rounded"
                    >
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="mr-4 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                          onClick={() => handleRemoveCuidado(index)}
                        >
                          <span className="text-sm font-bold font-mono inline-block">
                            x
                          </span>
                        </button>
                      </div>
                      <span>{item.descricao}</span>
                    </li>
                    <div className="border-b border-gray"></div>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescricaoForm;
