import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ListaTransacoes from "./ListaTransacoes";

const GerenciarTransacoes = () => {
  const [adicionarTransacao, setAdicionarTransacao] = useState(false);
  
  // Altera o título da página
  useEffect(() => {
    document.title = "Gerenciar Transações - AutoFarm";
  }, []);

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">

      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Transações
      </h1>

      {/* Container dos botões e barra de pesquisa */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4">

        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarTransacao(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Transação
        </button>

        {/* Barra de pesquisa */}
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border-2 border-emerald-800 rounded-lg py-3 px-10 w-full sm:w-auto mr-1"
          />
          {/* Ícone de filtro */}
          <button className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.61 5.61a1 1 0 00-.293.707V16a1 1 0 01-.553.894l-4 2A1 1 0 019 18.618V13.24a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaTransacoes />
      </div>

      <div className="w-full sm:w-7/12 mx-auto text-center">
        
      </div>
      

    </div>
  );
};

export default GerenciarTransacoes;