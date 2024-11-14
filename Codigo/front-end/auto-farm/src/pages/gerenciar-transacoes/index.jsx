import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import BtnClose from "../../components/BtnClose";
import { getAllTransacoes, deletarTransacao } from "../../services/TransacoesService";
import { getAllDespesas, deleteDespesa } from "../../services/DespesaService";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import ListaTransacoes from "./ListaTransacoes";

const GerenciarTransacoes = () => {
  const [adicionarTransacao, setAdicionarTransacao] = useState(false);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("todos"); // "todos", "ganho", "gasto"
  const [dataFiltro, setDataFiltro] = useState("");  // Começa com string vazia

  const [listaFinanceiraOriginal, setListaFinanceiraOriginal] = useState([]);
const [listaFinanceira, setListaFinanceira] = useState([]);

// Na parte do useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      const [despesasResponse, transacoesResponse] = await Promise.all([
        getAllDespesas(),
        getAllTransacoes(),
      ]);

      const despesas = despesasResponse.data.map((despesa) => ({
        ...despesa,
        tipo: despesa.tipoDesepesa || "despesa",
        preco: despesa.preco - (despesa.preco * 2),
        icone: <FaMoneyBillWave className="text-red-500" />,
      }));

      const transacoes = transacoesResponse.data.map((transacao) => ({
        ...transacao,
        tipo: transacao.tipoTransacao || "transacao",
        icone: <FaShoppingCart className="text-green-500" />,
      }));

      const listaCombinada = [...despesas, ...transacoes];
      listaCombinada.sort((a, b) => new Date(b.data) - new Date(a.data));

      setListaFinanceiraOriginal(listaCombinada); // Armazena os dados originais
      setListaFinanceira(listaCombinada); // Exibe a lista original no início
    } catch (error) {
      console.error("Erro ao buscar dados financeiros:", error);
    }
  };

  fetchData();
}, []);

const aplicarFiltro = () => {
  let listaFiltrada = [...listaFinanceiraOriginal]; // Filtra sobre a lista original

  // Filtrar por categoria (Ganho ou Gasto)
  if (filtroCategoria !== "todos") {
    const isGasto = filtroCategoria === "gasto";
    listaFiltrada = listaFiltrada.filter((item) => 
      (isGasto && item.preco < 0) || (!isGasto && item.preco > 0)
    );
  }

  // Filtrar por data
  if (dataFiltro) {
    listaFiltrada = listaFiltrada.filter((item) => new Date(item.data) >= new Date(dataFiltro));
  }

  setListaFinanceira(listaFiltrada); // Atualiza a lista filtrada
  toggleModal(); // Fechar o modal após aplicar o filtro
};


  const toggleModal = () => setModalVisivel(!modalVisivel);

  // Função para aplicar o filtro
  

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Transações
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4">
        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarTransacao(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Transação
        </button>

        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border-2 border-emerald-800 rounded-lg py-3 px-10 w-full sm:w-auto mr-1"
          />
          <button
            className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200"
            onClick={toggleModal}
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

      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaTransacoes listaFinanceira={listaFinanceira} setListaFinanceira={setListaFinanceira} />
      </div>

      {modalVisivel && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 relative">
      
        <BtnClose fecharModal={toggleModal} />
      
      <h2 className="text-xl font-semibold mb-4">Filtrar Transações</h2>

      {/* Filtros em linha */}
      <div className="flex gap-5 mb-4">
        {/* Filtro de Categoria */}
        <div className="flex-1 mr-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            className="border-2 border-emerald-800 rounded-lg py-3 px-4 w-full"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="gasto">Gasto</option>
            <option value="ganho">Ganho</option>
          </select>
        </div>

        {/* Filtro de Data */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
          <input
            type="date"
            className="border-2 border-emerald-800 rounded-lg py-3 px-4 w-full"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-between">
        <button
          onClick={toggleModal}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Fechar
        </button>
        <button
          onClick={aplicarFiltro}
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
