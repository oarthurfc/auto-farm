import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar o useNavigate
import { AuthContext } from '../contexts/AuthContex';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // Obter o hook de navegação

  const handleLogout = async () => {
    await auth.signout(); // Chama o signout do contexto
    navigate('/login'); // Redireciona para a página de login após o signout
  };

  return (
    <nav className="bg-emerald-800 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src="/favIcon.png" alt="Logo" className="h-12" />
          <p className="text-white text-3xl font-bold">AutoFarm</p>
        </div>

        <nav className="flex space-x-20 items-center">
          <Link to="/cadastro" className="text-white text-lg hover:text-gray-300">
            Administrador
          </Link>
          <Link to="/funcionarios" className="text-white text-lg hover:text-gray-300">
            Funcionários
          </Link>
          <Link to="/gerenciar-rebanho" className="text-white text-lg hover:text-gray-300">
            Rebanho
          </Link>
          <Link to="/monitorar-pastagem" className="text-white text-lg hover:text-gray-300">
            Pastagem
          </Link>
          <Link to="/relatorio" className="text-white text-lg hover:text-gray-300">
            Relatório
          </Link>
          <button onClick={handleLogout} className="text-white text-lg hover:text-gray-300">
            Sair
          </button> 
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
