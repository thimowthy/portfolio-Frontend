import Image from "next/image";
import exameIcon from "@/public/medical-report.png";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { ItemExameProps } from "./ItemExameProps";
import ExameForm from "../CadastrarExame/CadastrarExameForm";
import { useState } from "react";

const ItemListaExame: React.FC<ItemExameProps> = ({ exame, setExame }) => {
  
  const [exameFormVisible, setExameFormVisible] = useState<boolean>(false);
  
  return (
    <li
      key={1}
      className={"flex justify-between gap-x-6 py-5 px-4 my-2 bg-[#d9e0df]"}
    >
      <div className="flex gap-x-4">
        {
          <Image
            className="h-24 w-24 flex-none"
            src={exameIcon}
            width="250"
            height="250"
            alt="Exame"
          />
        }
        <div className="min-w-0 flex-auto">
          <p className="text-xl font-semibold leading-6 text-gray-900 text-2xl mb-4">
            {"Hemograma"}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            {"Data da solicitação: " + convertDateFormat(exame.dataSolicitacao)}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            {"Data do resultado: " + convertDateFormat(exame.dataResultado)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-center justify-end">
        <button
          className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-1 text-sm leading-5 rounded-lg font-semibold text-white"
          onClick={() => {
            setExameFormVisible((prevVisibility) => !prevVisibility);
            if (setExame) {
              setExame(exame);
            }
          }}
        >
          Ver Exame
        </button>
      </div>
      {exameFormVisible && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#eee] py-4 px-10 rounded border-2 border-gray-300">
          <button
            className="flex ml-auto text-5xl mb-4"
            onClick={() => { setExameFormVisible(false); }}
          >
            x
          </button>
          <div className="border-b w-full border-gray-300 my-4"></div>
          <ExameForm
            exame={exame}
          />
        </div>
      )}
    </li>
  );
};

export default ItemListaExame;
