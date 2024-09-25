import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import BtnClose from "../../components/BtnClose";
import { getAll, deletar } from "../../services/AnimalService";

const ListaAnimais = ({ setEditarAnimalModal, setAnimalSelecionado }) => {

  const navigate = useNavigate(); 

  const visualizarAnimal = (id) => {
    navigate(`/animal/${id}`);
  };

  const abrirModalEditar = (animal) => {
    setAnimalSelecionado(animal); // Define o animal selecionado
    setEditarAnimalModal(true); // Abre o modal
  };

  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    getAll().then((res) => setAnimais(res.data));
  }, []);

  const [animalParaExcluir, setAnimalParaExcluir] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const removerAnimal = (id) => {
    deletar(id)
      .then(() => {
        const novaListaAnimais = animais.filter((animal) => animal.id !== id);
        setAnimais(novaListaAnimais);
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao deletar o animal:", error);
        alert("Erro ao deletar o animal: de id " + id);
      });
    fecharModal();
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pb-10 text-2xl">
      {animais.map((a) => (
        <div
          key={a._id}
          className="flex justify-between items-center p-2 px-7 border border-emerald-800 rounded-xl shadow-lg mx-2 bg-white"
        >
          {/* ID e Raça */}
          <div className="text-start">
            <p className=" text-emerald-800">{`${a.sexo}`}</p>
            <p className="text-gray-500 text-lg">{a.raca}</p>
          </div>

          {/* Ícones - MUDAR CONFORME SOLICITADO */}
          <div className="flex space-x-5 text-3xl ">
            <FaEye
              className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300"
              title="Visualizar"
              onClick={() => visualizarAnimal(a._id)}
            />
            <FaTrashAlt
              className="text-emerald-800 cursor-pointer hover:text-red-500 transition duration-300"
              title="Deletar"
              onClick={() => abrirModal(a)}
            />
            <FaEdit
              className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300"
              title="Editar"
              onClick={() => abrirModalEditar(a) }
            />
          </div>
        </div>
      ))}

      {modalVisivel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center relative">
            <BtnClose fecharModal={fecharModal} />

            <h2 className="text-xl font-semibold mb-0 mt-3">
              Deseja excluir este animal?
            </h2>
            <p className="text-gray-700 mb-8 text-base">
              Você está prestes a deletar o animal de ID: <br />{" "}
              {animalParaExcluir?._id}.
            </p>
            <div className="flex justify-center space-x-10">
              <button
                onClick={() => removerAnimal(animalParaExcluir._id)}
                className="bg-red-500 border-2 border-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transiction duration-300"
              >
                Sim
              </button>
              <button
                onClick={fecharModal}
                className="bg-emerald-800 border-2 border-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-800 transiction duration-300"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAnimais;
