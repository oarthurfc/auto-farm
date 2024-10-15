import { useState } from "react";
import BtnClose from "../../components/BtnClose";
import { create } from "../../services/FuncionarioService";

const ModalAddFuncionario = ({ closeModal }) => {
  const handleCloseModal = () => {
    closeModal(false);
  };

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState(""); // Novo campo para o cargo
  const [horas, setHoras] = useState("");
  const [salario, setSalario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cargo)
    const newFuncionario = {
      nome: nome,
      email: email,
      cargo: cargo, 
      horas: horas,
      salario: salario,
      senha: senha,
    };

    create(newFuncionario)
      .then(() => {
        handleCloseModal(); // Fecha o modal após o sucesso
        alert(`${newFuncionario.nome} foi adicionado com sucesso!`); // Mensagem de sucesso
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar funcionário:", error);
        alert("Preencha todos os campos corretamente!"); // Mensagem de erro
      });
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-70">
      <div className="flex overflow-y-auto max-h-[100vh] scale-90 lg:scale-105 lg:mt-20 flex-col gap-6 bg-white p-10 rounded-lg shadow-lg text-start relative mt-5">
        <BtnClose fecharModal={handleCloseModal} />

        <h1 className="text-emerald-950 text-2xl font-bold">Adicionar Funcionário</h1>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Nome</span>
          <input
            type="text"
            placeholder="João Matos"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Email</span>
          <input
            type="email"
            placeholder="joao@example.com"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo para o cargo do funcionário */}
        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Cargo</span>
          <input
            type="text"
            placeholder="Gerente"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Horas Trabalhadas</span>
            <input
              type="number"
              placeholder="40"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-emerald-800 font-semibold">Salário</span>
            <input
              type="number"
              placeholder="3000"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Senha</span>
          <input
            type="password"
            placeholder="********"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900"
          onClick={handleSubmit}
        >
          Cadastrar Funcionário
        </button>
      </div>
    </div>
  );
};

export default ModalAddFuncionario;
