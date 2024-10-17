import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ListaFuncionarios from "./ListaFuncionarios";
import ModalAddFuncionario from "./ModalAddFuncionario";
import { getAll } from "../../services/FuncionarioService";

const GerenciarFuncionarios = () => {
  const [adicionarFuncionario, setAdicionarFuncionario] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    document.title = "Gerenciar Funcionários - AutoFarm";

    getAll().then((res) => {
      setFuncionarios(res.data);
    });
  }, []);

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">
      <h1 className="text-2xl sm:text-3xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Funcionários
      </h1>

      {/* Container dos botões */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4">
        {/* Botão Adicionar Funcionário */}
        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-10 sm:px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarFuncionario(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Funcionário
        </button>
      </div>

      {/* Lista de Funcionários */}
      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaFuncionarios funcionarios={funcionarios} setFuncionarios={setFuncionarios} />
      </div>

      {adicionarFuncionario && <ModalAddFuncionario closeModal={() => setAdicionarFuncionario(false)} />}
    </div>
  );
};

export default GerenciarFuncionarios;
