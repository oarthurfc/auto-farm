import { useState, useEffect } from "react";
import BtnClose from "../../components/BtnClose";
import { create, update } from "../../services/PastoService"; 

const ModalAddEditPasto = ({ closeModal, pastoToEdit }) => {
  const [nome, setNome] = useState("");
  const [dataInicial, setDataInicial] = useState(new Date().toISOString().substring(0, 10));
  const [dataFinal, setDataFinal] = useState("");

  useEffect(() => {
    if (pastoToEdit) {
      setNome(pastoToEdit.nome);
      setDataInicial(new Date(pastoToEdit.dataInicial).toISOString().substring(0, 10));
      setDataFinal(pastoToEdit.dataFinal ? new Date(pastoToEdit.dataFinal).toISOString().substring(0, 10) : "");
    }
  }, [pastoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPasto = {
      nome,
      dataInicial,
      dataFinal,
    };

    if (pastoToEdit) {
      // Editar
      update(pastoToEdit._id, newPasto)
        .then(() => {
          closeModal();
          alert(`${newPasto.nome} foi atualizado com sucesso!`);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Erro ao atualizar pasto:", error);
          alert("Preencha todos os campos corretamente!");
        });
    } else {
      // Adicionar
      create(newPasto)
        .then(() => {
          closeModal();
          alert(`${newPasto.nome} foi adicionado com sucesso!`);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Erro ao cadastrar pasto:", error);
          alert("Preencha todos os campos corretamente!");
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
      <div className="flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5">
        <BtnClose fecharModal={closeModal} />

        <h1 className="text-emerald-950 text-2xl font-bold">
          {pastoToEdit ? "Editar Pasto" : "Adicionar Pasto"}
        </h1>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Nome do Pasto</span>
          <input
            type="text"
            maxLength={50}
            placeholder="Ex: Pasto A"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Data Inicial</span>
            <input
              type="date"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Data Final (Opcional)</span>
            <input
              type="date"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>


        <button
          className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900"
          onClick={handleSubmit}
        >
          {pastoToEdit ? "Atualizar Pasto" : "Cadastrar Pasto"}
        </button>
      </div>
    </div>
  );
};

export default ModalAddEditPasto;
