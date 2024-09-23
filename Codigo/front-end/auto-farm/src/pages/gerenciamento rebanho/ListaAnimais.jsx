import { useState } from "react";
import { FaEye, FaTrashAlt, FaEdit, FaTimes  } from "react-icons/fa"; // Importando ícones

const ListaAnimais = () => {
  const [animais, setAnimais] = useState([
    { id: 1, raca: "boi", },
    { id: 2, raca: "vaca", },
    { id: 3, raca: "vaca", },
    { id: 4, raca: "vaca", },
    { id: 5, raca: "vaca", },
    { id: 6, raca: "vaca", },
    { id: 7, raca: "boi", },
    { id: 8, raca: "boi", },
    { id: 9, raca: "vaca", },
    { id: 10, raca: "vaca", },
    { id: 11, raca: "vaca", },
    { id: 12, raca: "vaca", },
    
  ])

  const [animalParaExcluir, setAnimalParaExcluir] = useState(null) 
  const [modalVisivel, setModalVisivel] = useState(false)

  const removerAnimal = (id) => {
    const novaListaAnimais = animais.filter((animal) => animal.id !== id); 
    setAnimais(novaListaAnimais);
    // fetch para delete animal na base de dados
    fecharModal()
  };

  const abrirModal = (animal) => {
    setAnimalParaExcluir(animal); 
    setModalVisivel(true); 
  };

  const fecharModal = () => {
    setAnimalParaExcluir(null); 
    setModalVisivel(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 text-2xl">
      {animais.map((a) => (
        <div
          key={a.id}
          className="flex justify-between items-center p-2 px-7 border border-emerald-800 rounded-xl shadow-lg mx-2 bg-white"
        >
          {/* ID e Raça */}
          <div>
            <p className="font-bold text-emerald-800">id:{a.id}</p>
            <p className="text-gray-500 text-lg">{a.raca}</p>
          </div>

          {/* Ícones - MUDAR CONFORME SOLICITADO*/}
          <div className="flex space-x-4 text-3xl ">
            <FaEye className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300" />
            <FaTrashAlt className="text-emerald-800 cursor-pointer hover:text-red-500 transition duration-300" 
                onClick={() => abrirModal(a)}
            />
            <FaEdit className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300" />
          </div>
        </div>
      ))}



      {modalVisivel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center relative">
                <button
                    onClick={fecharModal}
                    className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500 transition duration-300"
                >
                    <FaTimes />
                </button>

                <h2 className="text-xl font-semibold mb-0 mt-3"> Deseja excluir este animal? </h2>
                <p className="text-gray-700 mb-8 text-base">
                    Você está prestes a deletar o animal de ID {animalParaExcluir?.id}.
                </p>
                <div className="flex justify-center space-x-10">

                <button 
                        onClick={() => removerAnimal(animalParaExcluir.id)}
                        className="bg-red-500 border-2 border-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transiction duration-300"
                        > 
                        Sim 
                </button>
                <button 
                        onClick={fecharModal}
                        className="bg-emerald-800 border-2 border-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-800 transiction duration-300"
                        > Não 
                </button>
                    
                    
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ListaAnimais;
