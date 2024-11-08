import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getById } from "../../services/TransacoesService"; // Função para buscar a transação pelo ID

const TransacaoDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transacao, setTransacao] = useState(null);

  useEffect(() => {
    document.title = "Detalhes da Transação - AutoFarm";
  }, []);

  useEffect(() => {
    getTransacaoById(id)
      .then((res) => {
        setTransacao(res.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da transação:", error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!transacao) {
    return (
      <div className="max-w-7xl mx-auto p-10 flex items-center justify-between relative">
        <FaArrowLeft
          className="text-emerald-800 text-3xl hover:scale-105 hover:cursor-pointer"
          onClick={() => navigate(`/lista-transacoes`)}
        />
        <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 flex-grow">
          Carregando transação...
        </h1>
        <div className="w-6"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-emerald-50">
      <div className="pb-12">
        <div className="max-w-7xl mx-auto p-10 flex items-center justify-between relative">
          <FaArrowLeft
            className="text-emerald-800 text-3xl hover:scale-105 hover:cursor-pointer"
            onClick={() => navigate(`/lista-transacoes`)}
          />
          <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 flex-grow">
            Detalhes da Transação
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-7xl mx-auto pb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-2xl">
              <h2 className="text-emerald-800 font-bold mb-4">Transação</h2>
              <p className="text-gray-700 mb-5">
                <strong>Tipo de Transação:</strong> {transacao.tipoTransacao}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Data:</strong> {formatDate(transacao.data)}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Valor Total:</strong> {transacao.valorTotal} R$
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Valor por Arroba:</strong> {transacao.valorArroba} R$
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Peso Total:</strong> {transacao.pesoTotal} kg
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Nome do Comprador:</strong> {transacao.nomeComprador}
              </p>
            </div>

            <div className="text-xl">
              <h3 className="text-emerald-800 font-bold mb-4">Animais</h3>
              <ul className="list-disc ml-5 space-y-2">
                {transacao.animais.length > 0 ? (
                  transacao.animais.map((animal) => (
                    <li key={animal._id} className="text-gray-700">
                      <strong>ID:</strong> {animal._id}, <strong>Nome:</strong>{" "}
                      {animal.nome}, <strong>Peso:</strong> {animal.peso} kg
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum animal selecionado.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransacaoDetalhes;
