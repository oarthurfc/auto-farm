import React, { useState } from 'react';
import AnimalChart from './AnimalChart';
import TabelaFaixaEtaria from './TabelaFaixaEtaria';

function RelatorioPage() {
  const [mostrarComponente, setMostrarComponente] = useState('tabela');

  const alternarComponente = (tipo) => {
    setMostrarComponente(tipo);
  };

  return (
    <div className='bg-emerald-50 min-h-screen max-w'>
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold pb-20 mt-10 text-emerald-900">Relatório do Rebanho</h1>

      <div className="mb-4 space-x-4">
        {/* Botões para alternar entre Tabela e Gráfico */}
        <button
          onClick={() => alternarComponente('tabela')}
          className={`py-2 px-4 rounded ${mostrarComponente === 'tabela' ? 'bg-emerald-800 text-white' : 'bg-gray-200 hover:bg-neutral-300'}`}
        >
          Tabela
        </button>

        <button
          onClick={() => alternarComponente('grafico')}
          className={`py-2 px-4 rounded ${mostrarComponente === 'grafico' ? 'bg-emerald-800 text-white' : 'bg-gray-300 hover:bg-neutral-300'}`}
        >
          Gráfico de Linhas
        </button>
      </div>

      {/* Renderizando os componentes com transição de opacidade */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${mostrarComponente === 'tabela' ? 'opacity-100' : 'opacity-0'}`}
      >
        {mostrarComponente === 'tabela' && <TabelaFaixaEtaria />}
      </div>

      <div
        className={`transition-opacity duration-1000 ease-in-out ${mostrarComponente === 'grafico' ? 'opacity-100' : 'opacity-0'}`}
      >
        {mostrarComponente === 'grafico' && <AnimalChart />}
      </div>
    </div>
    </div>
  );
}

export default RelatorioPage;
