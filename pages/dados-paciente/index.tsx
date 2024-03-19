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

const isNeutropenico = (paciente: Paciente) => {
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  situacoesPacienteCopy.reverse();
  const situacaoAtual = situacoesPacienteCopy?.pop();
  if (situacaoAtual?.situacaoDiagnostico?.neutropenia) {
    return true;
  }
  return false;
};
const febre = (paciente: Paciente) => {
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  situacoesPacienteCopy.reverse();
  const situacaoAtual = situacoesPacienteCopy?.pop();
  if (situacaoAtual?.situacaoDiagnostico?.febre) {
    return true;
  }
  return false;
};

const DadosPacientePage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [nf, setNf] = useState<any>([]);
  const [listaNf, setListaNf] = useState<any>([]);
  const loadPacientes = async () => {
    const data = await fetcher({
      metodo: "GET",
      rota: "/Paciente/GetListPatientsSemAlta",
    });

    data.sort(function (a: any, b: any) {
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

    data.map((paciente: any) => {
      let nfIdArr;
      const neutropenico: boolean = isNeutropenico(paciente);
      const hasFebre: boolean = febre(paciente);
      if (neutropenico && hasFebre) {
        nfIdArr = nf.map((item: any) => item.id);
        if (nfIdArr.indexOf(paciente.id) == -1) {
          setNf([...nf, paciente]);
          setListaNf([...listaNf, paciente]);
        }
      }
    });

    setPacientes(data);
    setListaPacientes(data);
    return data;
  };

  const router = useRouter();

  useEffect(() => {
    loadPacientes();
  }, []);

  useEffect(() => {
    let pacienteAtivo =
      pacientes?.find(
        (paciente: Paciente) => paciente.id.toString() === router.query.id,
      ) || {};
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
            listaPacientes={listaPacientes}
            nf={nf}
            loadPacientes={loadPacientes}
            listaNf={listaNf}
            setNf={setNf}
            setPacientes={setPacientes}
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
//     rota: "/Paciente/GetListPatientsSemAlta",
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
