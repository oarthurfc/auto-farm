import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ListaFuncionarios from "./ListaFuncionarios";
import ModalAddFuncionario from "./ModalAddFuncionario";
import { getAll } from '../../services/FuncionarioService';

const GerenciarFuncionarios = () => {
  const [adicionarFuncionario, setAdicionarFuncionario] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Gerenciar Funcionários - AutoFarm";

    getAll().then((res) => {
      setFuncionarios(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Funcionários
      </h1>

      {/* Container dos botões e barra de pesquisa */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4">
        {/* Botão Adicionar Funcionário */}
        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarFuncionario(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Funcionário
        </button>

        {/* Barra de pesquisa */}
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar por palavra-chave"
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-emerald-800 rounded-lg py-3 px-10 w-full sm:w-auto mr-1"
          />
          <button className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Lista de Funcionários */}
      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaFuncionarios funcionarios={filteredFuncionarios} />
      </div>

      {adicionarFuncionario && <ModalAddFuncionario closeModal={() => setAdicionarFuncionario(false)} />}
    </div>
  );
};

export default GerenciarFuncionarios;
