import { useState, FormEvent, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Bad from "@/public/bad.png";
import Good from "@/public/good.png";
import Image from "next/image";
import LeftArrow from "@/public/arrow_left.svg";

type CheckBoxInfo = {
  id: number
  text: string
  valor: number
  nome: string
  ativo: boolean
}

type EstratificacaoProps = {
  id: number
  dataNascimento?: string
  nome?: string
  cpf?: string
  prontuario?: string
  cartaoSus?: string,
  leito?: string
}

export default function FormEstratificacao({ paciente, setLoading }: any) {
  const router = useRouter();

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

  const handleEstratificacao = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {

      const response = await fetch(`https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Internacao/SetRisco/${paciente.id}?escore=${escore}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      });

      setTimeout(() => {
        setLoading(false);
        if(response.ok){
          alert("Escore MASCC armazenado com sucesso");
          router.push("/dados-paciente");
        } else {
          //console.error()
          alert("Erro ao armazenar Escore MASCC");
          //setError(true);
        }
      }, 1500);

      console.log(response);
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

  useEffect(() => {
    console.log(paciente);
  });

  return (
    <div className="flex min-h-full items-center">
      <div className="w-[100%] h-[70vh] mx-auto pt-3 px-7 bg-[#fff] pb-6 rounded-lg flex flex-col">
        <div>
          <Image src={LeftArrow} alt="Voltar" width={40} height={40} className="cursor-pointer" onClick={() => router.push("/dados-paciente")}/>
          <h1 className="text-center text-3xl">Estratificação de Risco</h1>
        </div>
        <section className="flex justify-between">
          <div className="flex items-center gap-5">
            <div>
              {escore < 21 && <Image src={Bad} alt="Avatar neutro"/>}
              {escore >= 21 && <Image src={Good} alt="Avatar bom"/>}
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-5">
                <h2 className="text-3xl">{paciente.nome !== "" ? paciente.nome : "Maria Santos"}</h2>
                <ul>
                  <li>CPF: {paciente.cpf != "" ? paciente.cpf : "123.456.789-00"}</li>
                  <li>Data de nascimento: {paciente.dataNascimento != "" ? paciente.dataNascimento : "12/09/1975"}</li>
                  <li>Cartão SUS: {paciente.cartaoSus ? paciente.cartaoSus : "203029092350009"}</li>
                </ul>
              </div>
              <ul className="pt-5">
                <li>Prontuário: {paciente.prontuario != "" ? paciente.prontuario : "0982633/0"}</li>
                <li>Leito: {paciente.leito !== "" ? paciente.leito : "3C"}</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col p-3">
            {escore >= 21 && <p className="text-3xl text-[#ABEA0C] ">Escore MASCC: {escore}</p>}
            {escore < 21 && <p className="text-3xl text-[#F0661E]">Escore MASCC: {escore}</p>}
            <div className="flex flex-col gap-2 justify-center pt-4">
              <div className="flex gap-2 items-center">
                <div className="w-14 h-8 bg-[#F0661E] cursor-help" title="Alto Risco - Escore MASCC < 21"></div>
                <p>Alto Risco - Escore MASCC &lt; 21</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-14 h-8 bg-[#ABEA0C] cursor-help" title="Baixo Risco - Escore MASCC >= 21"></div>
                <p>Baixo Risco - Escore MASCC &ge; 21</p>
              </div>
            </div>
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
            {escore < 21 && <button className="w-48 h-12 rounded-3xl bg-[#C55A11] text-[#fff] font-bold absolute bottom-0 right-4" type="submit">Iniciar Tratamento</button>}
            {escore >= 21 && <button className="w-48 h-12 rounded-3xl bg-[#c4c4c4] text-[#fff] font-bold absolute bottom-0 right-4" disabled type="submit">Iniciar Tratamento</button>}
          </form>
        </div>
      </div>
    </div>
  );
}
