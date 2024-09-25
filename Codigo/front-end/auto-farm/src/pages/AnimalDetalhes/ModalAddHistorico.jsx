import { useState } from "react";
import BtnClose from "../../components/BtnClose";
import { create } from "../../services/HistoricoService"; // Ajuste o caminho de importação conforme necessário

const ModalAddHistorico = ({ closeModal, animalId }) => {
    const handleCloseModal = () => {
        closeModal(false);
    };

    const [data, setData] = useState("");
    const [peso, setPeso] = useState("");
    const [tratamento, setTratamento] = useState("");
    const [local, setLocal] = useState("");
    const [tamanho, setTamanho] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newHistorico = {
            data: data,
            peso: peso, // Converter para número
            tratamento: tratamento,
            local: local,
            tamanho: tamanho, // Converter para número  
            animalId: animalId
        };
        console.log(newHistorico)
        create(newHistorico)
            .then(() => {
                 // Fecha o modal após o sucesso
                alert(`${newHistorico.tratamento} registrado com sucesso`); // Mensagem de sucesso
                handleCloseModal();
                
            })
            .catch((error) => {
                console.error("Erro ao cadastrar histórico:", error);
                alert('Você deve preencher todos os campos!'); // Mensagem de erro
            });
    };

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
            <div className="flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5">
                <BtnClose fecharModal={handleCloseModal} />

                <h1 className="text-emerald-950 text-2xl font-bold">Adicionar Histórico</h1>

                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Data</span>
                    <input
                        type="date"
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                        value={data} onChange={(e) => setData(e.target.value)}
                    />
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Peso (Kg)</span>
                        <input
                            type="number"
                            placeholder="Peso em kg"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                            value={peso} onChange={(e) => setPeso(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Tratamento</span>
                        <input
                            type="text"
                            placeholder="Descrição do tratamento"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                            value={tratamento} onChange={(e) => setTratamento(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Local</span>
                        <input
                            type="text"
                            placeholder="Local do tratamento"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                            value={local} onChange={(e) => setLocal(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-emerald-800 font-semibold">Tamanho (cm)</span>
                        <input
                            type="number"
                            placeholder="Tamanho em cm"
                            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                            value={tamanho} onChange={(e) => setTamanho(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900"
                    onClick={handleSubmit}
                >
                    Cadastrar Histórico
                </button>
            </div>
        </div>
    );
};

export default ModalAddHistorico;
