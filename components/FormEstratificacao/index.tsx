import { useState, FormEvent } from "react";
import Router from "next/router";
import Image from "next/image";
import Neutral from "@/public/neutral.png";
import Good from "@/public/good.png";

export default function FormEstratificacao({ cargo }: any) {

  const [ escore, setEscore ] = useState(0);
  const [ params, setParams ] = useState([ {
    id: 1,
    text: "Assintomático ou sintomas leves",
    valor: 5,
    nome: "assintomatico_leve",
    ativo: false
  },
  {
    id: 2,
    text: "Sintomas moderados",
    valor: 3,
    nome: "moderado",
    ativo: false
  },
  {
    id: 3,
    text: "Sintomas graves ou paciente moribundo",
    valor: 0,
    nome: "grave_moribundo",
    ativo: false
  },
  {
    id: 4,
    text: "Ausência de hipotensão (PAS > 90 mmHg)",
    valor: 5,
    nome: "ausencia-hipotensao",
    ativo: false
  },
  {
    id: 5,
    text: "Ausência de doença pulmonar obstrutiva crônica",
    valor: 4,
    nome: "ausencia-doenca_pulmonar-cronica",
    ativo: false
  },
  {
    id: 6,
    text: "Tumor sólido ou neoplasia hematológica sem infecção fúngica prévia (confirmada ou tradada empiricamente)",
    valor: 4,
    nome: "tumor_solido-neoplasia_hematologica",
    ativo: false
  },
  {
    id: 7,
    text: "Sem desidratação com necessidade de hidratação parenteral",
    valor: 3,
    nome: "sem-desidratacao",
    ativo: false
  },
  {
    id: 8,
    text: "Paciente ambulatorial ou no início da febre",
    valor: 3,
    nome: "ambulatorial-inicio_febre",
    ativo: false
  },
  {
    id: 9,
    text: "Idade > 60 anos",
    valor: 2,
    nome: "idade-superior-60",
    ativo: false
  } ]);

  type CheckBoxInfo = {
    id: number
    text: string
    valor: number
    nome: string
    ativo: boolean
  }

  const handleEstratificacao = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const risco = params.filter((p)=>p.ativo).map((p) => p.nome);
      risco.push(`Escore: ${escore}`);
      alert(risco);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (param: CheckBoxInfo) => {
    const updatedParams = params.map((p) => {
      if (p.id === param.id) {
        return { ...p, ativo: !p.ativo };
      }
      return p;
    });

    const newEscore = updatedParams.reduce((total, p) => {
      return p.ativo ? total + p.valor : total;
    }, 0);

    setEscore(newEscore);
    setParams(updatedParams);
  };

  return (
    <div className="flex min-h-full items-center">
      <div className="w-[100%] h-[70vh] mx-auto pt-10 px-7 bg-[#fff] rounded-lg flex flex-col">
        <h1 className="text-center text-3xl">Estratificação de Risco</h1>
        <section className="flex justify-between">
          <div className="flex items-center gap-5">
            <div>
              {escore < 21 && <Image src={Neutral} alt="Avatar neutro"/>}
              {escore >= 21 && <Image src={Good} alt="Avatar bom"/>}
            </div>
            <div className="flex gap-8">
              <ul>
                <li>CPF: 123.456.789-00</li>
                <li>Data de nascimento: 12/09/1975</li>
                <li>Cartão SUS: 203029092350009</li>
              </ul>
              <ul>
                <li>Prontuário: 0982633/0</li>
                <li>Leito: 3C</li>
              </ul>
            </div>
          </div>
          <div>
            <p className="text-3xl">Escore MASCC: {escore}</p>
          </div>
        </section>
        <div className="flex relative pt-7">
          <form onSubmit={handleEstratificacao}>
            <ul className="flex flex-col">
              {params.map((param) => (
                <li key={param.id} className="flex items-center gap-2">
                  <input type="checkbox" name={param.nome} id={param.nome} onChange={() => handleCheckboxChange(param)}/>
                  <label htmlFor={param.nome}>{param.text}</label>
                  <span className="font-bold">({param.valor})</span>
                </li>
                )
              )}
              
            </ul>
            <button className="w-48 h-12 rounded-3xl bg-[#C55A11] text-[#fff] font-bold absolute bottom-0 right-4" type="submit">Iniciar Tratamento</button>
          </form>
        </div>
      </div>
    </div>
  );
}
