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
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});
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

export async function getStaticProps<GetStaticProps>() {
  const pacientes = await fetcher({
    metodo: "GET",
    rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
  });

  // const nf = await fetcher({
  //   metodo: "GET",
  //   rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetNFPatients",
  // });

  // const pendentes = await fetcher({
  //   metodo: "GET",
  //   rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPending",
  // });
  const isNeutropenico = (paciente: Paciente) =>
    paciente?.situacoesPaciente !== undefined &&
    paciente?.situacoesPaciente?.length > 0 &&
    paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
      ? paciente?.situacoesPaciente[0]?.diagnosticos[0].neutropenico
      : false;
  const febre = (paciente: Paciente) =>
    paciente?.situacoesPaciente !== undefined &&
    paciente?.situacoesPaciente?.length > 0 &&
    paciente?.situacoesPaciente[0]?.diagnosticos?.length > 0
      ? paciente?.situacoesPaciente[0]?.diagnosticos[0].febre
      : false;
  const nf = pacientes?.filter(
    (paciente: Paciente) => febre(paciente) && isNeutropenico(paciente),
  );

  return {
    props: {
      pacientes,
      nf,
      // pendentes,
    },
  };
}
