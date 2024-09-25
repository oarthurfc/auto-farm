import { useEffect } from "react"
import InputField from "../../components/InputField" 

function CadastroPage() {

  //Altera o título da página
  useEffect(() => {
    document.title = "Cadastro - AutoFarm"
  });

  
  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-emerald-50">

      <div className="flex flex-col justify-center items-center w-full max-w-xl p-12 bg-white shadow-shape rounded-[20px] gap-8">
        <img src="public/favIcon.png" className="max-w-[117px]" alt="Logo AutoFarm" />
        <h1 className="text-[40px] text-center font-semibold text-emerald-950 leading-tight">Crie uma nova conta de administrador</h1>
        <div className="flex flex-col gap-4 w-full">
          
          <InputField
            label="Nome"
            placeholder="José Alvino Ferreira"
            type="text"
          />

          <InputField
            label="E-mail"
            placeholder="jose@gmail.com"
            type="email"
          />

          <InputField
            label="Senha"
            placeholder="*********"
            type="password"
          />

          <InputField
            label="Confirme a senha"
            placeholder="*********"
            type="password"
          />
        </div>
        <button className="bg-emerald-800 w-full text-white p-3 rounded-[4px]">Cadastrar</button>
      </div>
    </div>
  )
}

export default CadastroPage
