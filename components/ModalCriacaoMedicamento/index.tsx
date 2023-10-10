import { useState, useEffect } from "react";

export default function ModalCriacaoMedicamento({ lista, medicamentos, setModalMedicamento }: any) {

  const [medList, setMedlist] = useState([]);

  useEffect(() => {
    var listAux: any = [];
    lista.forEach((element: any) => {
      if (element.ATBs[0].primeira_opcao) {
        listAux.push(element.ATBs[0].primeira_opcao);
      }
      if (element.ATBs[0].segunda_opcao) {
        listAux.push(element.ATBs[0].segunda_opcao);
      }
    });
    setMedlist(listAux);
    console.log("meds", medList);
  }, []);

  const addMedicamento = (element: any) => {
    medicamentos.push(element);
  };

  const handleMedicamento = async () => {

    //const token = localStorage.getItem("Authorization");

    /* const response = await fetch(`http://localhost:7091/Usuario/DeleteUser/${user.id}`, {
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
        <h2 className="text-xl font-semibold mb-4">
          Novo medicamento
        </h2>
        <div className="flex justify-center space-x-4">
          <ul style={{ listStyle: "circle" }}>
            {medicamentos.map((el: any) => (
              <li key={el}>
                <p>{el}</p>
              </li>))}
          </ul>
        </div>

        <div className="flex justify-center space-x-4">
          <ul>
            {medList?.map((el: any) => (
              <li key={el}>
                <a className="cursor-pointer" onClick={() => addMedicamento(el)}>
                  <p>
                    {el}
                  </p>
                </a>
              </li>))}
          </ul>
        </div>

        <div className="flex pt-16 items-center gap-6 min-w-[400px] min-h-[200px] w-full justify-between">
          <button className="bg-red-400 hover:bg-red-500 px-5 mt-4 py-3 text-sm w-[200px] h-[50px] leading-5 rounded-lg font-semibold text-white" onClick={() => setModalMedicamento(false)}>Voltar</button>
          <button className="bg-blue-700 hover:bg-blue-900 px-5 mt-4 py-3 text-sm w-[200px] h-[50px] leading-5 rounded-lg font-semibold text-white" onClick={handleMedicamento}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
