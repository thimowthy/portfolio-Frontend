export default function DeleteUsuario({
  user,
  setDeleteUser,
  setLoading,
  fetchUsers,
}: any) {
  const closeModal = () => {
    //setIsModalOpen(false);
    setDeleteUser(false);
  };

  const handleDelete = async () => {
    closeModal();
    setLoading(true);

    const token = localStorage.getItem("Authorization");

    const response = await fetch(
      `https://dev-oncocaresystem-d5b03f00e4f3.herokuapp.com/Usuario/DeleteUser/${user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTimeout(() => {
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
    }, 1000);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="modal z-50 bg-white p-8 rounded shadow-lg absolute">
        <h2 className="text-xl font-semibold mb-4">
          Tem certeza de que deseja apagar {user.nome}?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Sim, apagar
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-400 hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
