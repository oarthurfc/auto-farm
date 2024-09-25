import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
// PAGINAS
import LoginPage from "./pages/login";
import CadastroPage from "./pages/cadastro";
import GerenciarRebanho from "./pages/gerenciamento rebanho/GerenciarRebanho";
import AnimalDetalhes from './pages/AnimalDetalhes/AnimalDetalhes';

import Navbar from "./components/Navbar"; 


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
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/cadastro",
        element: <CadastroPage />,
      },
      {
        path: "/rebanho",
        element: <GerenciarRebanho />,
      },
      {
        path: "/animal/:id",
        element: <AnimalDetalhes />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
