import React, { useEffect, useState } from "react";
import Image from "next/image";
import exameCinza from "@/public/medical-report-gray.png";
import Router from "next/router";

const SintomasForm: React.FC = () => {
  const [sintomas, setSintomas] = useState([]);
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

  const handleInfeccao = (infec: string) => {
    setInfeccao(infec);
    if (instabilidadeH) {
      const remedio = infeccoesComInstabilidadeHemodinamica.find(
        (el) => el.nome === infec,
      )?.ATBs[0].primeira_opcao;

      if (remedio) {
        setSintomas([]);

      } else {
        const remedio = infeccoesSemInstabilidadeHemodinamica.find(
          (el) => el.nome === infec,
        )?.ATBs[0].primeira_opcao;
        if (remedio) {
          setSintomas([]);
        }
      }
    };

  };
  return (
    <div>
    
    </div>
  );
};

export default SintomasForm;
