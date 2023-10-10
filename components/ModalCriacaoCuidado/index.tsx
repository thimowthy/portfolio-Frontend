import { useState } from "react";

export default function ModalCriacaoCuidado({
  setModalCuidado,
  cuidados,
}: any) {
  const [novoCuidado, setNovoCuidado] = useState("");

  const handleCuidado = async () => {
    cuidados.push(novoCuidado);
    setModalCuidado(false);

    //const token = localStorage.getItem("Authorization");

    /* const response = await fetch(`https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Usuario/DeleteUser/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }); */

    /* setTimeout(() => {
      setLoading(false);
      if (response.ok) {
        alert("Usuário removido com sucesso");
        setDeleteUser(false);
      } else {
        alert("Erro ao remover usuário");
      }
    }, 1000);

    setTimeout(async () => {
      await fetchUsers();
    }, 1000); */
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="modal z-50 bg-white p-8 rounded shadow-lg absolute">
        <h2 className="text-xl font-semibold mb-4">Novo Cuidado</h2>
        <div className="flex justify-center space-x-4">
          <textarea
            className="p-4 focus"
            name="cuidado"
            id="cuidado"
            cols={60}
            rows={10}
            value={novoCuidado}
            onChange={(e) => setNovoCuidado(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center w-full justify-between">
          <button
            className="bg-red-400 hover:bg-red-500 px-5 mt-4 py-3 text-sm w-[200px] h-[50px] leading-5 rounded-lg font-semibold text-white"
            onClick={() => setModalCuidado(false)}
          >
            Voltar
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-3 text-sm w-[200px] h-[50px] leading-5 rounded-lg font-semibold text-white"
            onClick={handleCuidado}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
