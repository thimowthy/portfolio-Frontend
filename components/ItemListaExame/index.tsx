import Image from "next/image";
import exameIcon from "@/public/medical-report.png";
import { format, parseISO } from "date-fns";

const ItemListaExame: React.FC<Exame> = ({
  nome,
  dataSolicitacao,
  dataResultado,
  solicitante,
}) => {
  return (
    <li
      key={1}
      className={"flex justify-between gap-x-6 py-5 px-4 my-2 bg-[#E1ECEA]"}
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
            {"Data da solicitação: " +
              format(parseISO(dataSolicitacao), "dd/mm/yyyy")}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            {"Data do resultado: " +
              format(parseISO(dataResultado), "dd/mm/yyyy")}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-center justify-end">
        <a
          href="https://treinamento.ebserh.gov.br/aghu/pages/casca/login.xhtml"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-1 text-sm leading-5 rounded-lg font-semibold text-white"
        >
          Ver Exame
        </a>
      </div>
    </li>
  );
};

export default ItemListaExame;
