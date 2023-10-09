import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import fetcher from "@/api/fetcher";
import SeoConfig from "../../components/SeoConfig/index";
import toast, { Toaster } from "react-hot-toast";
import DetalhesPaciente from "../../components/DetalhesPaciente";

const DynamicTabComponent = dynamic(
  () => import("../../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);

const DadosPacientePage = ({ pacientes }: any) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [selectedPatient, setSelectedPatient] = useState<Paciente>({});
  return (
    <>
      <SeoConfig title="Lista de pacientes" />
      <section className="flex min-h-full flex items-center">
        <div className="basis-2/5 mr-2">
          <DynamicTabComponent
            pacientes={pacientes || []}
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
  return {
    props: {
      pacientes,
    },
  };
}
