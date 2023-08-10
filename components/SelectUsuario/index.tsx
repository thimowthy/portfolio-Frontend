'use client'

export default function SelectUsuario({ cargos, setSelectedRole }: any) {
  return (
    <>
      <div className="flex items-center justify-center w-22 h-22 py-5">
        <div className="flex flex-col">
          <label htmlFor="cagos">Selecione o cargo desejado</label>
          <select
            name="cargos"
            id="cargos"
            className="w-28 h-8"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {cargos.map((cargo: Cargo) => (
              <option value={cargo.valor}>{cargo.nome}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
