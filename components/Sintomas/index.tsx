import React, { useEffect, useState } from "react";
import Image from "next/image";
import exameCinza from "@/public/medical-report-gray.png";
import Router from "next/router";
import fetcher from "@/api/fetcher";
import { getEnums } from "@/utils/getEnums";
import ListaSintomas from "../ListaSintomas";
import { stringify } from "querystring";

const sintomasDefault = {
  SuspeitaInfeccao: false,
  SintomasRespiratorios: false,
  InfeccaoCateter: false,
  InfeccaoPele: false,
  Pneumonia: false,
  GramCrescente: false,
  RxToraxAlterado: false,
  SepseAbdominal: false,
  Tiflite: false,
  CelulitePerianal: false,
  UlceraBucal: false,
  Diarreia: false,
};

interface SintomasFormProps {
  id: string;
  prescricaoTabRef: any;
}
const SintomasForm: React.FC<SintomasFormProps> = ({
  id,
  prescricaoTabRef,
}) => {
  const formData = {
    SuspeitaInfeccao: false,
    SintomasRespiratorios: false,
    InfeccaoCateter: false,
    InfeccaoPele: false,
    Pneumonia: false,
    GramCrescente: false,
    RxToraxAlterado: false,
    SepseAbdominal: false,
    Tiflite: false,
    CelulitePerianal: false,
    UlceraBucal: false,
    Diarreia: false,
  };
  const labels = [
    "Suspeita de infeccção relacionada ao catéter",
    "Sintomas respiratórios",
    "Infeccção relacionada ao catéter",
    "Infecção de pele ou partes moles",
    "Pneumonia",
    "Crescimento de Gram+ na hemocultura",
    "RX Tórax alterado",
    "Suspeita de sepse de foco abdominal ou pélvico",
    "Enterocolite neutropênica (Tiflite)",
    "Celulite Perianal",
    "Presença de úlceras em cavidade oral",
    "Diarreia",
  ];

  const [infeccaoEnum, setInfeccaoEnum] = useState([{ nome: "", valor: 0 }]);
  const [sintomas, setSintomas] = useState<Record<string, boolean>>(formData);
  const [situacaoTratamento, setSituacaoTratamento] =
    useState<Record<string, boolean>>();
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [infeccao, setInfeccao] = useState<number>();

  useEffect(() => {
    if (situacaoTratamento) {
      const sintomasFiltrados = Object.fromEntries(
        Object.entries(situacaoTratamento).filter(
          ([chave]) =>
            ![
              "DataVerificacao",
              "InstabilidadeHemodinamica",
              "InfeccaoPrevia",
              "Id",
              "IdPaciente",
              "ReceitasItens",
              "paciente",
              "situacaoPaciente",
            ].includes(chave),
        ),
      );
      setSintomas(sintomasFiltrados);
    }
  }, [situacaoTratamento]);

  useEffect(() => {
    setSituacaoTratamento(sintomasDefault);
    setInstabilidadeH(false);
    setInfeccao(0);
    const fetchData = async () => {
      try {
        const situacaoTratamento = await fetcher({
          rota: `/Prescricao/GetCurrentSituacaoTratamento?pacienteId=${id}`,
          metodo: "GET",
        });
        setSituacaoTratamento(situacaoTratamento);
        setInstabilidadeH(situacaoTratamento.InstabilidadeHemodinamica);
        setInfeccao(situacaoTratamento.InfeccaoPrevia);
      } catch (error) {}
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enunsData = await getEnums();
        setInfeccaoEnum(
          Object.keys(enunsData.TiposInfeccaoPreviaEnum).map((key) => ({
            nome: key.replace(/_/g, " "),
            valor: enunsData.TiposInfeccaoPreviaEnum[key],
          })),
        );
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (key: string) => {
    setSintomas((prevData) => ({
      ...prevData,
      [key]: !prevData[key],
    }));
  };

  const handleSubmit = async () => {
    const now = new Date();
    try {
      await fetcher({
        rota: `/Prescricao/AddSituacaoTratamento?pacienteId=${id}`,
        metodo: "POST",
        cabecalho: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataVerificacao: now.toISOString(),
          instabilidadeHemodinamica: instabilidadeH,
          infeccaoPrevia: infeccao,
          ...sintomas,
        }),
      });
      console.log(prescricaoTabRef);
      prescricaoTabRef.current.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between">
        <h1 className="text-2xl">Sintomas</h1>
        <button
          className="h-40px px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
      <div className="pt-8 border-2 p-4 bg-[#d9e0df] mt-4">
        <div className="gap-4">
          <div className="flex mb-4 justify-between">
            <p>Instabilidade Hemodinâmica</p>
            <input
              className="w-8"
              type="checkbox"
              name="resposta_form_01_sintomas"
              id="ih_sim"
              onChange={() => setInstabilidadeH(!instabilidadeH)}
              checked={instabilidadeH}
            />
          </div>
          <div className="border-b border-[#cad4d2] my-4" />
          <div className="flex mb-4 justify-between items-center">
            <p>Infeccção prévia</p>
            <select
              className="h-10 w-1/2 rounded p-2"
              id="select_infeccao"
              onChange={(e) => setInfeccao(parseInt(e.target.value))}
              value={infeccao}
            >
              {infeccaoEnum.map((el) => (
                <option
                  key={el.valor}
                  defaultChecked={el.nome === "NAO"}
                  value={el.valor}
                >
                  {el.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="border-b border-[#cad4d2] my-4" />
          <ListaSintomas
            sintomas={sintomas}
            labels={labels}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SintomasForm;
