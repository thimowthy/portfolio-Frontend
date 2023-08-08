import Image from "next/image";

export default function DetalhesPaciente({ paciente }: { paciente: Paciente }) {
  return (
    <>
      {paciente && (
        <>
          <ul
            className="flex list-none flex-row flex-wrap border-b-0 pl-0"
            role="tablist"
            data-te-nav-ref
          >
            <li role="presentation" className="bg-white">
              <a
                href="#tabs-todos"
                className="
                my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7
                pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500
                hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate
                focus:border-transparent data-[te-nav-active]:border-primary
                data-[te-nav-active]:text-primary dark:text-neutral-400
                dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400
                dark:data-[te-nav-active]:text-primary-400"
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

          <div className="flex flex-col gap-x-6 py-5 px-6 bg-white detalhes-paciente">
            <div className="flex gap-x-4 pb-3">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?
                ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&
                w=256&h=256&q=80"
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
