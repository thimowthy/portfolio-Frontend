import fetcher from "@/api/fetcher";
import { useEffect, useState } from "react";

export const usePaciente = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);

  const loadPacientes = async () => {
    setPacientes([]);
    try {
      const pacientes = await fetcher({
        metodo: "GET",
        rota: "/Paciente/GetListPatients",
      });
      if (pacientes.length > 0) {
        setPacientes(pacientes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return { pacientes };
};
