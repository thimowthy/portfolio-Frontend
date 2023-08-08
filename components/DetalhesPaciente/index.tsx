import Image from "next/image";

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  return (
    <div>
      {paciente && (
        <>
          <ul
            className="flex list-none flex-row flex-wrap border-b-0 pl-0 bg-gray-100"
            role="tablist"
            data-te-nav-ref
          >
            <li role="presentation" className="bg-gray-100">
              <a
                href="#tabs-todos"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                data-te-toggle="pill"
                data-te-target="#tabs-todos"
                data-te-nav-active
                role="tab"
                aria-controls="tabs-todos"
                aria-selected="true"
              >
                Paciente
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-x-6 py-5 px-6 bg-gray-100 detalhes-paciente">
            <div className="flex gap-x-4 pb-3">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width="250"
                height="250"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {paciente.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Prontuário: {paciente.prontuario}
                </p>
              </div>
            </div>
            <hr />
            <div className="pt-5">
              <h1 className="text-2xl">Dados do paciente</h1>
            </div>
            <div className="flex gap-x-4 pt-4 pb-4">
              <div>
                <p>CPF: 0804102222</p>
                <p>Data de nascimento: 14/06/2000</p>
                <p>Cartão SUS: 44878484884</p>
              </div>

              <div>
                <p>Prontuário: 00005555/3</p>
                <p>Leito: 3C</p>
                <p>Unidade: Oncológica</p>
              </div>
            </div>
            <hr />
            <div className="pt-5">
              <h1 className="text-2xl">Progresso do tratamento</h1>
              <div className="flex flex-row rounded-full bg-white mt-4">
                <div className="basis-1/4 bg-yellow-800 py-2 pl-2 rounded-bl-full rounded-tl-full">
                  <p className="text-white">D0: 10/07/2023</p>
                </div>
              </div>
              <div className="pt-2 flex flex-row gap-x-2">
                <div className="basis-1/2">
                  <p>Data de admissão: 10/07/2023 às 04:51</p>
                  <div className="rounded-md bg-green-200 p-2 mt-4">
                    <p className="text-xl">Prontuário 098225/0</p>
                    <div className="py-2">
                      <p className="text-lg pl-2">Comorbidades:</p>
                      <p className="text-sm pl-4">Diabetes - Asma</p>
                    </div>
                    <div className="py-2">
                      <p className="text-lg pl-2">
                        Última prescrição: ontem às 11:15
                      </p>
                      <p className="text-sm pl-4">Cefepime 2g a cada 8 horas</p>
                      <p className="text-sm pl-4">
                        Meropenem 1g a cada 8 horas
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <a href="#" className="text-right text-sm">
                        Ver prontuário completo
                      </a>
                    </div>
                  </div>
                </div>

                <div className="basis-1/2">
                  <div>
                    <h1>Febre?</h1>
                    <div className="flex justify-between">
                      <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Não
                      </button>

                      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
