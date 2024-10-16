import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/FuncionarioService";
import { FaArrowLeft, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FuncionarioDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [funcionario, setFuncionario] = useState(null);

  // Altera o título da página
  useEffect(() => {
    document.title = "Detalhes do Funcionário - AutoFarm";
  }, []);

  useEffect(() => {
    getById(id)
      .then((res) => {
        setFuncionario(res.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do funcionário:", error);
      });
  }, [id]);

  if (!funcionario) {
    return (
      <div className="max-w-7xl mx-auto p-10 flex items-center justify-between relative">
        <FaArrowLeft
          className="text-emerald-800 text-3xl hover:scale-105 hover:cursor-pointer"
          onClick={() => navigate("/funcionarios")}
        />
        <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 flex-grow">
          Carregando funcionário...
        </h1>
        <div className="w-6"></div> {/* Espaço vazio para manter o título centralizado */}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-emerald-50">
      <div className="pb-12">
        <div className="max-w-7xl mx-auto p-10 flex items-center justify-between relative">
          <FaArrowLeft
            className="text-emerald-800 text-3xl hover:scale-105 hover:cursor-pointer"
            onClick={() => navigate("/funcionarios")}
          />
          <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 flex-grow">
            Dados do Funcionário
          </h1>
          <div className="w-6"></div> {/* Espaço vazio para manter o título centralizado */}
        </div>

        <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-4xl mx-auto flex items-center">
          {/* Ícone do funcionário */}
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-black">
            <FaUserTie className="text-gray-600" size={120} />
          </div>

          {/* Detalhes do funcionário */}
          <div className="ml-10">
            <p className="text-2xl font-bold text-gray-900 mb-2">{funcionario.nome}</p>
            <p className="text-lg text-gray-700 mb-2">{funcionario.cargo}</p>
            <p className="text-lg text-gray-700 mb-2">Email: {funcionario.email}</p>
            <p className="text-lg text-gray-700 mb-2">
              Horas trabalhadas: {funcionario.horas} horas
            </p>
            <p className="text-lg text-gray-700 mb-2">
              Salário: R$ {funcionario.salario.toFixed(2)} mensais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioDetalhes;
