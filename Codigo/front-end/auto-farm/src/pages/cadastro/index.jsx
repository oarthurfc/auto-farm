import { useEffect, useState } from "react";
import InputField from "../../components/InputField"; 
import CadastroService from '../../services/CadastroService';

function CadastroPage() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [confirmarSenha, setConfirmarSenha] = useState("");  

  // Estado para lidar com mensagens de feedback para o usuário
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState("info"); // "info", "success" ou "error"

  // Altera o título da página
  useEffect(() => {
    document.title = "Cadastro - AutoFarm";
  }, []);

  const handleCadastro = async (e) => {
    e.preventDefault();  

    if (password !== confirmarSenha) {
      setMensagem("As senhas não coincidem");
      setTipoMensagem("error"); 
      return;
    }

    const userData = {
      email,
      password 
    };

    try {
      const response = await CadastroService.create(userData);
      console.log(response);
      setTipoMensagem("success"); 
      setMensagem("Administrador cadastrado com sucesso!");
      
    } catch (error) {
      setTipoMensagem("error"); 
      setMensagem("Erro ao cadastrar o administrador. Tente novamente.");
    }
  };
  
  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-emerald-50">
      <div className="flex flex-col justify-center items-center w-full max-w-xl p-12 bg-white shadow-shape rounded-[20px] gap-8">
        <img src="public/favIcon.png" className="max-w-[117px]" alt="Logo AutoFarm" />
        <h1 className="text-[40px] text-center font-semibold text-emerald-950 leading-tight">
          Crie uma nova conta de administrador
        </h1>
        
        {mensagem && (
          <p className={`text-${tipoMensagem === "success" ? "green-500" : "red-500"}`}>
            {mensagem}
          </p>
        )} 

      <div className="flex flex-col gap-4 w-full">
          <InputField
            label="Nome"
            placeholder="José Alvino Ferreira"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <InputField
            label="E-mail"
            placeholder="jose@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Senha"
            placeholder="*********"
            type="password"
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
          />

          <InputField
            label="Confirme a senha"
            placeholder="*********"
            type="password"
            value={confirmarSenha}  
            onChange={(e) => setConfirmarSenha(e.target.value)}  
          />
        </div>
        <button
          className="bg-emerald-800 w-full text-white p-3 rounded-[4px]"
          onClick={handleCadastro}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CadastroPage;
