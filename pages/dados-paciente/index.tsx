import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import fetcher from "@/api/fetcher";
import SeoConfig from "../../components/SeoConfig/index";
import DetalhesPaciente from "../../components/DetalhesPaciente";
import Header from "@/components/Header";

const DynamicTabComponent = dynamic(
  () => import("../../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);

const DadosPacientePage = ({
  pacientes,
  nf, //  pendentes,
}: any) => {
  const router = useRouter();
  useEffect(() => {
    let pacienteAtivo =
      pacientes?.find((paciente: Paciente) => paciente.id == router.query.id) ||
      {};
    setSelectedPatient(pacienteAtivo);
  }, [router]);
  const [selectedPatient, setSelectedPatient] = useState<any>({});
  4;
  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <Header />
      <section className="flex min-h-full flex items-center pt-10">
        <div className="basis-2/5 mr-2">
          <DynamicTabComponent
            pacientes={pacientes || []}
            nf={nf}
            setSelectedPatient={setSelectedPatient}
          />
        </div>
        <div className="basis-3/5 ml-2">
          <DetalhesPaciente paciente={selectedPatient} />
        </div>
      </section>
    </>
  );
};

export default DadosPacientePage;

export async function getServerSideProps<GetServerSideProps>() {
  const pacientes = await fetcher({
    metodo: "GET",
    rota: "https://localhost:7091/Paciente/GetListPatientsSemAlta",
  });

  const isNeutropenico = (paciente: Paciente) => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    const situacaoAtual = situacoesPacienteCopy?.pop();

    if (situacaoAtual?.situacaoDiagnostico?.neutropenia) {
      return true;
    }
    return false;
  };
  const febre = (paciente: Paciente) => {
    const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
    let situacoesPacienteCopy = [...situacoesPaciente];
    const situacaoAtual = situacoesPacienteCopy?.pop();

    if (situacaoAtual?.situacaoDiagnostico?.febre) {
      return true;
    }
    return false;
  };
  const nf = pacientes?.filter(
    (paciente: Paciente) => febre(paciente) && isNeutropenico(paciente),
  );

  return {
    props: {
      pacientes,
      nf,
    },
  };
}
