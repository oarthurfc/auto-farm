import React from 'react';
import { useState } from 'react';
import GerenciarDespesa from './GerenciarDespezas'; // O componente que você já criou
import SideBar from './SideBar'; // O componente de SideBar que criamos

const PaginaPrincipal = () => {
  
    const [filtroMes, setFiltroMes] = useState(new Date().getMonth() + 1); // Mês atual
    const [filtroAno, setFiltroAno] = useState(new Date().getFullYear()); // Ano atual

    return (    
    <div className='mt-5'>
        

        <div className="flex ">
      
            <div className="flex-grow w-2/3">
                <GerenciarDespesa filtroMes={filtroMes} setFiltroMes={setFiltroMes} filtroAno={filtroAno} setFiltroAno={setFiltroAno}/>
            </div>
      
      
            <div className="ml-0 w-1/4">
                <SideBar filtroMes={filtroMes} filtroAno={filtroAno}/>
            </div>
        </div>
    </div>
  );
};

export default PaginaPrincipal;
