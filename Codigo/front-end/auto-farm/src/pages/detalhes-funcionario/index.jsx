import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/FuncionarioService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Importando as imagens da pasta assets
import fotoVeterinario from "../../assets/foto_veterinario.png";
import fotoContador from "../../assets/foto_contador.png";
import fotoFazendeiro from "../../assets/foto_fazendeiro.png";

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

  // Função para determinar qual imagem usar com base no cargo
  const getImagemFuncionario = (cargo) => {
    switch (cargo) {
      case "Veterinário":
        return fotoVeterinario;
      case "Contador":
        return fotoContador;
      case "Fazendeiro":
      case "Outro":
        return fotoFazendeiro;
      default:
        return fotoFazendeiro; // Caso padrão
    }
  };

  if (!funcionario) {
    return (
      <div className="max-w-7xl mx-auto p-10 flex items-center justify-between relative">
        <FaArrowLeft
          className="text-emerald-800 text-2xl hover:scale-105 hover:cursor-pointer"
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
          <h1 className="text-2xl sm:text-3xl text-center font-semibold text-emerald-800 flex-grow">
            Dados do Funcionário
          </h1>
          <div className="w-6"></div> {/* Espaço vazio para manter o título centralizado */}
        </div>

        <div className="bg-gray-200 rounded-lg shadow-md p-12 w-full max-w-5xl mx-auto flex items-center">
          {/* Exibe a imagem do funcionário de acordo com o cargo */}
          <div className="w-64 h-64 rounded-lg flex items-center justify-center border border-black">
            <img
              src={getImagemFuncionario(funcionario.cargo)}
              alt={funcionario.cargo}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Detalhes do funcionário */}
          <div className="ml-16">
            <p className="text-2xl font-bold text-gray-900 mb-4">{funcionario.nome}</p>
            <p className="text-xl text-gray-700 mb-4">{funcionario.cargo}</p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold">Email:</span> {funcionario.email}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold">Telefone:</span> {funcionario.senha}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold">Horas Semanais:</span> {funcionario.horas} horas
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold">Salário:</span> R$ {funcionario.salario.toFixed(2)} mensais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioDetalhes;
