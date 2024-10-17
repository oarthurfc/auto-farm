import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PastoItem from "./PastoItem"; 
import ModalAddEditPasto from "./ModalAddEditPasto"; 
import { getAll } from "../../services/PastoService"; 

const MonitorarPastagemPage = () => {
  const [pastos, setPastos] = useState([]);
  const [registrarUso, setRegistrarUso] = useState(false);
  const [pastoToEdit, setPastoToEdit] = useState(null);

  // Busca os pastos do backend e ordena do mais recente para o mais antigo
  useEffect(() => {
    getAll().then((response) => {
      const sortedPastos = response.data.sort(
        (a, b) => new Date(b.dataInicial) - new Date(a.dataInicial)
      );
      setPastos(sortedPastos);
    });
  }, []);

  // Altera o título da página
  useEffect(() => {
    document.title = "Monitorar pastagem - AutoFarm";
  }, []);

  const handleEdit = (pasto) => {
    setPastoToEdit(pasto);
    setRegistrarUso(true); // Abre o modal em modo de edição
  };

  return (
    <div className="py-10 bg-emerald-50 min-h-screen max-w">

      {/* Header */}
      <div className="flex items-center justify-between pb-8 mx-auto max-w-7xl font-semibold">
        <h1 className="text-4xl sm:text-5xl text-center text-emerald-800 mb-5">
          Monitorar pastagem
        </h1>
        <button
          className="bg-emerald-800 text-white py-3 px-14 flex items-center rounded w-full sm:w-auto"
          onClick={() => {
            setPastoToEdit(null); // Limpa o pasto em edição
            setRegistrarUso(true);
          }}
        >
          <FaPlus className="mr-2" />
          Registrar uso
        </button>
      </div>

      {/* Lista de pastos */}
      <div className="flex flex-col mx-auto max-w-7xl">
        {pastos.map((pasto) => (
          <PastoItem key={pasto._id} pasto={pasto} onEdit={handleEdit} />
        ))}
      </div>

      {registrarUso && (
        <ModalAddEditPasto
          closeModal={() => setRegistrarUso(false)}
          pastoToEdit={pastoToEdit} // Passa o pasto a ser editado, ou null para adicionar
        />
      )}
    </div>
  );
};

export default MonitorarPastagemPage;
