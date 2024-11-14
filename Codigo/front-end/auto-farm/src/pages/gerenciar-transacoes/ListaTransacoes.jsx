import { useState } from "react";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { deletarTransacao } from "../../services/TransacoesService";
import { deleteDespesa } from "../../services/DespesaService";
import BtnClose from "../../components/BtnClose";

const ListaFinanceira = ({ listaFinanceira, setListaFinanceira }) => {
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const formatarData = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const transacoesAgrupadas = listaFinanceira.reduce((acc, item) => {
    const dataFormatada = formatarData(item.data);
    if (!acc[dataFormatada]) {
      acc[dataFormatada] = [];
    }
    acc[dataFormatada].push(item);
    return acc;
  }, {});

  const abrirModalExcluir = (item) => {
    setItemParaExcluir(item);
    setModalVisivel(true);
  };

  const fecharModalExcluir = () => {
    setItemParaExcluir(null);
    setModalVisivel(false);
  };

  const deletarItem = () => {
    if (itemParaExcluir.tipoDesepesa) {
      deleteDespesa(itemParaExcluir._id)
        .then(() => {
          setListaFinanceira((prevList) =>
            prevList.filter((item) => item._id !== itemParaExcluir._id)
          );
          fecharModalExcluir();
        })
        .catch((error) => {
          console.error("Erro ao deletar despesa:", error);
        });
    } else if (itemParaExcluir.tipoTransacao) {
      deletarTransacao(itemParaExcluir._id)
        .then(() => {
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
    <div className="grid grid-cols-1 gap-6 mt-16 pb-10 px-4">
      {Object.keys(transacoesAgrupadas).length > 0 ? (
        Object.keys(transacoesAgrupadas).map((data) => (
          <div key={data} className="border-b border-neutral-900 pb-24 mb-0">
            <h2 className="text-lg font-semibold text-center mb-4">{data}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {transacoesAgrupadas[data].map((item) => (
                <div
                  key={item._id}
                  className="relative p-6 border rounded-lg shadow-md bg-white border-black border-opacity-50 flex flex-col items-start"
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-3 text-2xl">{item.icone}</div>
                    <p className="text-emerald-600 font-medium text-sm">
                      {new Date(item.data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-wrap space-x-4 justify-start">
                    <div className="relative grid grid-cols-1 mr-5">
                      <p className="text-emerald-700 font-bold text-xl">
                        {item.valorTotal || item.preco || item.valor} R$
                      </p>
                      <p className="text-gray-600 capitalize mb-3">
                        <strong>{item.tipo}</strong>
                      </p>
                    </div>

                    <div className="relative grid grid-cols-1  text-start ">
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
                    </div>

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

                  <div className="absolute top-6 right-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700 text-xl mr-1">
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 text-xl"
                      onClick={() => abrirModalExcluir(item)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhuma transação ou despesa encontrada.</p>
      )}

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
