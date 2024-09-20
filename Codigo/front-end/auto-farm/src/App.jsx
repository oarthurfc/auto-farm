import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import CadastroPage from "./pages/cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/cadastro",
    element: <CadastroPage/>,
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
