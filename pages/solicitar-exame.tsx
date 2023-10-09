import SeoConfig from "@/components/SeoConfig";
import SolicitarExameForm from "@/components/SolicitarExame";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SolicitarExame = () => {
  const router = useRouter();
  const id = "12"; //router.query;

  const [fetchedData, setFetchedData] = useState({
    numeroProntuario: "",
    nome: "",
    internacao: [{ leito: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetById?pacienteId=" +
            id,
          { method: "GET" },
        );

        if (!response.ok) throw new Error("Erro na solicitação");

        const data = await response.json();

        setFetchedData(data);
      } catch (error) {
        console.error("Ocorreu um erro durante a solicitação:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <SeoConfig title="Solicitar Exame" />
        <Header />
        {fetchedData.nome && (
          <SolicitarExameForm
            id={id}
            prontuario={fetchedData.numeroProntuario}
            leito={
              fetchedData.internacao[fetchedData.internacao.length - 1].leito
            }
            paciente={fetchedData.nome}
          />
        )}
      </div>
    </>
  );
};

export default SolicitarExame;
