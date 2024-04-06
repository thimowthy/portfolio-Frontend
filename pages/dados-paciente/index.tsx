import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import fetcher from "@/api/fetcher";
import SeoConfig from "../../components/SeoConfig/index";
import DetalhesPaciente from "../../components/DetalhesPaciente";
import Header from "@/components/Header";
import { useAuthRole } from "@/hooks/useAuthRole";
import { orderByDataVerificacao } from "@/utils/ordering";

const DynamicTabComponent = dynamic(
  () => import("../../components/TabDadosPaciente"),
  {
    ssr: false,
  },
);

const isNeutropenico = (paciente: Paciente) => {
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  situacoesPacienteCopy.sort(orderByDataVerificacao);
  const situacaoAtual = situacoesPacienteCopy?.pop();
  if (situacaoAtual?.situacaoDiagnostico?.neutropenia) {
    return true;
  }
  return false;
};

const febre = (paciente: Paciente) => {
  const situacoesPaciente = paciente?.internacao?.situacoesPaciente || [];
  let situacoesPacienteCopy = [...situacoesPaciente];
  situacoesPacienteCopy.sort(orderByDataVerificacao);
  const situacaoAtual = situacoesPacienteCopy?.pop();
  if (situacaoAtual?.situacaoDiagnostico?.febre) {
    return true;
  }
  return false;
};

const DadosPacientePage = () => {
  const { cargo } = useAuthRole();
  const [pacientes, setPacientes] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [nf, setNf] = useState<any>([]);
  const [listaNf, setListaNf] = useState<any>([]);
  const loadPacientes = async () => {
    const data = await fetcher({
      metodo: "GET",
      rota: "/Paciente/GetListPatientsSemAlta",
    });

    const orderByTipoNeutropenia = (a: any, b: any) => {
      const situacoesPaciente1 = a?.internacao?.situacoesPaciente || [];
      const internacao1 = a?.internacao;
      let situacoesPacienteCopy1 = [...situacoesPaciente1];
      situacoesPacienteCopy1.sort(orderByDataVerificacao);
      const situacaoAtual1 = situacoesPacienteCopy1?.pop();

      const situacoesPaciente2 = b?.internacao?.situacoesPaciente || [];
      const internacao2 = b?.internacao;
      let situacoesPacienteCopy2 = [...situacoesPaciente2];
      situacoesPacienteCopy2.sort(orderByDataVerificacao);
      const situacaoAtual2 = situacoesPacienteCopy2?.pop();
      const tipoNeutropenia1 =
        situacaoAtual1?.situacaoDiagnostico?.tipoNeutropenia || null;
      const tipoNeutropenia2 =
        situacaoAtual2?.situacaoDiagnostico?.tipoNeutropenia || null;
      if (!tipoNeutropenia1 && tipoNeutropenia2) {
        return 1;
      }
      if (!tipoNeutropenia2 && tipoNeutropenia1) {
        return -1;
      }
      if (tipoNeutropenia1 < tipoNeutropenia2) {
        return 1;
      }
      if (tipoNeutropenia1 > tipoNeutropenia2) {
        return -1;
      }
      if (tipoNeutropenia1 == tipoNeutropenia2) {
        if (internacao1?.risco < internacao2?.risco) {
          return 1;
        }
        if (internacao1?.risco > internacao2?.risco) {
          return -1;
        }
        return 0;
      }
      return 0;
    };
    data.sort(orderByTipoNeutropenia);
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

    // return function cleanup() {
    //   setPacientes([]);
    // };
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

  if (cargo === "LABORATORISTA") {
    router.push("/cadastrar-exame");
  }

  if (cargo === "ADMINISTRADOR") {
    router.push("/menu");
  }
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
