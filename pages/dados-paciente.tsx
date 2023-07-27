import dynamic from "next/dynamic";
import VerDadosPaciente from '../components/VerDadosPaciente/index';

const DynamicTabComponent = dynamic(() => import("../components/TabDadosPaciente"), {
  ssr: false,
});
const mockedPatients = [
  {
    name: 'Paciente teste 1',
    prontuario: '188182388',
    neutropenia: true,
    neutropeniaFebril: true,
  },
  {
    name: 'Paciente teste 2',
    prontuario: '498789',
    neutropenia: true,
    neutropeniaFebril: true,
  },
  {
    name: 'Paciente teste 3',
    prontuario: '2222',
    neutropenia: true,
    neutropeniaFebril: false,
  },
  {
    name: 'Paciente teste 4',
    prontuario: '23424',
    neutropenia: false,
    neutropeniaFebril: false,
  },
  {
    name: 'Paciente teste 5',
    prontuario: '34444',
    neutropenia: true,
    neutropeniaFebril: true,
  }
];
const DadosPacientePage = () => {
  return <>
    <section className="flex min-h-full flex items-center">
      <div className="flex-1">
        <DynamicTabComponent pacientes={mockedPatients} />
      </div>
      <div className="flex-1">
        <VerDadosPaciente />
      </div>
    </section>
  </>
}

export default DadosPacientePage;