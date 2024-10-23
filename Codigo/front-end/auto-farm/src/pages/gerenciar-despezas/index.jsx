import React, { useState } from 'react';
import GerenciarDespesa from './GerenciarDespezas'; // O componente que você já criou
import SideBar from './SideBar'; // O componente de SideBar que criamos
import GraficoDespesas from './graficoDespesas';

const PaginaPrincipal = () => {
    const [filtroMes, setFiltroMes] = useState(new Date().getMonth() + 1); // Mês atual
    const [filtroAno, setFiltroAno] = useState(new Date().getFullYear()); // Ano atual
    return (    
        <div className='min-h-screen bg-emerald-50 pb-10'>
            <div className="flex flex-col md:flex-row mx-auto max-w-7xl pt-5 space-y-5 md:space-y-0 md:space-x-5">
                {/* Container principal usando flex-grow para ocupar a maior parte da tela */}
                <div className="flex flex-col w-full md:w-2/3 space-y-5">
                    {/* Componentes empilhados verticalmente */}
                    <GerenciarDespesa filtroMes={filtroMes} setFiltroMes={setFiltroMes} filtroAno={filtroAno} setFiltroAno={setFiltroAno} />
                    <div className='scale-100 bg-white p-9 shadow-lg border border-gray-300 rounded-lg flex-grow'>
                        <GraficoDespesas filtroAno={filtroAno} />
                    </div>
                </div>
                {/* Sidebar ao lado direito ocupando 1/3 da largura */}
                <div className="w-full md:w-1/4">
                    <SideBar filtroMes={filtroMes} filtroAno={filtroAno} />
                </div>
            </div>
        </div>
    );
};


export default PaginaPrincipal;
