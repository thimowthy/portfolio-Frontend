import React, { useEffect, useState } from "react";
import Image from "next/image";
import exameCinza from "@/public/medical-report-gray.png";
import Router from "next/router";
import fetcher from "@/api/fetcher";
import { getEnuns } from "@/utils/getEnums";
import ListaSintomas from "../ListaSintomas";
import { stringify } from "querystring";

interface SintomasFormProps {
  id: string;
}
const SintomasForm: React.FC<SintomasFormProps> = ({ id }) => {

  const formData = {
    suspeitaInfeccao: false,
    sintomasRespiratorios: false,
    //suspeitaSepse: true,
    //presencaUlceras: true,
    //presencaDiarreia: true,
    infeccaoCateter: false,
    infeccaoPele: false,
    pneumonia: false,
    gramCrescente: false,
    rxToraxAlterado: false,
    sepseAbdominal: false,
    tiflite: false,
    celulitePerianal: false,
    ulceraBucal: false,
    diarreia: false,
  };
  const labels = ["Suspeita de infeccção relacionada ao catéter",
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
  const [situacaoTratamento, setSituacaoTratamento] = useState<Record<string, boolean>>();
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [infeccao, setInfeccao] = useState<number>();

  useEffect(() => {
    if (situacaoTratamento) {
      const sintomasFiltrados = Object.fromEntries(
        Object.entries(situacaoTratamento)
          .filter(([chave]) => !["dataVerificacao", "instabilidadeHemodinamica",
            "infeccaoPrevia", "id", "idPaciente", "itensReceita",
            "paciente", "situacaoPaciente", "suspeitaSepse",
            "presencaUlceras", "presencaDiarreia"].includes(chave))
      );

      setSintomas(sintomasFiltrados);
    }
  }, [situacaoTratamento]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const situacaoTratamento = await fetcher({
          rota: `/Prescricao/GetCurrentSituacaoTratamento?pacienteId=${id}`,
          metodo: "GET",
        });
        setSituacaoTratamento(situacaoTratamento);
        setInstabilidadeH(situacaoTratamento.instabilidadeHemodinamica);
        setInfeccao(situacaoTratamento.infeccaoPrevia);
      } catch (error) { }
    };
    if (id)
      fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enunsData = await getEnuns();
        setInfeccaoEnum(Object.keys(enunsData.TiposInfeccaoPreviaEnum).map(key => ({
          nome: key.replace(/_/g, " "),
          valor: enunsData.TiposInfeccaoPreviaEnum[key]
        })));
      } catch (error) { }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (key: string) => {
    setSintomas((prevData) => ({
      ...prevData,
      [key]: !prevData[key],
    }));
  };

  const handleSubmit = () => {
    const now = new Date();
    const response = fetcher({
      rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Prescricao/AddSituacaoTratamento?pacienteId=${id}`,
      metodo: "POST",
      cabecalho: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataVerificacao: now.toISOString(),
        instabilidadeHemodinamica: instabilidadeH,
        infeccaoPrevia: infeccao,
        suspeitaSepse: false,
        presencaUlceras: false,
        presencaDiarreia: false,
        ...sintomas
      })
    });
    console.log(response);
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
      <div className="pt-8 border-2 p-4 bg-[#e1ecea] mt-4">
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
          <ListaSintomas sintomas={sintomas} labels={labels} handleCheckboxChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  );
};

export default SintomasForm;
