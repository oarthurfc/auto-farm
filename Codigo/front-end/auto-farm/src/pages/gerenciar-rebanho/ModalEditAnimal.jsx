import BtnClose from "../../components/BtnClose";
import InputField from "../../components/InputField";


const ModalEditAnimal = ({closeModal}) => {

    const handleCloseModal = () => {
        closeModal(false)
    }

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
        <div className="flex overflow-y-auto max-h-[100vh] text-base scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-center relative mr-5">
            <BtnClose fecharModal={handleCloseModal} />
            <h1 className="text-emerald-950 text-2xl font-bold">Editar Animal</h1>
            <InputField 
                label="Nome"
                placeholder="Ednaldo Pereira"
                type="text"/>
            
            <div className="flex gap-5">
            <InputField 
                label="Sexo"
                placeholder="Feminino" 
                type="text"/>
            <InputField 
                label="Raça"
                placeholder="Brangus"
                type="text"/>
            </div>
            <div className="flex gap-5">
            <InputField 
                label="Data de Nascimento"
                placeholder="10"
                type="text"/>
            <InputField 
                label="Peso (Kg)"
                placeholder="14"
                type="text"/>
            </div>
            <InputField 
                label="Problemas de Saúde"
                placeholder="Doenças, Fraturas..."
                type="textarea"/>

                <button className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900">Confirmar</button>
        </div>
    </div>
  )
} 

export default ModalEditAnimal