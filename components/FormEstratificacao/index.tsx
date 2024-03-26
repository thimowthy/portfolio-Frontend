import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import Bad from "@/public/bad.png";
import Good from "@/public/good.png";
import Image from "next/image";
import LeftArrow from "@/public/arrow_left.svg";
import moment from "moment";
import fetcher from "@/api/fetcher";
import SuccessToast from "../toasts/successToast";
import ErrorToast from "../toasts/errorToast";

type CheckBoxInfo = {
  id: number;
  text: string;
  valor: number;
  nome: string;
  ativo: boolean;
};

type EstratificacaoProps = {
  id: number;
  dataNascimento?: string;
  nome?: string;
  cpf?: string;
  numeroProntuario?: string;
  cns?: string;
  leito?: string;
};

export default function FormEstratificacao({ paciente, setLoading }: any) {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [escore, setEscore] = useState(0);
  const [params, setParams] = useState([
    {
      id: 1,
      text: "Assintomático ou sintomas leves",
      valor: 5,
      nome: "assintomatico_leve",
      ativo: false,
    },
    {
      id: 2,
      text: "Sintomas moderados",
      valor: 3,
      nome: "moderado",
      ativo: false,
    },
    {
      id: 3,
      text: "Sintomas graves ou paciente moribundo",
      valor: 0,
      nome: "grave_moribundo",
      ativo: false,
    },
    {
      id: 4,
      text: "Ausência de hipotensão (PAS > 90 mmHg)",
      valor: 5,
      nome: "ausencia-hipotensao",
      ativo: false,
    },
    {
      id: 5,
      text: "Ausência de doença pulmonar obstrutiva crônica",
      valor: 4,
      nome: "ausencia-doenca_pulmonar-cronica",
      ativo: false,
    },
    {
      id: 6,
      text: "Tumor sólido ou neoplasia hematológica sem infecção fúngica prévia (confirmada ou tradada empiricamente)",
      valor: 4,
      nome: "tumor_solido-neoplasia_hematologica",
      ativo: false,
    },
    {
      id: 7,
      text: "Sem desidratação com necessidade de hidratação parenteral",
      valor: 3,
      nome: "sem-desidratacao",
      ativo: false,
    },
    {
      id: 8,
      text: "Paciente ambulatorial ou no início da febre",
      valor: 3,
      nome: "ambulatorial-inicio_febre",
      ativo: false,
    },
    {
      id: 9,
      text: "Idade < 60 anos",
      valor: 2,
      nome: "idade-superior-60",
      ativo: false,
    },
  ]);

  const handleEstratificacao = async () => {
    setLoading(true);

    var risco;

    if (escore < 21) {
      risco = 0;
    } else {
      risco = 1;
    }

    try {
      const response = await fetcher({
        rota: `/Internacao/SetRisco/${paciente.id}?risco=${risco}`,
        metodo: "PUT"
      });
      console.log(response);
      setSuccess(true);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
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
    <>
      {success && <SuccessToast className="toast-error"
        title="Sucesso!"
        message="Estratificação de risco realizada com sucesso"
        onClose={() => {
          setSuccess(false);
          router.push("/dados-paciente");
        }} />}

      {error && <ErrorToast className="toast-error"
        title="Erro ao armazenar escore!"
        message="Ocorreu um erro durante a estratificação de risco!"
        onClose={() => {
          setError(false);
        }} />}

      <div className="flex min-h-full items-center">
        <div className="w-[100%] h-fit mx-auto pt-3 px-7 bg-[#fff] pb-6 rounded-lg flex flex-col">
          <div className="flex items-center justify-center mt-4">
            <Image
              src={LeftArrow}
              alt="Voltar"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={() => router.push("/dados-paciente")}
            />
            <h1 className="text-center mx-auto font-bold text-3xl">Estratificação de Risco</h1>
          </div>
          <div className="border-b border-gray-200 w-full px-32 my-6"></div>
          <section className="flex justify-between">
            <div className="flex items-center gap-5">
              <div>
                {escore < 21 && <Image src={Bad} alt="Avatar neutro" />}
                {escore >= 21 && <Image src={Good} alt="Avatar bom" />}
              </div>
              <div className="flex gap-10 items-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-3xl">
                    {paciente.nome !== "" ? paciente.nome : "Maria Santos"}
                  </h2>
                  <ul>
                    <li>
                      CPF: {paciente.cpf != "" ? paciente.cpf : "123.456.789-00"}
                    </li>
                    <li>
                      Data de nascimento:{" "}
                      {paciente.dataNascimento != ""
                        ? moment(paciente?.dataNascimento).format("DD/MM/YYYY")
                        : "12/09/1975"}
                    </li>
                    <li>
                      Cartão SUS:{" "}
                      {paciente.cartaoSus ? paciente.cartaoSus : "203029092350009"}
                    </li>
                  </ul>
                </div>
                <ul className="pt-5">
                  <li>
                    Prontuário:{" "}
                    {paciente.prontuario
                      ? paciente.prontuario
                      : "0982633/0"}
                  </li>
                  <li>Leito: {paciente.leito !== "" ? paciente.leito : "3C"}</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col p-5 bg-gray-100 rounded">
              {escore >= 21 && (
                <p className="text-3xl text-[#ABEA0C] ">Escore MASCC: {escore}</p>
              )}
              {escore < 21 && (
                <p className="text-3xl text-[#F0661E]">Escore MASCC: {escore}</p>
              )}
              <div className="flex flex-col gap-2 justify-center pt-4">
                <div className="flex gap-2 items-center">
                  <div
                    className="w-14 h-8 bg-[#F0661E] cursor-help"
                    title="Alto Risco - Escore MASCC < 21"
                  ></div>
                  <p>Alto Risco - Escore MASCC &lt; 21</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    className="w-14 h-8 bg-[#ABEA0C] cursor-help"
                    title="Baixo Risco - Escore MASCC >= 21"
                  ></div>
                  <p>Baixo Risco - Escore MASCC &ge; 21</p>
                </div>
              </div>
            </div>
          </section>
          <div className="space-x-20 flex w-full">
            <div className="flex relative p-2 px-4 bg-gray-100 w-fit mt-2 rounded">
              <form onSubmit={handleEstratificacao}>
                <ul className="flex flex-col">
                  {params.map((param) => (
                    <li key={param.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={param.nome}
                        id={param.nome}
                        onChange={() => handleCheckboxChange(param)}
                      />
                      <label htmlFor={param.nome}>{param.text}</label>
                      <span className="font-bold">({param.valor})</span>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
            <div className="flex items-center justify-center">
              {escore < 21 && (
                <button
                  className="w-48 h-12 rounded-3xl bg-orange-500 text-[#fff] font-bold"
                  type="button"
                  onClick={() => handleEstratificacao()}
                >
                  Iniciar Tratamento
                </button>
              )}
              {escore >= 21 && (
                <button
                  className="w-48 h-12 rounded-3xl bg-orange-500 text-[#fff] font-bold"
                  type="button"
                  onClick={() => handleEstratificacao()}
                >
                  Continuar
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
