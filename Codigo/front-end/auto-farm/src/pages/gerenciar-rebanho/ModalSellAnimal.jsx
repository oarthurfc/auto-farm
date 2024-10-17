import { useState, useEffect } from "react";
import BtnClose from "../../components/BtnClose";
import { getAll } from "../../services/AnimalService";
import { atualizarLote, getAllLotes } from "../../services/LoteService";

const ModalSellAnimal = ({ closeModal }) => {
  const handleCloseModal = () => {
    closeModal(false);
  };

  const [animalSelecionado, setAnimalSelecionado] = useState("");
  const [animais, setAnimais] = useState([]);
  const [animalPrice, setAnimalPrice] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [loteId, setLoteId] = useState("");
  const [lotes, setLotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sellData = {
      preco: animalPrice,
      data: sellDate,
      comprador: buyerName,
      id: animalSelecionado,
    };
    console.log(sellData);

    getAllLotes().then((res) => {
      console.log("Lotes disponíveis:", res.data);
      const loteExistente = res.data.find((lote) => lote._id === loteId);

      if (!loteExistente) {
        alert("Lote não encontrado.");
        return;
      }

      const animaisLote = Array.isArray(loteExistente.animais)
        ? loteExistente.animais
        : [];

      if (animaisLote.includes(animalSelecionado)) {
        alert("O animal já foi registrado neste lote.");
        return;
      }

      // Adicionar o animal no array de animais do lote existente
      animaisLote.push(animalSelecionado);

      // Atualizar o valor total do lote
      let valorTotalAtualizado = loteExistente.valorTotal;
      valorTotalAtualizado += parseFloat(animalPrice);

      // Criação do objeto atualizado do lote sem spread
      const loteDataAtualizado = {
        ...loteExistente,
        animais: animaisLote,
        valorTotal: valorTotalAtualizado,
      };

      // Envio para o backend
      atualizarLote(loteId, loteDataAtualizado)
        .then(() => {
          // Recarregue os lotes após a atualização
          getAllLotes().then((res) => setLotes(res.data));

          handleCloseModal();
          alert(
            `Animal vendido para ${sellData.comprador} e adicionado ao lote ${loteId}.`
          );
        })
        .catch((error) => {
          console.error("Erro ao atualizar o lote:", error);
          alert("Ocorreu um erro ao processar a venda.");
        });
    });
  };

  useEffect(() => {
    getAll().then((res) => setAnimais(res.data));

    // Obter os lotes existentes do banco de dados
    getAllLotes().then((res) => setLotes(res.data));
  }, []);

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
      <div className="min-w-[475px] flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5">
        <BtnClose fecharModal={handleCloseModal} />
        <h1 className="text-emerald-950 text-2xl font-bold">Vender Animal</h1>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Id do Lote</span>
          <select
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
            value={loteId}
            onChange={(e) => setLoteId(e.target.value)}
          >
            <option value="" disabled>
              Selecione o Id do lote
            </option>
            {lotes.map((lote) => (
              <option key={lote._id} value={lote._id}>
                {lote._id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Id do animal</span>
          <select
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
            value={animalSelecionado}
            onChange={(e) => setAnimalSelecionado(e.target.value)}
          >
            <option value="" disabled>
              Selecione o Id do animal
            </option>
            {animais.map((animal) => (
              <option key={animal._id} value={animal._id}>
                {animal._id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Preço</span>
            <input
              type="number"
              placeholder="Preço do animal"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={animalPrice}
              onChange={(e) => setAnimalPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Data da Venda</span>
            <input
              type="date"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal text-sm text-emerald-950"
              value={sellDate}
              onChange={(e) => setSellDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Nome do Comprador</span>
          <input
            type="text"
            placeholder="Nome do Comprador"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
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

export default ModalSellAnimal;
