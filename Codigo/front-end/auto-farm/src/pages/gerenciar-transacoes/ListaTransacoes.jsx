import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa"; 
import BtnClose from "../../components/BtnClose";
import { getAllTransacoes } from "../../services/TransacoesService"; 
import imagem1 from '../../assets/imagens/ganho.png';

const ListaTransacoes = () => {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const res = await getAllTransacoes();
        setTransacoes(res.data); // Define as transações no estado
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };
    fetchTransacoes();
  }, []);

  const visualizarTransacao = (id) => navigate(`/transacoes/${id}`);
  const editarTransacao = (id) => navigate(`/editar-transacao/${id}`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pb-10 text-2xl">
      {transacoes.length > 0 ? (
        transacoes.map((t) => (
          <div key={t._id} className="relative mx-2">
            <p className="text-black font-semibold text-base absolute -top-6 left-2">
              {t.data}
            </p>
            <div className="flex items-center p-2 border border-emerald-800 rounded-xl shadow-lg bg-white mb-4">
              <img src={imagem1} className="w-12 h-12 mr-2 ml-2" alt="Transação" />
              <div className="text-start flex flex-col ml-2">
                <p className="text-emerald-800 text-xl font-semibold">{t.preco} R$</p>
                <p className="text-gray-500 text-lg">{t.tipo}</p>
              </div>
              <div className="flex space-x-5 ml-auto text-3xl mr-2">
                <FaEye className="text-emerald-800 cursor-pointer hover:text-emerald-600" onClick={() => visualizarTransacao(t._id)} />
                <FaEdit className="text-emerald-800 cursor-pointer" onClick={() => editarTransacao(t._id)} />
                <FaTrashAlt className="text-emerald-800 cursor-pointer" onClick={() => setTransacaoParaExcluir(t)} />
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
