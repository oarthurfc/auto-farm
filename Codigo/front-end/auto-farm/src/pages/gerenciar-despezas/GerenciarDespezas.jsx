import React, { useEffect, useState } from 'react';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';

const GerenciarDespesa = ({filtroMes, setFiltroMes, filtroAno, setFiltroAno}) => {
  const [despesas, setDespesas] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  

  useEffect(() => {
    // Fetch de todas as despesas
    const fetchDespesas = async () => {
      try {
        const res = await getAllDespesas();
        const despesasFiltradas = res.data.filter((despesa) => {
          const dataDespesa = new Date(despesa.data);
          return (
            dataDespesa.getMonth() + 1 === parseInt(filtroMes) &&
            dataDespesa.getFullYear() === parseInt(filtroAno)
          );
        });
        setDespesas(despesasFiltradas);
        const total = despesasFiltradas.reduce((acc, despesa) => acc + despesa.preco, 0);
        setTotalDespesas(total);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };

    // Fetch de todas as transações (receitas)
    const fetchTransacoes = async () => {
      try {
        const res = await getAllTransacoes();
        const transacoesFiltradas = res.data.filter((transacao) => {
          const dataTransacao = new Date(transacao.data);
          return (
            dataTransacao.getMonth() + 1 === parseInt(filtroMes) &&
            dataTransacao.getFullYear() === parseInt(filtroAno)
          );
        });
        setTransacoes(transacoesFiltradas);
        const total = transacoesFiltradas.reduce((acc, transacao) => acc + transacao.preco, 0);
        setTotalReceitas(total);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchDespesas();
    fetchTransacoes();
  }, [filtroMes, filtroAno]); // Atualiza sempre que o filtro de mês ou ano mudar

  const totalGeral = totalDespesas + totalReceitas;
  const percentualDespesas = totalGeral ? (totalDespesas / totalGeral) * 100 : 0;
  const percentualReceitas = totalGeral ? (totalReceitas / totalGeral) * 100 : 0;

  return (
    <div className="p-2 pl-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-900">Gerenciar Finanças</h1>

      {/* Filtros para mês e ano */}
      <div className="flex items-center mb-6">
        <label className="mr-2">Mês:</label>
        <select
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
          className="border p-2 rounded mr-4"
        >
          {[...Array(12).keys()].map((mes) => (
            <option key={mes + 1} value={mes + 1}>
              {mes + 1}
            </option>
          ))}
        </select>

        <label className="mr-2">Ano:</label>
        <input
          type="number"
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card de Total Despesas */}
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Total de Despesas</h2>
          <p className="text-2xl font-bold text-red-700">R$ {totalDespesas.toFixed(2)}</p>
          {/* Barra de Progresso de Despesas */}
          <div className="w-full bg-red-300 h-2 rounded-lg mt-4">
            <div
              className="bg-red-600 h-2 rounded-lg"
              style={{ width: `${percentualDespesas}%` }}
            ></div>
          </div>
        </div>

        {/* Card de Total Receitas */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Total de Receitas</h2>
          <p className="text-2xl font-bold text-green-700">R$ {totalReceitas.toFixed(2)}</p>
          {/* Barra de Progresso de Receitas */}
          <div className="w-full bg-green-300 h-2 rounded-lg mt-4">
            <div
              className="bg-green-600 h-2 rounded-lg"
              style={{ width: `${percentualReceitas}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciarDespesa;
