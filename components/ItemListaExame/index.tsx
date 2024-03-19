import Image from "next/image";
import exameIcon from "@/public/medical-report.png";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { ItemExameProps } from "./ItemExameProps";
import { useEffect, useState } from "react";
import { getUserCargo } from "@/utils/getCargo";
import ExameFormMedico from "../ExameFormMedico";

const ItemListaExame: React.FC<ItemExameProps> = ({ exame, setExame }) => {
  const [exameFormVisible, setExameFormVisible] = useState<Boolean>(false);
  const [permissaoMedico, setPermissaoMedico] = useState<boolean>(false);

  useEffect(() => {
    const cargo = getUserCargo();
    if (cargo == "MEDICO") {
      setPermissaoMedico(true);
    }
  }, []);

  return (
    <li
      key={exame.id}
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
      {exameFormVisible && permissaoMedico && (
        <ExameFormMedico
          exame={exame}
          setExameFormVisibility={setExameFormVisible}
        />
      )}
    </li>
  );
};

export default ItemListaExame;
