import { useState, useEffect } from "react"; 
import BtnClose from "../../components/BtnClose";
import { getAll, deletar } from "../../services/AnimalService";
import { create } from "../../services/TransacoesService";

const ModalSellLote = ({ closeModal }) => {
    const [animais, setAnimais] = useState([]);
    const [animaisSelecionados, setAnimaisSelecionados] = useState([]);
    const [valorTotal, setValorTotal] = useState("");
    const [data, setData] = useState("");
    const [valorArroba, setValorArroba] = useState("");
    const [pesoTotal, setPesoTotal] = useState("");
    const [nomeComprador, setNomeComprador] = useState("");

    useEffect(() => {
        getAll().then((res) => {
            console.log("Animais carregados:", res.data);
            setAnimais(res.data);
        });
    }, []);

    const handleAnimalSelection = (animalId) => {
        setAnimaisSelecionados((prevSelecionados) => {
            if (prevSelecionados.includes(animalId)) {
                return prevSelecionados.filter((id) => id !== animalId);
            } else {
                return [...prevSelecionados, animalId];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransacao = {
            tipoTransacao: "ganho",
            valorTotal: parseFloat(valorTotal),
            data: data,
            valorArroba: parseFloat(valorArroba),
            pesoTotal: parseFloat(pesoTotal),
            nomeComprador: nomeComprador,
            animais: animaisSelecionados
        };


        console.log("Transação a ser enviada:", newTransacao);

        create(newTransacao)
            .then(() => {
                Promise.all(animaisSelecionados.map((animalId) => deletar(animalId)))
                    .then(() => {
                        alert(`Novo ${newTransacao.tipoTransacao} foi registrado nas transações.`);
                        closeModal();
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("Erro ao deletar animais:", error);
                        alert("Erro ao processar a venda.");
                    });
            })
            .catch((error) => {
                console.error("Erro ao criar transação:", error);
                console.error("Detalhes do erro:", error.response?.data); // Inclui detalhes da resposta
                alert("Erro ao registrar transação.");
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg text-start relative">
                <BtnClose fecharModal={closeModal} />

                <h1 className="text-emerald-950 text-2xl font-bold">Vender Animais</h1>

                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Nome do Comprador</span>
                    <input
                        type="text"
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                        value={nomeComprador}
                        onChange={(e) => setNomeComprador(e.target.value)}
                    />
                </div>

                {/* Inputs organizados em duas colunas */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Valor Total</span>
                        <input
                            type="number"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                            value={valorTotal}
                            onChange={(e) => setValorTotal(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Data da Venda</span>
                        <input
                            type="date"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Valor por Arroba</span>
                        <input
                            type="number"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                            value={valorArroba}
                            onChange={(e) => setValorArroba(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Peso Total</span>
                        <input
                            type="number"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
                            value={pesoTotal}
                            onChange={(e) => setPesoTotal(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <span className="text-emerald-800 font-semibold">Selecione Animais</span>
                    <ul className="list-inside">
                        {animais.map((animal) => (
                            <li key={animal._id} className="text-emerald-950">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={animaisSelecionados.includes(animal._id)}
                                        onChange={() => handleAnimalSelection(animal._id)}
                                    />
                                    {`${animal.nome} - ID: ${animal._id}`}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className="bg-emerald-500 text-white text-xl rounded-md p-2 mt-6 hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Registrar Venda
                </button>
            </div>
        </div>
    );
};

export default ModalSellLote;