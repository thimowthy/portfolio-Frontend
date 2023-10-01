import LeftArrow from "@/public/arrow_left.svg";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Form01Sintomas({ setInstabilidadeH, setFormInicial }: any) {
  const router = useRouter();

  const handleChangeForm = () => {
    setFormInicial(false);
    setInstabilidadeH(true);
  };

  return (
    <div className="flex min-h-full items-center">
      <div className="w-[50%] h-[300px] mx-auto pt-3 px-7 bg-[#fff] pb-6 rounded-lg flex flex-col">
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
          <p>Paciente com instabilidade hemodinâmica ? </p>
          <div className="flex gap-2 py-4">
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mr-3">
              Não
            </button>
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-3 "
              onClick={handleChangeForm}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}