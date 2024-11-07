import { Routes, Route, Outlet } from "react-router-dom";
// PÁGINAS
import LoginPage from "./pages/login";
import CadastroPage from "./pages/cadastro";
import GerenciarRebanho from "./pages/gerenciar-rebanho";
import AnimalDetalhes from './pages/detalhes-animal/index';
import GerenciarTransacoes from './pages/gerenciar-transacoes/index';
import MonitorarPastagemPage from "./pages/monitorar-pastagem";

// COMPONENTES
import Navbar from "./components/Navbar";
import { RequireAuth } from "./contexts/RequireAuth"; // Proteção de rotas
import GerenciarFuncionarios from "./pages/gerenciar-funcionario";
import FuncionarioDetalhes from "./pages/detalhes-funcionario";
import PaginaPrincipal from "./pages/gerenciar-despezas/index";
import RelatorioPage from "./pages/relatorio";

// Layout que inclui a Navbar
const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <div>
        <Outlet /> {/* Exibe as rotas filhas aqui */}
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        {/* Rota pública: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Layout com Navbar para rotas privadas */}
        <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
          {/* Rotas protegidas */}
          <Route path="cadastro" element={<CadastroPage />} />
          <Route path="gerenciar-rebanho" element={<GerenciarRebanho />} />
          <Route path="detalhes-animal/:id" element={<AnimalDetalhes />} />
          <Route path="funcionarios" element={<GerenciarFuncionarios/>}/>
          <Route path="gerenciar-transacoes" element={<GerenciarTransacoes/>}/>
          <Route path="funcionario/:id" element={<FuncionarioDetalhes/>} />
          <Route path="monitorar-pastagem" element={<MonitorarPastagemPage/>}/>
          <Route path="gerenciar-despesas" element={<PaginaPrincipal/>}/>
          <Route path="relatorio" element={<RelatorioPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
