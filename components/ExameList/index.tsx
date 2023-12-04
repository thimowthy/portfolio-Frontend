import React, { useEffect, useState } from "react";
import ItemListaExame from "../ItemListaExame";
import Image from "next/image";
import exameCinza from "@/public/medical-report-gray.png";
import Router from "next/router";

interface ExameListProps {
  id: string;
}
const ExamesList: React.FC<ExameListProps> = ({ id }) => {
  const [exames, setExames] = useState<Exame[]>([]);

  useEffect(() => {
    const fetchExames = async () => {
      try {
        const response = await fetch(
          // TO DO - ATUALIZAR URL
          "https://localhost:7091/Exame/GetHemogramasFromPaciente?pacienteId=" +
            id,
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setExames(data);
        }
      } catch (error) {
        console.error("Erro ao buscar exames:", error);
      }
    };

    fetchExames();
  }, [id]);

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-2xl text-black font-gray-600">Exames</h1>
      </div>

      
      {exames.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center py-8">
          <Image
            className="h-160 w-160 flex-none bg-opacity-50"
            src={exameCinza}
            width="250"
            height="250"
            alt="Exame"
          />
          <p className="text-center text-gray-400 text-3xl font-bold mt-4">
            Nenhum exame <br /> realizado
          </p>
        </div>
      ) : (
        <ul>
          {exames.map((exame, index) => (
            <ItemListaExame
              nome={exame.nome}
              dataSolicitacao={exame.dataSolicitacao}
              dataResultado={exame.dataResultado}
              solicitante={exame.solicitante}
              key={index}
            ></ItemListaExame>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamesList;
