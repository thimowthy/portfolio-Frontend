import Image from "next/image";

export default function VerDadosPaciente() {
  return <>
    <div className="flex justify-between gap-x-6 py-5 px-6 bg-white detalhes-paciente">
      <div className="flex gap-x-4">
        <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" width="250" height="250" alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">Prontuário: 4444444</p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>
      </div>
    </div>
  </>
}