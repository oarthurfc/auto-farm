import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/AnimalService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AnimalDetalhes = () => {
    const navigate = useNavigate(); 
 
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMeses = hoje.getMonth() - nascimento.getMonth();

    // Verifica se o mês de hoje é anterior ao mês de nascimento ou se é o mesmo mês e o dia de hoje é anterior ao dia de nascimento
    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const visualizarAnimal = () => {
    navigate(`/animal/${id}`);
  };
  useEffect(() => {
    getById(id)
      .then((res) => {
        setAnimal(res.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do animal:", error);
      });
  }, [id]);

  if (!animal) {
    return <p>Carregando detalhes do animal...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-emerald-50">
      <div className="p-0 pt-0 border-b border-black">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 py-5 pb-4 border-b border-black ">
          
            <FaArrowLeft className="hover:scale-105 hover:cursor-pointer ml-10 "
                onClick={() => navigate(`/rebanho`)}
            /> Dados do Animal
          
            
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 w-full pb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="text-2xl ">
              <h2 className="text-emerald-800 font-bold mb-2 ">{animal.sexo == "macho" ? 'Boi': 'Vaca' }</h2>
              <h2 className="text-emerald-800 mb-10 ">
                <strong>id: </strong> {animal._id}
              </h2>
              <p className="text-gray-700 mb-5">
                <strong>Nome:</strong> {animal.nome}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Raça:</strong> {animal.raca}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Sexo:</strong> {animal.sexo}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Data de nascimento:</strong> {formatDate(animal.nascimento)}
              </p>
              <p className="text-gray-700 mb-5">
                <strong>Idade:</strong> {calcularIdade(animal.nascimento)} anos
              </p>
              <p className="text-gray-700 mb-5">
                
                <strong>Peso:</strong> {animal.peso ? `${animal.peso} Kg` : 'Não medido'}
              </p>
            </div>

            <div className="text-xl">
              <p className="text-gray-700">
                <strong>Problema de saúde:</strong> {animal.problemaSaude ? "Sim" : "Não"}
              </p>
              <p className="text-gray-700 mt-7">
                <strong>Histórico de Saúde:</strong>
              </p>
              <textarea
                className="w-full h-32 p-2 mt-2 border-2 border-gray-300 rounded-lg"
                value={animal.historicoSaude}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetalhes;
