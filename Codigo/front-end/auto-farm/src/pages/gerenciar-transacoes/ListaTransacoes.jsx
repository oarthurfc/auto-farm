import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import BtnClose from "../../components/BtnClose";
import { getAllTransacoes, deletarTransacao } from "../../services/TransacoesService"; 
import imagem1 from '../../assets/imagens/ganho.png'; // ajuste o caminho conforme necessário

const ListaTransacoes = () => {
  const navigate = useNavigate(); 

  const [transacoes, setTransacoes] = useState([
    {
      _id: "1",
      data: "2024-10-01",
      preco: "100,00",
      tipo: "Venda",
    },
    {
      _id: "2",
      data: "2024-10-02",
      preco: "200,00",
      tipo: "Compra",
    },
    {
      _id: "3",
      data: "2024-10-03",
      preco: "150,00",
      tipo: "Venda",
    },
    {
      _id: "4",
      data: "2024-10-04",
      preco: "300,00",
      tipo: "Venda",
    },
]);
  const [transacaoParaExcluir, setTransacaoParaExcluir] = useState(null); // Estado para armazenar a transação a ser excluída
  const [modalVisivel, setModalVisivel] = useState(false); // Estado para controlar a visibilidade do modal

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        // Obtém todas as transações do serviço
        const res = await getAllTransacoes();
        setTransacoes(res.data); // Atualiza o estado com as transações recebidas
      } catch (error) {
        console.error("Erro ao buscar transações:", error); // Exibe erro caso falhe
      }
    };

    fetchTransacoes();
  }, []); // O efeito é executado apenas uma vez ao montar o componente


  const visualizarTransacao = (id) => {
    // Navega para a página de visualização da transação
    navigate(`/transacoes/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pb-10 text-2xl">
      {transacoes.length > 0 ? (
        transacoes.map((t) => (
          <div key={t._id} className="relative mx-2">
            <p className="text-black font-semibold text-base absolute -top-6 left-2 "> 
              {t.data} {/* Data da transação */}
            </p>

            <div className="flex items-center p-2 border border-emerald-800 rounded-xl shadow-lg bg-white mb-4">
              <img src={imagem1} className="w-12 h-12 mr-2 ml-2" alt="Transação" /> {/* Imagem representativa da transação */}
              <div className="text-start flex flex-col ml-2">
                <p className="text-emerald-800 text-xl font-semibold">{t.preco} R$</p> {/* Preço da transação */}
                <p className="text-gray-500 text-lg">{t.tipo}</p> {/* Tipo da transação, ex: "Venda", "Compra" */}
              </div>

              <div className="flex space-x-5 ml-auto text-3xl mr-2">
                <FaEye
                  className="text-emerald-800 cursor-pointer hover:text-emerald-600 transition duration-300"
                  title="Visualizar"
                  onClick={() => visualizarTransacao(t._id)} 
                />
                <FaEdit className="text-emerald-800 cursor-pointer " title="Editar" onClick={() => navigate(`/editar-transacao/${t._id}`)} />
                <FaTrashAlt className="text-emerald-800 cursor-pointer " title="Excluir" onClick={() => { setTransacaoParaExcluir(t); setModalVisivel(true); }} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhuma transação encontrada.</p>
      )}
    </div>
  );
};

export default ListaTransacoes;

