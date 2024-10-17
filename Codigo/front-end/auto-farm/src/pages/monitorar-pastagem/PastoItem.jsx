import { FaEdit } from "react-icons/fa";

const PastoItem = ({ pasto, onEdit }) => {
  return (
    <div className="flex justify-between w-full px-12 py-5 bg-white rounded-[20px] font-bold text-emerald-800 border border-emerald-800 mb-4">
      <h3 className="text-3xl">{pasto.nome}</h3>

      <div className="flex gap-8">
        <div className="flex items-center gap-4" id="dataInicial">
          <p className=" text-xl">Data inicial</p>
          <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100">
            <p>{new Date(pasto.dataInicial).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="border border-emerald-800 h-full"></div>

        <div className="flex items-center gap-4" id="dataFinal">
          <p className=" text-xl">Data final</p>
          <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100">
            <p>{pasto.dataFinal ? new Date(pasto.dataFinal).toLocaleDateString() : "Em aberto"}</p>
          </div>
        </div>
        <FaEdit size={32} onClick={() => onEdit(pasto)} className="cursor-pointer" />
      </div>

    </div>
  );
};

export default PastoItem;
