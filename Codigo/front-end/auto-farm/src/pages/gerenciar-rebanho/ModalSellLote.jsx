import { useState, useEffect } from "react";
import BtnClose from "../../components/BtnClose";
import { getLote, deletar } from "../../services/AnimalService";
import { create } from "../../services/TransacoesService"; // Importando create e getAllLotes
import { getAllLotes } from "../../services/LoteService";

const ModalSellLote = ({ closeModal }) => {
    const [animaisLote, setAnimaisLote] = useState([]);
    const [valorTotalLote, setValorTotalLote] = useState(0);
    const [sellDate, setSellDate] = useState("");
    const [lotes, setLotes] = useState([]);
    const [loteId, setLoteId] = useState(""); // Estado para armazenar o lote selecionado

    const handleCloseModal = () => {
        closeModal(false);
    }

    // Função que busca todos os lotes ao montar o componente
    useEffect(() => {
        getAllLotes().then((res) => {
            setLotes(res.data); // Armazena todos os lotes no estado
        });
    }, []);

    // Função que busca o lote selecionado e atualiza os animais e o valor total
    useEffect(() => {
        if (loteId) {
            getLote(loteId).then((res) => {
                const lote = res.data;
                setAnimaisLote(lote.animais);
                setValorTotalLote(lote.valorTotal);
            });
        } else {
            // Reseta os dados se nenhum lote for selecionado
            setAnimaisLote([]);
            setValorTotalLote(0);
        }
    }, [loteId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sellDate) {
            alert("Por favor, selecione uma data de venda.");
            return;
        }

        const transacao = {
            tipo: "ganho",
            valor: valorTotalLote,
            data: sellDate,
        };

        create(transacao)
            .then(() => {
                Promise.all(animaisLote.map((animalId) => deletar(animalId)))
                    .then(() => {
                        alert("Lote vendido com sucesso!");
                        handleCloseModal();
                        window.location.reload(); // Você pode querer substituir isso por uma atualização do estado
                    })
                    .catch((error) => {
                        console.error("Erro ao deletar animais:", error);
                        alert("Erro ao vender o lote.");
                    });
            })
            .catch((error) => {
                console.error("Erro ao criar transação:", error);
                alert("Erro ao registrar transação.");
            });
    };

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
            <div className="min-w-[475px] flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5">
                <BtnClose fecharModal={handleCloseModal} />

                <h1 className="text-emerald-950 text-2xl font-bold">Vender Lote</h1>

                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Selecione o Lote</span>
                    <select
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                        value={loteId}
                        onChange={(e) => setLoteId(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione o lote
                        </option>
                        {lotes.map((lote) => (
                            <option key={lote._id} value={lote._id}>
                                {lote._id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <span className="text-emerald-800 font-semibold">Animais no Lote</span>
                    <ul className="list-disc list-inside">
                        {animaisLote.length > 0 ? (
                            animaisLote.map((animalId) => (
                                <li key={animalId} className="text-emerald-950">{animalId}</li>
                            ))
                        ) : (
                            <li className="text-emerald-950">Nenhum animal encontrado neste lote.</li>
                        )}
                    </ul>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <span className="text-emerald-800 font-semibold">Valor Total do Lote</span>
                    <input
                        type="text"
                        readOnly
                        value={`R$ ${valorTotalLote.toFixed(2)}`}
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal text-sm text-emerald-950"
                    />
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <span className="text-emerald-800 font-semibold">Data da Venda</span>
                    <input
                        type="date"
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal text-sm text-emerald-950"
                        value={sellDate}
                        onChange={(e) => setSellDate(e.target.value)}
                    />
                </div>

                <button
                    className="bg-emerald-500 text-white text-xl rounded-md p-2 mt-6 hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Vender Lote
                </button>
            </div>
        </div>
    );
};

export default ModalSellLote;
