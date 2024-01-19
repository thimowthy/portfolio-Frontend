import fetcher from "@/api/fetcher";
import { useEffect, useState } from "react";

export const useDashboard = () => {
  const [neutropenicos, setNeutropenicos] = useState<number>(0);
  const [internamentos, setInternamentos] = useState([] as []);

  const loadDashData = async (
    setNeutropenicosFunction: (data: any) => void,
    setInternamentosFunction: (data: any) => void,
  ) => {
    try {
      const { dadosInternamentos, pacientesNeutropenia } = await fetcher({
        rota: "/Internacao/GetDashboard",
        metodo: "GET",
      });
      setNeutropenicosFunction(pacientesNeutropenia);
      setInternamentosFunction(dadosInternamentos || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashData(setNeutropenicos, setInternamentos);
  }, []);

  return [neutropenicos, internamentos];
};
