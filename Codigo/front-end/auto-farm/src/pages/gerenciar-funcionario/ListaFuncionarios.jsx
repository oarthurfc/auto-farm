import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEye, FaEdit } from "react-icons/fa"; // FaUserTie será o ícone da pessoa
import BtnClose from "../../components/BtnClose";
import { getAll, deletar, update } from "../../services/FuncionarioService";
import ModalEditFuncionario from './ModalEditFuncionario'; // Supondo que o modal de edição de funcionário esteja implementado

const ListaFuncionarios = () => {
  const navigate = useNavigate(); 

  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState(null);
  const [modalEditVisivel, setModalEditVisivel] = useState(false);
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    getAll().then((res) => setFuncionarios(res.data));
  }, []);

  const visualizarFuncionario = (id) => {
    navigate(`/funcionario/${id}`);
  };

  const abrirModalEditar = (funcionario) => {
    setFuncionarioParaEditar(funcionario);
    setModalEditVisivel(true);
  };

  const closeModalEdit = () => {
    setFuncionarioParaEditar(null);
    setModalEditVisivel(false);
  };

  const handleEdit = (updatedFuncionario) => {
    update(updatedFuncionario._id, updatedFuncionario)
      .then(() => getAll())
      .then((res) => {
        setFuncionarios(res.data);
        closeModalEdit();
      })
      .catch((error) => console.error("Erro ao atualizar o funcionário:", error));
  };

  const removerFuncionario = (id) => {
    deletar(id)
      .then(() => {
        const novaListaFuncionarios = funcionarios.filter((funcionario) => funcionario._id !== id);
        setFuncionarios(novaListaFuncionarios);
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao deletar o funcionário:", error);
        alert("Erro ao deletar o funcionário de id: " + id);
      });
    fecharModal();
  };

  const abrirModal = (funcionario) => {
    setFuncionarioParaExcluir(funcionario);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setFuncionarioParaExcluir(null);
    setModalVisivel(false);
  };

  return (
    <div className="p-10">

      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {funcionarios.map((f) => (
          <div
            key={f._id}
            className="border border-black rounded-lg shadow-lg p-5 mx-2 text-center relative bg-white "
          >
            <FaUserTie className="text-8xl text-gray-400 mx-auto mb-4" /> {/* Ícone da pessoa */}
            <p className="text-xl font-semibold text-gray-700 mb-2">{f.nome}</p>
            <p className="text-sm text-gray-500">{f.cargo}</p> {/* Cargo do funcionário */}

            <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <FaEye
                    className="text-2xl text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300"
                    title="Visualizar"
                    onClick={() => visualizarFuncionario(f._id)}
                />
                <FaEdit
                    className="text-2xl text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300"
                    title="Editar"
                    onClick={() => abrirModalEditar(f)}
                />
</div>

          </div>
        ))}
      </div>

      {modalVisivel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center relative">
            <BtnClose fecharModal={fecharModal} />

            <h2 className="text-xl font-semibold mb-0 mt-3">
              Deseja excluir este funcionário?
            </h2>
            <p className="text-gray-700 mb-8 text-base">
              Você está prestes a deletar o funcionário de ID: <br />{" "}
              {funcionarioParaExcluir?._id}.
            </p>
            <div className="flex justify-center space-x-10">
              <button
                onClick={() => removerFuncionario(funcionarioParaExcluir._id)}
                className="bg-red-500 border-2 border-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition duration-300"
              >
                Sim
              </button>
              <button
                onClick={fecharModal}
                className="bg-emerald-800 border-2 border-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-800 transition duration-300"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
     
      {modalEditVisivel && (
        <ModalEditFuncionario
          closeModal={closeModalEdit}
          funcionarioSelecionado={funcionarioParaEditar}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ListaFuncionarios;
