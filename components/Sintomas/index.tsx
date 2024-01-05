import React, { useEffect, useState } from "react";
import Image from "next/image";
import exameCinza from "@/public/medical-report-gray.png";
import Router from "next/router";
import fetcher from "@/api/fetcher";

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
                  "Suspeita de  infeccção relacionada ao catéter",
                  "Infecção de pele ou partes moles",
                  "Pneumonia",
                  "Crescimento de Gram+ na hemocultura",
                  "RX Tórax alterado",
                  "Suspeita de sepse de foco abdominal/pelve (solicitar TC)",
                  "Suspeita de sepse de foco abdominal ou pélvico",
                  "Enterocolite neutropênica (Tiflite)",
                  "Presença de úlceras em cavidade oral",
                  "Diarreia",
                ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internacaoAtual = await fetcher({
          rota: `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Internacao/ListByPatientId?pacienteId=${id}`,
          metodo: "GET",
        });
        console.log(internacaoAtual);
        setSintomas(internacaoAtual);
      } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
      }
    };
    fetchData();
  }, [id]);

  const [sintomas, setSintomas] = useState<Record<string, boolean>>(formData);
  const [instabilidadeH, setInstabilidadeH] = useState(false);
  const [infeccao, setInfeccao] = useState("");

  const handleEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    if (esp) {
      /* setPrescricao((prevState: Presc) => {
        return {
          sintomas: [...prevState.sintomas, esp?.opcoes[0]],
          cuidados: [...prevState.cuidados, ...esp.cuidados],
          remedios: [...prevState.remedios, ...esp.recomendacoes],
        };
      }); */
    }
  };

  const removeEspecificidadeRadio = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) => el.nome === especificidade);
    /* setPrescricao((prevState: Presc) => {
      const novosSintomas = prevState.sintomas.filter(
        (item) => item !== esp?.opcoes[0],
      );
      const novosCuidados = prevState.cuidados.filter(
        (item) => !esp?.cuidados.includes(item),
      );
      const novosRemedios = prevState.remedios.filter(
        (item) => !esp?.recomendacoes.includes(item),
      );
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios,
      };
    }); */
  };

  const handleEspecificidadeCheck = (especificidade: string) => {
    const esp = especificidadesMrsa.find((el) =>
      el.opcoes.includes(especificidade),
    );
    /* setPrescricao((prevState: Presc) => {
      if (!prevState.sintomas.includes(especificidade)) {
        var novosSintomas = [...prevState.sintomas, especificidade];
      } else {
        var novosSintomas = prevState.sintomas.filter(
          (item) => item !== especificidade,
        );
      }
      const novosCuidados = prevState.cuidados.filter(
        (item) => !esp?.cuidados.includes(item),
      );
      const novosRemedios = prevState.remedios.filter(
        (item) => !esp?.recomendacoes.includes(item),
      );
      return {
        sintomas: novosSintomas,
        cuidados: novosCuidados,
        remedios: novosRemedios,
      };
    }); */
    console.log("");
  };

  const infeccoesSemInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h",
        },
        {
          segunda_opcao: "Pipe-Tazo 4,5g 6/6h",
        },
      ],
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia",
        },
        {
          segunda_opcao: "Meropenem 1g 8/8h (paciente com disfunção renal)",
        },
      ],
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h",
        },
      ],
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
        },
        {
          segunda_opcao:
            "Meropenem 2g 8/8h + Polimixina B 25.000UI/kg/dia (÷ 2 ou 3)",
        },
      ],
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao:
            "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)",
        },
      ],
    },
  ];

  const infeccoesComInstabilidadeHemodinamica = [
    {
      nome: "Nenhuma",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao:
            "Vancomicina 1g 12/12h + Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
        },
      ],
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Linezolida 600 mg 12/12h + Meropenem 1g 8/8h",
        },
      ],
    },
  ];

  const especificidadesMrsa = [
    {
      nome: "esp01",
      opcoes: [
        "Suspeita de infeccção relacionada ao catéter",
        "Infecção de pele ou partes moles",
        "Pneumonia",
        "Crescimento de Gram + na hemocultura",
      ],
      recomendacoes: [
        "Adicionar Vancomicina 15mg/kg/dose EV 12/12h ao esquema inicial",
      ],
      cuidados: [],
    },
    {
      nome: "esp02",
      opcoes: [
        "Suspeita de sepse de foco abdominal/pelve (solicitar TC)",
        "Enterocolite neutropênica (tiflite)",
        "Celulite perianal",
      ],
      recomendacoes: [
        "Acrescentar cobertura p/ anaeróbio (Metronidazol EV 500mg 8/8h)",
      ],
      cuidados: [],
    },
    {
      nome: "esp03",
      opcoes: ["Sinais/sintomas respiratórios", "RX tórax alterado"],
      recomendacoes: [
        "Adicionar Azitromicina 500mg EV/VO 1x/dia",
        "Considerar tratamento de Pneumocistose (SMT/TMP 15 a 20 mg de TMP/kg/dia ÷ 3/4) em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina",
      ],
      cuidados: [
        "Solicitar TC de tórxax",
        "Considerar influenza, em particular nos meses de inverno",
      ],
    },
    {
      nome: "esp04",
      opcoes: ["Presença de úlceras em cavidade oral"],
      recomendacoes: ["Aciclovir EV 5mg/kg 3x/dia + Fluconazol EV 200mg/dia"],
      cuidados: [],
    },
    {
      nome: "esp05",
      opcoes: ["Presença de diarreia"],
      recomendacoes: [
        "Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais. Se sintomas de colite: Metronidazol 500mg VO, 8/8h",
      ],
      cuidados: [],
    },
    {
      nome: "esp06",
      opcoes: ["Infecção relacionada ao catéter"],
      recomendacoes: [],
      cuidados: [
        "Remover o catéter se houver suspeita de infecção relacionada ao mesmo e choque séptico refratário aos antibióticos",
        "Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta",
      ],
    },
  ];


  
  const handleCheckboxChange = (key: string) => {
    setSintomas((prevData) => ({
      ...prevData,
      [key]: !prevData[key],
    }));
    console.log(sintomas);
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between">
        <h1 className="text-2xl">Sintomas</h1>
        <button className="h-40px px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600">
          Salvar
        </button>
      </div>
      <div className="pt-8 border-2 p-4 bg-blue-200 mt-4">
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
          <div className="border-b my-4"/>
          <div className="flex mb-4 justify-between items-center">
            <p>Infeccção prévia</p>
            <select
              className="h-10 w-1/2 rounded p-2"
              id="select_infeccao"
              onChange={(e) => setInfeccao(e.target.value)}
            >
              {infeccoesComInstabilidadeHemodinamica.map((el) => (
                <option
                  key={el.nome}
                  defaultChecked={el.nome === "Nenhuma"}
                  value={el.nome}
                >
                  {el.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="border-b my-4"/>
            {Object.keys(sintomas).map((key, index) => (
              <>
              <div key={key} className="flex mb-4 justify-between">
                <p>{labels[index]}</p>
                <input
                  className="w-8"
                  type="checkbox"
                  onChange={() => handleCheckboxChange(key)}
                  checked={sintomas[key]} />
              </div>
              <div className="border-b my-4" />
              </>
            ))}
          </div>
        </div>
      <div className="grid grid-cols-2 justify-items-center pb-6">
        {especificidadesMrsa.map((el) => (
          <div
            className="flex flex-col mt-3 gap-6 py-6 bg-[#E1ECEA] px-6 w-[300px] rounded-lg items-center justify-center"
            key={el.nome}
          >
            {el.nome !== "esp04" &&
              el.nome !== "esp05" &&
              el.nome !== "esp06" && (
                <div>
                  {el.opcoes.map((children) => (
                    <>
                      <div
                        className="flex flex-col"
                        key={children}
                      >
                        <div className="flex gap-6 items-center justify-start">
                          <input
                            type="checkbox"
                            id={children}
                            onChange={() =>
                              handleEspecificidadeCheck(children)
                            }
                          />
                          <label htmlFor={children}>
                            {children}
                          </label>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            {(el.nome === "esp04" ||
              el.nome === "esp05" ||
              el.nome === "esp06") && (
                <div className="flex flex-col">
                  <p>{el.opcoes[0]}</p>
                  <div className="flex items-center justify-center gap-4">
                    <input
                      type="radio"
                      id={el.opcoes[0] + "sim"}
                      name={el.opcoes[0]}
                      onChange={() =>
                        handleEspecificidadeRadio(el.nome)
                      }
                    />
                    <label htmlFor={el.opcoes[0] + "sim"}>
                      Sim
                    </label>
                    <input
                      type="radio"
                      id={el.opcoes[0] + "nao"}
                      name={el.opcoes[0]}
                      onChange={() =>
                        removeEspecificidadeRadio(el.nome)
                      }
                    />
                    <label htmlFor={el.opcoes[0] + "nao"}>
                      Não
                    </label>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SintomasForm;
