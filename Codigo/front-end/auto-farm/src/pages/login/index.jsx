import { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField"; 
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContex";

function LoginPage() {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpe a mensagem de erro
    try {
      const isLogged = await auth.signin(email, password); // Chame a função de login
      console.log("isLogged", isLogged);
      if(isLogged){
        navigate("/gerenciar-rebanho"); // Redirecione para a página inicial caso o login seja bem sucedido
      }
    } catch (error) {
      setErrorMessage("Credenciais inválidas");
    }
  };

  // Altera o título da página
  useEffect(() => {
    document.title = "Login - AutoFarm";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-emerald-50">
      <form className="flex flex-col justify-center items-center w-full max-w-xl p-12 bg-white shadow-shape rounded-[20px] gap-8" onSubmit={handleLogin}>
        <img src="/favIcon.png" className="max-w-[117px]" alt="Logo AutoFarm" />
        <h1 className="text-5xl text-center font-semibold text-emerald-950">Acesse sua conta</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex flex-col gap-3 w-full">
          <InputField
              label="Seu e-mail"
              placeholder="jose@gmail.com"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
          />

          <InputField 
              label="Sua senha"
              placeholder="*********"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </div>
        <button type="submit" className="bg-emerald-800 w-full text-white p-3 rounded-[4px]">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
