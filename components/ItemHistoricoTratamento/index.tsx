import { convertDateTime } from "@/utils/dateFormats";
import { ItemHistoricoTratamentoProps } from "./ItemHistoricoTratamentoProps";
import styles from "./styles.module.css";

const ItemHistoricoTratamento: React.FC<ItemHistoricoTratamentoProps> = ({
  historico,
}) => {
  return (
    <li className="flex justify-between gap-x-6 py-5 px-4 my-2 bg-[#d9e0df]">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <h2 className="text-xl font-semibold leading-6 text-gray-900 text-2xl mb-4">
            {`Solicitante: ${historico.nomeSolicitante}`}
          </h2>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            <strong>Data da solicitação: </strong>{" "}
            {convertDateTime(historico.dataSolicitacao)}
          </p>
          <div className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            <strong>Cuidados:</strong>
            <ul>
              {historico.itensCuidado.map((cuidado, index) => (
                <li key={index}>{"- " + cuidado.descricao}</li>
              ))}
            </ul>
          </div>
          <div className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            <strong>Medicamentos:</strong>
            <ul>
              {historico.itensMedicamento.map((medicamento, index) => (
                <li key={index}>
                  <strong>{`- ${medicamento.nomeMedicamento}:`}</strong>
                  <ul className="list-disc pl-5">
                    <li>
                      <strong>Dose:</strong> {medicamento.dose}{" "}
                      {capitalizeFirstLetter(
                        medicamento.unidadeDosagem
                      ).replace(/_/g, " ")}
                    </li>
                    <li>
                      <strong>Intervalo:</strong> {medicamento.intervalo}{" "}
                      {capitalizeFirstLetter(medicamento.intervaloTempo)}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemHistoricoTratamento;

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
