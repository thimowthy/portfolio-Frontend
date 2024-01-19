import fetcher from "@/api/fetcher";
import { use, useEffect, useState } from "react";
import ItemHistorico from "../ItemHistoricoTratamento";
import ItemHistoricoTratamento from "@/types/ItemHistoricoTratamento";

interface HistoricoTratamentoProps {
    id: string;
}

const HistoricoTratamentoList: React.FC<HistoricoTratamentoProps> = ({ id }) => {
    const [historico, setHistorico] = useState<ItemHistoricoTratamento[]>([]);

    useEffect(() => {
        const getInternacaoAtual = async () => {
            if (id) {
                try {
                    const response = await fetcher({
                        rota:
                            "/Internacao/GetInternacaoAtual?pacienteId=" +
                            id,
                        metodo: "GET",
                    });
                    return response["Id"];
                } catch (error) {
                    console.error("Erro ao buscar histórico:", error);
                    return null;
                }
            }
        };

        const fetchHistorico = async () => {
            const internacaoId = await getInternacaoAtual();
            if (internacaoId) {
                try {
                    const response = await fetcher({
                        rota:
                            "/Internacao/GetHistoricoTratamento?internamentoId=" +
                            internacaoId,
                        metodo: "GET",
                    });

                    setHistorico(response);
                } catch (error) {
                    console.error("Erro ao buscar histórico:", error);
                }
            }
        };
        fetchHistorico();
    }, [id]);

    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-2xl text-black font-gray-600">Histórico de Tratamentos</h1>
            </div>

            {historico.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center py-8">
                    <p className="text-gray-400 text-xl font-semibold">
                        Nenhum histórico de tratamento encontrado
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {historico.map((item, index) => (
                        <ItemHistorico
                            key={index}
                            historico={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoricoTratamentoList;