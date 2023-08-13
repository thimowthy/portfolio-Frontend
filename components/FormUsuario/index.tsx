import { useState, FormEvent } from 'react'

export default function FormUsuario({ cargo }: any) {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [certificado, setCertificado] = useState('')
  const [ativo, setAtivo] = useState(true)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('entidade', cargo.valor)
    console.log(nome)
    console.log(cpf)
    console.log(certificado)
    console.log(cargo.codigo)
    console.log(senha)
    console.log(ativo)
  }

  return (
    <div className="flex flex-col w-[40%] h-[60%] mx-auto mt-20 bg-[#fff] rounded-lg">
      <div className="flex items-center justify-center w-full h-12 gap-3 p-2 border-b-2">
        <h3 className="text-xl">Cadastro de {cargo.nome}</h3>
      </div>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col px-8">
          <div className="flex flex-col p-2 rounded-lg">
            <label htmlFor="nome" className="ml-1">
              Nome
            </label>
            <input
              className="bg-gray-200 p-2 outline-none rounded-lg"
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome do usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col p-2 rounded-lg">
            <label htmlFor="cpf" className="ml-1">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF do usuário"
              className="bg-gray-200 p-2 outline-none rounded-lg"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col p-2 rounded-lg">
            <label htmlFor="senha" className="ml-1">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              className="bg-gray-200 p-2 outline-none rounded-lg"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col p-2 rounded-lg w-full">
              <label htmlFor="certificado" className="ml-1">
                Certificado
              </label>
              <input
                type="text"
                name="certificado"
                id="certificado"
                placeholder="Certificado"
                className="bg-gray-200 p-2 outline-none rounded-lg"
                value={certificado}
                onChange={(e) => setCertificado(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col p-2 rounded-lg">
              <label htmlFor="codigo" className="ml-1">
                Código
              </label>
              <input
                type="number"
                className="bg-gray-200 p-2 outline-none rounded-lg w-14"
                name="codigo"
                id="codigo"
                disabled
                value={cargo.codigo}
                required
              />
            </div>
          </div>

          <div className="flex p-2 rounded-lg items-center">
            <label htmlFor="ativo" className="ml-1">
              Ativo
            </label>
            <input
              type="checkbox"
              id="ativo"
              name="ativo"
              className="bg-gray-200 p-2 outline-none rounded-lg ml-2"
              checked={ativo}
              onChange={() => setAtivo(!ativo)}
            />
          </div>
        </div>
        <div className="flex w-full items-center">
          <button
            type="submit"
            className="w-48 h-12 rounded-lg bg-[#C55A11] text-[#fff] hover:bg-[#ED7C31] transition-colors mt-2 mx-auto font-bold"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}
