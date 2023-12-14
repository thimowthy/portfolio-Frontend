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

const DadosPacientePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [nf, setNf] = useState([]);
  const loadPacientes = async () => {
    const pacientes = await fetcher({
      metodo: "GET",
      rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
    });

    pacientes.sort(function (a: any, b: any) {
      const situacoesPaciente1 = a?.internacao?.situacoesPaciente || [];
      let situacoesPacienteCopy1 = [...situacoesPaciente1];
      const situacaoAtual1 = situacoesPacienteCopy1?.pop();

      const situacoesPaciente2 = b?.internacao?.situacoesPaciente || [];
      let situacoesPacienteCopy2 = [...situacoesPaciente2];
      const situacaoAtual2 = situacoesPacienteCopy2?.pop();
      if (
        situacaoAtual1?.situacaoDiagnostico?.neutrofilos <
        situacaoAtual2?.situacaoDiagnostico?.neutrofilos
      ) {
        return -1;
      }
      if (
        situacaoAtual1?.situacaoDiagnostico?.neutrofilos >
        situacaoAtual2?.situacaoDiagnostico?.neutrofilos
      ) {
        return 1;
      }
      return 0;
    });

    setPacientes(pacientes);
    return pacientes;
  };

  const router = useRouter();

  useEffect(() => {
    loadPacientes();
  }, []);

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
            pacientes={pacientes}
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

// export async function getServerSideProps<GetServerSideProps>() {
//   const pacientes = await fetcher({
//     metodo: "GET",
//     rota: "https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Paciente/GetListPatientsSemAlta",
//   });

//   pacientes.sort(function (a: any, b: any) {
//     const situacoesPaciente1 = a?.internacao?.situacoesPaciente || [];
//     let situacoesPacienteCopy1 = [...situacoesPaciente1];
//     const situacaoAtual1 = situacoesPacienteCopy1?.pop();

//     const situacoesPaciente2 = b?.internacao?.situacoesPaciente || [];
//     let situacoesPacienteCopy2 = [...situacoesPaciente2];
//     const situacaoAtual2 = situacoesPacienteCopy2?.pop();
//     if (
//       situacaoAtual1?.situacaoDiagnostico?.neutrofilos <
//       situacaoAtual2?.situacaoDiagnostico?.neutrofilos
//     ) {
//       return -1;
//     }
//     if (
//       situacaoAtual1?.situacaoDiagnostico?.neutrofilos >
//       situacaoAtual2?.situacaoDiagnostico?.neutrofilos
//     ) {
//       return 1;
//     }
//     return 0;
//   });

//   return {
//     props: {
//       pacientes: pacientes,
//       nf: [],
//     },
//   };
// }
