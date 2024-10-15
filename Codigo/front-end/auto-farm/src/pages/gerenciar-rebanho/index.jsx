import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ListaAnimais from "./ListaAnimais";
import ModalAddAnimal from "./ModalAddAnimal";
import ModalSellAnimal from "./ModalSellAnimal";
import { getAll } from '../../services/AnimalService';

const GerenciarRebanho = () => {
  const [adicionarAnimal, setAdicionarAnimal] = useState(false);
  const [venderAnimal, setVenderAnimal] = useState(false);
  const [animais, setAnimais] = useState([]);

  const [totalAnimais, setTotalAnimais] = useState(0);
  const [femeas, setFemeas] = useState(0);
  const [machos, setMachos] = useState(0);

  useEffect(() => {
    document.title = "Gerenciar Rebanho - AutoFarm";

    getAll().then((res) => {
      setAnimais(res.data);
      const contagemFemeas = res.data.filter((animal) => animal.sexo === "femea").length;
      const contagemMachos = res.data.filter((animal) => animal.sexo === "macho").length;

      setTotalAnimais(res.data.length);
      setFemeas(contagemFemeas);
      setMachos(contagemMachos);
    });
  }, []);

  return (
    <div className="pt-10 bg-emerald-50 min-h-screen max-w">
      <h1 className="text-4xl sm:text-5xl text-center font-semibold text-emerald-800 mb-5">
        Gerenciar Rebanho
      </h1>

      {/* Container dos botões e barra de pesquisa */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-5 mt-10 gap-5 px-4">
        {/* Botão Vender Animal */}
        <button
          className="bg-emerald-500 hover:bg-green-600 text-white font-bold py-3 px-14 rounded w-full sm:w-auto"
          onClick={() => setVenderAnimal(true)}
        >
          Vender Animal
        </button>

        <button
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => setAdicionarAnimal(true)}
        >
          <FaPlus className="mr-2" />
          Adicionar Animal
        </button>

        {/* Barra de pesquisa */}
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border-2 border-emerald-800 rounded-lg py-3 px-10 w-full sm:w-auto mr-1"
          />
          <button className="text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.61 5.61a1 1 0 00-.293.707V16a1 1 0 01-.553.894l-4 2A1 1 0 019 18.618V13.24a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Contagem de Animais minimalista e na mesma linha */}
      <div className="w-full sm:w-7/12 mx-auto text-center mb-2">
        <p className="text-sm text-emerald-800 flex justify-center gap-5 font-bold">
          <span><span className="text-black">Total de Animais:</span> {totalAnimais}</span>
          <span><span className="text-black">Fêmeas:</span> {femeas}</span>
          <span><span className="text-black">Machos:</span> {machos}</span>
        </p>
      </div>

      <div className="w-full sm:w-7/12 mx-auto text-center">
        <ListaAnimais />
      </div>

      {adicionarAnimal && <ModalAddAnimal closeModal={setAdicionarAnimal} />}
      {venderAnimal && <ModalSellAnimal closeModal={() => setVenderAnimal(false)} />}
    </div>
  );
};

export default GerenciarRebanho;
