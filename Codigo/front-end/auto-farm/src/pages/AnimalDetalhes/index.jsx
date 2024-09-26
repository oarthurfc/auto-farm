import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/AnimalService";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ModalAddHistorico from "./ModalAddHistorico";
import { getAll } from "../../services/HistoricoService";

const AnimalDetalhes = () => {

  
    const navigate = useNavigate(); 
  const [modalAdd, setModalAdd] = useState(false)
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [historicos, setHistoricos] = useState([])
  const [peso, setPeso] = useState()
  
  useEffect(() => {
    
    console.log(peso); 
  }, [peso]);

  const closeModal = () =>{
    
    setModalAdd(false)
  }

  useEffect(() => {
    getAll()
      .then((res) => {
        const historicosFiltrados = res.data.filter(historico => 
          historico.animalId && historico.animalId._id === id
        );

        setHistoricos(historicosFiltrados);

        if (historicosFiltrados.length > 0) {
          const ultimaConsulta = historicosFiltrados.reduce((maisRecente, atual) => 
            new Date(atual.data) > new Date(maisRecente.data) ? atual : maisRecente
          );

          setPeso(ultimaConsulta.peso); 
          console.log(ultimaConsulta)
          
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar históricos:", error);
      });
  }, [id, closeModal]);

  

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
    return <div className="text-center justify-center">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 py-5 pb-4 border-b border-black">
        <FaArrowLeft className="hover:scale-105 hover:cursor-pointer ml-10 "
                onClick={() => navigate(`/rebanho`)}
            />
        Carregando detalhes do animal...
        </h1>
      </div>;
  }

  return (
    <div className="w-full min-h-screen bg-emerald-50 ">
      <div className="p-0 pt-0 border-b border-black">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 py-5 pb-4 border-b border-black ">
          
            <FaArrowLeft className="hover:scale-105 hover:cursor-pointer ml-10 "
                onClick={() => navigate(`/gerenciar-rebanho`)}
            /> Dados do Animal
          
            
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 w-full pb-36  justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl justify-center">
            
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
                
                <strong>Peso:</strong> {peso ? `${peso} Kg` : 'Não medido'}
              </p>
            </div>

            <div className="text-xl">
              <p className="text-gray-700">
                <strong>Problema de saúde:</strong> {animal.problemaSaude ? "Sim" : "Não"}
              </p>
              <p className="text-gray-700 mt-7 mb-2">
                <strong>Histórico de Saúde:</strong>
              </p>
              <div className="space-y-4 mb-5">
            {historicos.map((historico) => (
                <div key={historico._id} className="p-4 border border-gray-300 rounded-lg">
                    <h3><strong>Tratamento:</strong> {historico.tratamento}</h3>
                    <p><strong>Data:</strong> {new Date(historico.data).toLocaleDateString()}</p>
                    <p><strong>Peso:</strong> {peso} kg</p>
                    <p><strong>Local:</strong> {historico.local}</p>
                    <p><strong>Tamanho:</strong> {historico.tamanho} cm</p>
                    <p><strong>Id:</strong> {historico.animalId?._id}</p>
                </div>
            ))}
            {historicos.length <= 0 && (
              'Nenhum Hitórico'
            )}
        </div>
              <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setModalAdd(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Historico
        </button>
            </div>
            
          </div>

          
        </div>
      </div>
      {modalAdd &&(
        <ModalAddHistorico closeModal = {closeModal} animalId={id} />
      )}
    </div>
  );
};

export default AnimalDetalhes;
