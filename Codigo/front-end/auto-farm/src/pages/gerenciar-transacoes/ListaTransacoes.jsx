import { useEffect, useState } from "react";
import { FaEye, FaTrashAlt, FaEdit, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { getAllTransacoes, deletarTransacao } from "../../services/TransacoesService";
import { getAllDespesas, deleteDespesa } from "../../services/DespesaService";
import BtnClose from "../../components/BtnClose";

const ListaFinanceira = () => {
  const [listaFinanceira, setListaFinanceira] = useState([]);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

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

  const abrirModalExcluir = (item) => {
    setItemParaExcluir(item);
    console.log(item)
    setModalVisivel(true);
  };

  const fecharModalExcluir = () => {
    setItemParaExcluir(null);
    setModalVisivel(false);
  };

  const deletarItem = () => {
    if (itemParaExcluir.tipoDesepesa) {
      // Chama o serviço de deletar despesa
      deleteDespesa(itemParaExcluir._id)
        .then(() => {
          // Atualiza a lista de despesas
          setListaFinanceira((prevList) =>
            prevList.filter((item) => item._id !== itemParaExcluir._id)
          );
          fecharModalExcluir();
        })
        .catch((error) => {
          console.error("Erro ao deletar despesa:", error);
        });
    } else if (itemParaExcluir.tipoTransacao) {
      // Chama o serviço de deletar transação
      deletarTransacao(itemParaExcluir._id)
        .then(() => {
          // Atualiza a lista de transações
          setListaFinanceira((prevList) =>
            prevList.filter((item) => item._id !== itemParaExcluir._id)
          );
          fecharModalExcluir();
        })
        .catch((error) => {
          console.error("Erro ao deletar transação:", error);
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pb-10 px-4">
      {listaFinanceira.length > 0 ? (
        listaFinanceira.map((item) => (
          <div
            key={item._id}
            className="relative p-6 border rounded-lg shadow-md bg-white border-black border-opacity-50"
          >
            {/* Ícone e Data */}
            <div className="flex items-center mb-2">
              <div className="mr-3 text-2xl">{item.icone}</div>
              <p className="text-emerald-600 font-medium text-sm">
                {new Date(item.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Informações */}
            <div>
              <p className="text-emerald-700 font-bold text-xl">
                {item.valorTotal || item.preco || item.valor} R$
              </p>
              <p className="text-gray-600 capitalize mb-3">
                <strong>{item.tipo}</strong>
              </p>
              {item.nomeComprador && (
                <p className="text-gray-600">
                  <strong>Comprador: </strong>
                  {item.nomeComprador}
                </p>
              )}
              {item.pesoTotal && (
                <p className="text-gray-600">
                  <strong>Peso Total: </strong>
                  {item.pesoTotal} kg
                </p>
              )}
              {item.valorArroba && (
                <p className="text-gray-600">
                  <strong>Valor Arroba: </strong>
                  {item.valorArroba} R$
                </p>
              )}
              {item.nome && (
                <p className="text-gray-600">
                  <strong>Nome: </strong>
                  {item.nome}
                </p>
              )}
              {item.quantidade && (
                <p className="text-gray-600">
                  <strong>Quantidade: </strong> {item.quantidade}
                </p>
              )}
              {item.pagamento && (
                <p className="text-gray-600">
                  <strong>Pagamento: </strong> {item.pagamento}
                </p>
              )}
            </div>

            {/* Ícones de Editar e Excluir */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button className="text-blue-500 hover:text-blue-700 text-xl mr-1">
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700 text-xl"
                onClick={() => abrirModalExcluir(item)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhuma transação ou despesa encontrada.</p>
      )}

      {/* Modal de Exclusão */}
      {modalVisivel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center relative">
            <BtnClose fecharModal={fecharModalExcluir} />
            <h2 className="text-xl font-semibold mb-0 mt-3">
              Deseja excluir este item?
            </h2>
            <p className="text-gray-700 mb-8 text-base">
              Você está prestes a deletar o item de ID: <br />{" "}
              {itemParaExcluir?._id}.
            </p>
            <div className="flex justify-center space-x-10">
              <button
                onClick={deletarItem}
                className="bg-red-500 border-2 border-red-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition duration-300"
              >
                Sim
              </button>
              <button
                onClick={fecharModalExcluir}
                className="bg-emerald-800 border-2 border-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-800 transition duration-300"
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

export default ListaFinanceira;
