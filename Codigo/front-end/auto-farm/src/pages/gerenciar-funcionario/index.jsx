import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa"; // FaSearch adicionado aqui
import ListaFuncionarios from "./ListaFuncionarios";
import ModalAddFuncionario from "./ModalAddFuncionario";
import { getAll } from "../../services/FuncionarioService";

const GerenciarFuncionarios = () => {
  const [adicionarFuncionario, setAdicionarFuncionario] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa

  useEffect(() => {
    document.title = "Gerenciar Funcionários - AutoFarm";

    getAll().then((res) => {
      setFuncionarios(res.data);
    });
  }, []);

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">
      <h1 className="text-2xl sm:text-3xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Funcionários
      </h1>

      {/* Container dos botões e da barra de pesquisa */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4 w-full">
        
        

        {/* Botão Adicionar Funcionário */}
        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-10 sm:px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarFuncionario(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Funcionário
        </button>

        {/* Barra de Pesquisa */}
        <div className="flex w-full sm:w-auto justify-center sm:justify-start">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-emerald-800 rounded-lg py-3 px-4 sm:mr-2 w-full sm:w-auto"
          />
          <button className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>
      

      {/* Lista de Funcionários */}
      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaFuncionarios
          funcionarios={funcionarios}
          setFuncionarios={setFuncionarios}
          searchTerm={searchTerm} // Passando o termo de pesquisa para o componente ListaFuncionarios
        />
      </div>

      {adicionarFuncionario && (
        <ModalAddFuncionario closeModal={() => setAdicionarFuncionario(false)} />
      )}
    </div>
  );
};

export default GerenciarFuncionarios;
