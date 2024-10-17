import { useState, useEffect } from "react";
import BtnClose from "../../components/BtnClose";
import { update } from "../../services/FuncionarioService";

const ModalEditFuncionario = ({ closeModal, funcionarioSelecionado, onEdit }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [horas, setHoras] = useState("");
  const [salario, setSalario] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (funcionarioSelecionado) {
      setNome(funcionarioSelecionado.nome);
      setEmail(funcionarioSelecionado.email);
      setCargo(funcionarioSelecionado.cargo);
      setHoras(funcionarioSelecionado.horas);
      setSalario(funcionarioSelecionado.salario);
      setSenha(funcionarioSelecionado.senha); // A senha pode ser tratada de forma diferente por questões de segurança
    }
  }, [funcionarioSelecionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedFuncionario = {
      ...funcionarioSelecionado,
      nome,
      email,
      cargo,
      horas,
      salario,
      senha,
    };

    update(funcionarioSelecionado._id, updatedFuncionario)
      .then(() => {
        onEdit(updatedFuncionario);
        closeModal(); // Fecha o modal ao salvar
        alert(`${updatedFuncionario.nome} foi atualizado com sucesso!`);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o funcionário:", error);
        alert("Erro ao salvar as alterações.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-10 rounded-lg shadow-lg text-start relative max-w-md w-full">
        <BtnClose fecharModal={closeModal} />

        <h1 className="text-emerald-950 text-2xl font-bold">Editar Funcionário</h1>

        <div className="flex flex-col gap-1 mt-4">
          <span className="text-emerald-800 font-semibold">Nome</span>
          <input
            type="text"
            maxLength={35}
            placeholder="Nome do Funcionário"
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-emerald-800 font-semibold">Email</span>
            <input
              type="email"
              placeholder="Email do Funcionário"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-emerald-800 font-semibold">Telefone</span>
            <input
              type="tel"
              maxLength={15}
              placeholder="Senha do Funcionário"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </div>

        {/* Dropdown para o cargo do funcionário */}
        <div className="flex flex-col gap-1">
          <span className="text-emerald-800 font-semibold">Cargo</span>
          <select
            className="h-12 border border-[#E3E3E3] rounded-[4px] p-2 font-normal text-sm text-emerald-950"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          >
            <option value="Contador">Contador</option>
            <option value="Fazendeiro">Fazendeiro</option>
            <option value="Veterinário">Veterinário</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-emerald-800 font-semibold">Horas Trabalhadas</span>
            <input
              type="number"
              placeholder="Horas Trabalhadas"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <span className="text-emerald-800 font-semibold">Salário</span>
            <input
              type="number"
              placeholder="Salário do Funcionário"
              className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-emerald-800 text-white text-xl rounded-md p-2 mt-6 hover:bg-emerald-900 w-full"
          onClick={handleSubmit}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default ModalEditFuncionario;
