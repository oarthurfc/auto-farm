import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-emerald-800 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/favIcon.png" alt="Logo" className="h-12" />  
            <p className="text-white text-3xl font-bold">AutoFarm</p>
          </div>

          <ul className="flex space-x-20 items-center ">
            <li>
              <Link to="/login" className="text-white text-lg hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/cadastro" className="text-white text-lg hover:text-gray-300">Cadastro</Link>
            </li>
            <li>
              <Link to="/gerenciar-rebanho" className={`text-white text-lg hover:text-gray-300`} >Gerenciar Rebanho</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
