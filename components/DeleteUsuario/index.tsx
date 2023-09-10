import { useState, useEffect } from "react";

export default function DeleteUsuario({ user, onDelete, setDeleteUser }: any) {

  const closeModal = () => {
    //setIsModalOpen(false);
    setDeleteUser(false);
  };

  const handleDelete = () => {
    onDelete(user.id); // Substitua com a lógica real de exclusão
    closeModal();
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
                Sim, Apagar
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
