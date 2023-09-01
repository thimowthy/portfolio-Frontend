import ItemListaPaciente from "../ItemListaPaciente";

const TabContents = ({
  pacientes,
  idAtivo,
  selectPatient,
  tabId,
  className,
}: {
  pacientes: Paciente[];
  idAtivo: number;
  tabId: string;
  className?: string;
  selectPatient: Function;
}) => {
  return (
    <>
      <div
        className={`${className} data-[te-tab-active]:block`}
        id={tabId}
        role="tabpanel"
        aria-labelledby={`${tabId}-tab`}
        data-te-tab-active
      >
        <ul role="list" className="divide-y divide-gray-100">
          {pacientes?.map((paciente: Paciente) => (
            <ItemListaPaciente
              paciente={paciente}
              idAtivo={idAtivo}
              selectPatient={selectPatient}
              key={paciente.id}
            />
          ))}
        </ul>
      </div>
      <div
        className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
        id="tabs-pendentes"
        role="tabpanel"
        aria-labelledby="tabs-pendentes-tab"
      >
        Conteúdo
      </div>
      <div
        className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
        id="tabs-NF"
        role="tabpanel"
        aria-labelledby="tabs-NF-tab"
      >
        Tab 3 content
      </div>
    </>
  );
};

export default TabContents;
