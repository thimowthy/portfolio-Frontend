import dynamic from 'next/dynamic'
import { useState } from 'react'

const SelectCargos = dynamic(() => import('../components/SelectUsuario'), {
  ssr: false
})
const FormUsuario = dynamic(() => import('../components/FormUsuario'), {
  ssr: false
})

const CrudUsuario = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const cargos = [
    { nome: 'Médico', valor: 'medico' },
    { nome: 'Enfermeiro', valor: 'enfermeiro' },
    { nome: 'Odontólogo', valor: 'odontologo' }
  ]

  return (
    <>
      {selectedRole === '' ? (
        <SelectCargos cargos={cargos} setSelectedRole={setSelectedRole} />
      ) : (
        <FormUsuario cargo={selectedRole} />
      )}
    </>
  )
}

export default CrudUsuario
