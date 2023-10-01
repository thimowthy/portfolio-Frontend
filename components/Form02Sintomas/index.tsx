import LeftArrow from "@/public/arrow_left.svg";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Form02Sintomas({ setInstabilidadeH }: any) {
  const router = useRouter();

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
        <section className="flex flex-col items-center py-12">
          <h1 className="text-center text-2xl">Verificação de sintomas</h1>
          <div className="flex flex-col w-full items-center py-4">
            <p className="text-lg">Infecção prévia ? </p>
            <div className="flex gap-2 py-4">
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-3">
                Não
              </button>
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-3 "
                onClick={() => setInstabilidadeH(true)}
              >
                Sim
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}