import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ListaAnimais from "./ListaAnimais";


const GerenciarRebanho = () => {

    

  return (
    <div className='pt-10 bg-emerald-50 h-screen'>
        
        
      <h1 className='text-5xl text-center font-semibold text-emerald-800 mb-5'>Gerenciar Rebanho</h1>

      {/* Container dos botões e barra de pesquisa */}
      <div className='flex items-center justify-center mb-5 mt-10 gap-5'>
        {/* Botão Vender Animal */}
        <button className='bg-emerald-500 hover:bg-green-600 text-white font-bold py-3 px-14 rounded'>
          Vender Animal
        </button>
        
        <button className='bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-20 rounded flex items-center'>
            <FaPlus className="mr-2 border-2 rounded-full "/> 
            Adicionar Animal
        </button>
        {/* Barra de pesquisa */}
        <div className='flex'>
          <input
            type='text'
            placeholder='Pesquisar'
            className='border-2 border-emerald-800 rounded-lg py-3 px-10 w-full mr-2'
          />
          {/* Ícone de filtro */}
          <button className=' text-emerald-800 hover:text-white hover:bg-emerald-800 px-2 rounded transition duration-200'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.61 5.61a1 1 0 00-.293.707V16a1 1 0 01-.553.894l-4 2A1 1 0 019 18.618V13.24a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-7/12 mx-auto text-center">
        <ListaAnimais />
      </div>
        
      
    </div>
  )
}

export default GerenciarRebanho
