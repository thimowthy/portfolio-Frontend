import { useState, useEffect } from "react";

export default function DeleteUsuario({ user }: any) {
  useEffect(() => {
    alert(`Tem certeza de que deseja apagar ${user.nome} ?`);
  }, []);

  return (
    <div> 
    </div>
  );
}
