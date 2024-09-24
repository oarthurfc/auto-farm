import { useEffect } from "react"
import InputField from "../../components/InputField" 

function LoginPage() {

  //Altera o título da página
  useEffect(() => {
    document.title = "Login - AutoFarm"
  });
    
  return (
    <div className="h-screen flex items-center justify-center bg-emerald-50">
      <div className="flex flex-col justify-center items-center w-full max-w-xl p-12 bg-white shadow-shape rounded-[20px] gap-8">
        <img src="public/favIcon.png" className="max-w-[117px]" alt="Logo AutoFarm" />
        <h1 className="text-5xl text-center font-semibold text-emerald-950">Acesse sua conta</h1>
        <div className="flex flex-col gap-3 w-full">
          <InputField
              label="Seu e-mail"
              placeholder="jose@gmail.com"
              type="email"
          />

          <InputField 
              label="Sua senha"
              placeholder="*********"
              type="password"
          />

          <a href="#" className="text-emerald-300 underline">Esqueci minha senha</a>
        </div>
        <button className="bg-emerald-800 w-full text-white p-3 rounded-[4px]">Entrar</button>
      </div>
    </div>
  )
}

export default LoginPage