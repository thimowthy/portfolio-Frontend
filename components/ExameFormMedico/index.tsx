import React, { Dispatch, useEffect, useState } from "react";
import ExameForm from "../CadastrarExame/CadastrarExameForm";

interface ExameFormMedicoProps {
    exame: Hemograma | undefined;
    setExameFormVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
  }
const ExameFormMedico: React.FC<ExameFormMedicoProps> = ({
    exame, setExameFormVisibility
}) => {
  return (
    <div className="fixed z-0 top-[55%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-[#eee] py-4 px-10 rounded border-2 border-gray-300">
      <div className="flex items-center justify-center">
        <span className="text-3xl font-semibold">HEMOGRAMA</span>
        <button
          className="flex ml-auto text-5xl mb-4"
          onClick={() => setExameFormVisibility(false)}
        >
          x
        </button>
      </div>
      <div className="border-b w-full border-gray-300 mb-4"></div>
      <ExameForm exame={exame} />
    </div>
  );
};

export default ExameFormMedico;
