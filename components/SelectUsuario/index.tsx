'use client'

export default function SelectUsuario({
  cargos,
  cargoSelecionado,
  setSelectedRole
}: any) {
  return (
    <>
      <div className="flex items-center justify-center w-22 h-22 pt-28">
        <div className="flex flex-col">
          <label htmlFor="cagos">Selecione o cargo desejado</label>
          <select
            name="cargos"
            id="cargos"
            className="w-48 h-8 mt-3"
            onChange={(e) => {
              const selectedCargo = cargos.find(
                (cargo: Cargo) => cargo.valor === e.target.value
              )
              if (selectedCargo) {
                setSelectedRole(selectedCargo)
              }
            }}
          >
            <option disabled value="">
              Selecione o cargo
            </option>
            {cargos.map((cargo: Cargo) => (
              <option
                value={cargo.valor}
                key={cargo.valor}
                selected={cargo.valor === cargoSelecionado.valor}
              >
                {cargo.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
