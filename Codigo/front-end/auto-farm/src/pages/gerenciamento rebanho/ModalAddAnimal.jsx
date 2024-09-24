import { useState } from "react";
import BtnClose from "../../components/BtnClose";
import InputField from "../../components/InputField";
import { FaTimes } from "react-icons/fa";
import { create } from "../../services/AnimalService";

const ModalAddAnimal = ({closeModal}) => {

    const handleCloseModal = () => {
        closeModal(false)
    }

    

    const [animalName, setAnimalName] = useState("")
    const [animalSexo, setAnimalSexo] = useState("")
    const [animalRaca, setAnimalRaca] = useState("")
    const [animalNascimento, setAnimalNascimento] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnimal = {
            nome: animalName,
            sexo: animalSexo,
            raca: animalRaca,
            nascimento: animalNascimento
        }

        try {
            create(newAnimal).then(handleCloseModal)
            alert(newAnimal + "criado")
          } catch (error) {
            console.error("Erro ao cadastrar animal:", error);
            alert('você deve preencher todos os campos')
          }
    }

    

    return (
      <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70"> 
          <div className="flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5"> {/* Adicionada margem superior */}
            <BtnClose fecharModal = {handleCloseModal}/>

            <h1 className="text-emerald-950 text-2xl font-bold">Adicionar Animal</h1>
                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Nome</span>
                    <input type="text" placeholder="Ednaldo Pereira"className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                        value={animalName} onChange={(e) => setAnimalName(e.target.value)}
                    />
                </div>



            
            
            <div className="flex gap-5">
                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Sexo</span>
                    <input type="text" placeholder="femea"className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
                        value={animalSexo} onChange={(e) => setAnimalSexo(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-emerald-800 font-semibold">Raça</span>
                    <input type="text" placeholder="Brangus"className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
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
            

                <button className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900"
                    onClick={handleSubmit}
                >Cadastrar Animal</button>
          </div>
          
      </div>
    );
}

export default ModalAddAnimal;
