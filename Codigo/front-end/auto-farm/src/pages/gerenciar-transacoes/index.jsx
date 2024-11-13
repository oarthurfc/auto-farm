import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import BtnClose from "../../components/BtnClose";

import ListaTransacoes from "./ListaTransacoes";

const GerenciarTransacoes = () => {
  const [adicionarTransacao, setAdicionarTransacao] = useState(false);
  const [listaFinanceira, setListaFinanceira] = useState([]);

  const [modalVisivel, setModalVisivel] = useState(false); // Estado para controlar a visibilidade do modal
  const [tipoFiltro, setTipoFiltro] = useState("ambos"); // Estado para o tipo de filtro (Despesa, Transação ou Ambos)
  const [tipoDespesa, setTipoDespesa] = useState("gado"); // Estado para o tipo de despesa
  const [tipoTransacao, setTipoTransacao] = useState("gado"); // Estado para o tipo de transação
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faz chamadas para despesas e transações em paralelo
        const [despesasResponse, transacoesResponse] = await Promise.all([
          getAllDespesas(),
          getAllTransacoes(),
        ]);

        // Formata as despesas e transações com o campo `tipo`
        const despesas = despesasResponse.data.map((despesa) => ({
          ...despesa,
          tipo: despesa.tipoDespesa || "despesa",
          icone: <FaMoneyBillWave className="text-red-500" />,
        }));

        const transacoes = transacoesResponse.data.map((transacao) => ({
          ...transacao,
          tipo: transacao.tipoTransacao || "transacao",
          icone: <FaShoppingCart className="text-green-500" />,
        }));

        // Combina despesas e transações em uma lista
        const listaCombinada = [...despesas, ...transacoes];

        // Ordena a lista combinada pela data
        listaCombinada.sort((a, b) => new Date(b.data) - new Date(a.data));

        // Atualiza o estado com a lista combinada e ordenada
        setListaFinanceira(listaCombinada);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    fetchData();
  }, []);
  // Altera o título da página
  useEffect(() => {
    document.title = "Gerenciar Transações - AutoFarm";
  }, []);

  // Função para abrir e fechar o modal
  const toggleModal = () => setModalVisivel(!modalVisivel);

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
          <button
            className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200"
            onClick={toggleModal} // Chama a função para abrir o modal
          >
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
      
      {/* Lista de Transações */}
      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaTransacoes listaFinanceira = {listaFinanceira} setListaFinanceira={setListaFinanceira}/>
      </div>

      {/* Modal de Filtros */}
      {modalVisivel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 sm:w-1/3 relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
            >
              <BtnClose fecharModal={toggleModal}/>
            </button>
            <h2 className="text-xl font-semibold mb-4">Filtrar Transações</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="border-2 border-emerald-800 rounded-lg w-full py-2 px-3"
              >
                <option value="ambos">Ambos</option>
                <option value="despesa">Despesa</option>
                <option value="transacao">Transação</option>
              </select>
            </div>

            {tipoFiltro !== "transacao" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Despesa</label>
                <select
                  value={tipoDespesa}
                  onChange={(e) => setTipoDespesa(e.target.value)}
                  className="border-2 border-emerald-800 rounded-lg w-full py-2 px-3"
                >
                  <option value="gado">Gado</option>
                  <option value="equipamento">Equipamento</option>
                  <option value="racao">Ração</option>
                  <option value="pasto">Pasto</option>
                </select>
              </div>
            )}

            {tipoFiltro !== "despesa" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Transação</label>
                <select
                  value={tipoTransacao}
                  onChange={(e) => setTipoTransacao(e.target.value)}
                  className="border-2 border-emerald-800 rounded-lg w-full py-2 px-3"
                >
                  <option value="gado">Gado</option>
                  <option value="equipamento">Equipamento</option>
                  <option value="racao">Ração</option>
                </select>
              </div>
            )}

            {/* Botões para aplicar ou fechar o filtro */}
            <div className="flex justify-between">
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Fechar
              </button>
              <button
                className="bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-900"
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarTransacoes;
