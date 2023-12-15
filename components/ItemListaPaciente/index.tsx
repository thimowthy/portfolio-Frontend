import useIcon from "@/hooks/useIcon";
import useServerityIcon from "@/hooks/useSeverityIcon";
import Image from "next/image";
import styles from "./styles.module.css";
import usePacienteGravity from "@/hooks/usePacienteGravity";
/**
 * Renderiza um item da listagem de pacientes.
 * @category Component
 */
const ItemListaPaciente = ({
  paciente,
  selectPatient,
  idAtivo,
}: {
  paciente: Paciente;
  selectPatient: Function;
  idAtivo: number;
}) => {
  const [gravidade] = usePacienteGravity(paciente);
  return (
    <li
      key={paciente.id}
      className={`flex justify-between gap-x-6 py-5 px-4 my-2 bg-[#E1ECEA]   ${
        paciente?.id && idAtivo && paciente?.id == idAtivo
          ? styles.card_prontuario_ativo
          : ""
      }
        `}
    >
      <div className="flex gap-x-4">
        {
          <Image
            className="h-24 w-24 flex-none rounded-full"
            src={useServerityIcon(paciente)}
            width="250"
            height="250"
            alt="Estado do paciente"
          />
        }
        <div className="min-w-0 flex-auto">
          <p className="text-xl font-semibold leading-6 text-gray-900 text-2xl">
            {paciente.nome}
          </p>
          {gravidade && (
            <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
              Gravidade: {gravidade}
            </p>
          )}
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-base">
            {/* Prontuário: {paciente.id} */}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-center justify-end">
        {useIcon(paciente)}
        <button
          className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-1 text-sm leading-5 rounded-lg font-semibold text-white"
          onClick={() => selectPatient(paciente)}
        >
          Ver paciente
        </button>
      </div>
    </li>
  );
};

export default ItemListaPaciente;
