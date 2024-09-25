import BtnClose from "../../components/BtnClose";
import InputField from "../../components/InputField";
import { useState } from "react";

const ModalEditAnimal = ({ closeModal, animalSelecionado, onEdit }) => {
  const [updatedData, setUpdatedData] = useState({
    nome: animalSelecionado?.nome || '',
    sexo: animalSelecionado?.sexo || '',
    raca: animalSelecionado?.raca || '',
    nascimento: animalSelecionado?.dataNascimento || '',
    
  });

  const [animalName, setAnimalName] = useState("")
  const [animalSexo, setAnimalSexo] = useState("")
  const [animalRaca, setAnimalRaca] = useState("")
  const [animalNascimento, setAnimalNascimento] = useState("")




  const handleCloseModal = () => {
    closeModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const newAnimal = {
        nome: animalName,
        sexo: animalSexo,
        raca: animalRaca,
        nascimento: animalNascimento
    }
    onEdit(newAnimal)


  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
      <div className="flex overflow-y-auto max-h-[100vh] text-base scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-center relative mr-5">
        <BtnClose fecharModal={handleCloseModal} />
        <h1 className="text-emerald-950 text-2xl font-bold">Editar animal: {animalSelecionado?.nome}</h1>
        
        <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Nome</span>
            <input type="text" placeholder={animalSelecionado.nome} className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                        value={animalName} onChange={(e) => setAnimalName(e.target.value)}
                />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Sexo</span>
              <select 
                className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal text-sm text-emerald-950"
                value={animalSexo} 
                onChange={(e) => setAnimalSexo(e.target.value)}
              >
                {animalSelecionado.sexo === 'femea' ? (
                  <>
                    <option value="femea" className="text-black text-sm">Fêmea</option>
                    <option value="macho" className="text-black text-sm">Macho</option>
                  </>
                ) : (
                  <>
                    <option value="macho" className="text-black text-sm">Macho</option>
                    <option value="femea" className="text-black text-sm">Fêmea</option>
                  </>
                )}
                
                </select>
            </div>
                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Raça</span>
                    <input type="text" placeholder={animalSelecionado.raca} className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                        value={animalRaca} onChange={(e) => setAnimalRaca(e.target.value)}

                    />
                </div>
        </div>

        <div className="flex flex-col gap-1">
                <span className="text-emerald-800 font-semibold">Data de Nascimento</span>
                <input type="date" placeholder="10"className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                    value={animalNascimento} onChange={(e) => setAnimalNascimento(e.target.value)} 
                />
        </div>


        <button
          onClick={handleConfirm}
          className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ModalEditAnimal;
