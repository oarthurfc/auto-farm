import { useState } from "react";
import BtnClose from "../../components/BtnClose";
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

       
        create(newAnimal)
        .then(() => {
            handleCloseModal(); // Fecha o modal após o sucesso
            alert(`${newAnimal.nome} foi criado`); // Mensagem de sucesso
            window.location.reload();
        })
        .catch((error) => {
            console.error("Erro ao cadastrar animal:", error);
            alert('Você deve preencher todos os campos!'); // Mensagem de erro
        });

        
          
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
                    <select 
                        className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal text-sm  text-emerald-950 "
                        value={animalSexo} 
                        onChange={(e) => setAnimalSexo(e.target.value)}
                    >
                        <option value="" disabled>Selecione o sexo</option> 
                        <option value="femea" className="text-black  text-sm">femea</option>
                        <option value="macho" className="text-black  text-sm">macho</option>
                    </select>
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
