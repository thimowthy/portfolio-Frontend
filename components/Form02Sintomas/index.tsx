import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LeftArrow from "@/public/arrow_left.svg";

export default function Form02Sintomas({ instabilidadeH }: any) {
  const router = useRouter();

  const [selecaoInfecao, setSelecaoInfeccao] = useState(false);

  const abrirSelecaoInfeccoes = () => {
    setSelecaoInfeccao(true);
  };

  function handleSemInfeccao() {
    console.log("instabilidade hemodinamica", instabilidadeH);
    console.log("infeccao", false);
  }

  const infeccoesSemInstabilidadeHemodinamica = [
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 1g 8/8h (paciente com disfunção renal)"
        },
      ]
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h"
        }
      ]
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 2g 8/8h + Polimixina B 25.000UI/kg/dia (÷ 2 ou 3)"
        },
      ]
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)"
        }
      ]
    }
  ];

  const infeccoesComInstabilidadeHemodinamica = [ // alterar medicamentos
    {
      nome: "ESBL",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 1g 8/8h (paciente com disfunção renal)"
        },
      ]
    },
    {
      nome: "MRSA",
      ATBs: [
        {
          primeira_opcao: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h"
        }
      ]
    },
    {
      nome: "Enterobactéria produtora de carbapenemase (ex: KPC)",
      ATBs: [
        {
          primeira_opcao: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia"
        },
        {
          segunda_opcao: "Meropenem 2g 8/8h + Polimixina B 25.000UI/kg/dia (÷ 2 ou 3)"
        },
      ]
    },
    {
      nome: "Enterococcus resistente à Vancomicina (VRE)",
      ATBs: [
        {
          primeira_opcao: "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)"
        }
      ]
    }
  ];

  return (
    <div className="flex min-h-full items-center">
      <div className="w-[50%] h-[300px] mx-auto pt-3 px-7 bg-[#fff] pb-6 rounded-lg flex flex-col">
        {!selecaoInfecao &&
          <section className="flex flex-col">
            <Image
              src={LeftArrow}
              alt="Voltar"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={() => router.push("/estratificacao-risco")}
            />
            <h1 className="text-center text-2xl">Verificação de sintomas</h1>
            <div className="flex flex-col w-full items-center py-4">
              <p className="text-lg">Infecção prévia ? </p>
              <div className="flex gap-2 py-4">
                <button onClick={handleSemInfeccao} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-3">
                  Não
                </button>
                <button
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-3 "
                  onClick={abrirSelecaoInfeccoes}
                >
                  Sim
                </button>
              </div>
            </div>
          </section>
        }
        {selecaoInfecao && instabilidadeH &&
          <section className="flex flex-col items-center py-12">
            <h1 className="text-center text-2xl">Verificação de sintomas</h1>
            <div className="flex flex-col w-full items-center py-4">
              <p className="text-lg">Selecione a infecção</p>
              <div className="grid grid-cols-2 px-2 py-2 gap-4">
                {infeccoesComInstabilidadeHemodinamica.map((el) => (
                  <button className="w-56 h-14 rounded-3xl bg-orange-500 hover:bg-[#d3824c] text-[#fff] font-bold py-2 px-2" key={el.nome}>{el.nome}</button>
                )
                )}
              </div>
            </div>
          </section>
        }
        {selecaoInfecao && !instabilidadeH &&
          <section className="flex flex-col items-center py-12">
            <h1 className="text-center text-2xl">Verificação de sintomas</h1>
            <div className="flex flex-col w-full items-center py-4">
              <p className="text-lg">Selecione a infecção</p>
              <div className="grid grid-cols-2 px-2 py-2 gap-4">
                {infeccoesSemInstabilidadeHemodinamica.map((el) => (
                  <button className="w-56 h-14 rounded-3xl bg-orange-500 hover:bg-[#d3824c] text-[#fff] font-bold py-2 px-2" key={el.nome}>{el.nome}</button>
                )
                )}
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  );
}