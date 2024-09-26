import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
// PAGINAS
import LoginPage from "./pages/login";
import CadastroPage from "./pages/cadastro";
import GerenciarRebanho from "./pages/gerenciar-rebanho";
import AnimalDetalhes from './pages/detalhes-animal/index';

import Navbar from "./components/Navbar"; 
import ProtectedRoute from "./components/ProtectedRoute"; // Importa o componente de proteção

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <div className=""> 
        <Outlet /> 
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/cadastro",
        element: (
          <ProtectedRoute>
            <CadastroPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/gerenciar-rebanho",
        element: (
          <ProtectedRoute>
            <GerenciarRebanho />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detalhes-animal/:id",
        element: (
          <ProtectedRoute>
            <AnimalDetalhes />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { 
    path: "/login",
    element: <LoginPage />
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
