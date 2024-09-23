import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-emerald-800 p-4">
      <div className="flex items-center justify-between">

        <div className='flex'>
        <img src="/favIcon.png" alt="Logo" className="h-16 mx-10 my-1" />

        <ul className="flex space-x-20 items-center mx-28">
          <li>
            <Link to="/" className="text-white text-lg hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link to="/cadastro" className="text-white text-lg hover:text-gray-300">Cadastro</Link>
          </li>
          <li>
            <Link to="/rebanho" className={`text-white text-lg hover:text-gray-300`} >Gerenciar Rebanho</Link>
          </li>
        </ul>
        </div>
        
        

        <div className="text-white text-2xl font-bold mx-6">
          AutoFarm
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
