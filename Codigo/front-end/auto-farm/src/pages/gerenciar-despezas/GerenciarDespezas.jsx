import React, { useEffect, useState } from 'react';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';

const GerenciarDespesa = ({ filtroMes, setFiltroMes, filtroAno, setFiltroAno }) => {
  const [despesas, setDespesas] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const res = await getAllDespesas();
        if (res.data) {
          const despesasFiltradas = res.data.filter((despesa) => {
            const dataDespesa = new Date(despesa.data);
            return (
              dataDespesa.getMonth() + 1 === parseInt(filtroMes) &&
              dataDespesa.getFullYear() === parseInt(filtroAno)
            );
          });
          setDespesas(despesasFiltradas);
          const total = despesasFiltradas.reduce((acc, despesa) => acc + (parseFloat(despesa.preco) || 0), 0); // Verifica se 'preco' é um número válido
          setTotalDespesas(total);
        }
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    };

    const fetchTransacoes = async () => {
      try {
        const res = await getAllTransacoes();
        if (res.data) {
          const transacoesFiltradas = res.data.filter((transacao) => {
            const dataTransacao = new Date(transacao.data);
            return (
              dataTransacao.getMonth() + 1 === parseInt(filtroMes) &&
              dataTransacao.getFullYear() === parseInt(filtroAno)
            );
          });
          setTransacoes(transacoesFiltradas);
          const total = transacoesFiltradas.reduce((acc, transacao) => acc + (parseFloat(transacao.preco) || 0), 0); // Verifica se 'preco' é um número válido
          setTotalReceitas(total);
        }
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchDespesas();
    fetchTransacoes();
  }, [filtroMes, filtroAno]);

  const totalGeral = totalDespesas + totalReceitas;
  
  const percentualDespesas = totalGeral ? (totalDespesas / totalGeral) * 100 : 0;
  const percentualReceitas = totalGeral ? (totalReceitas / totalGeral) * 100 : 0;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold pb-10 text-emerald-900">Gerenciar Finanças</h1>
      
      {/* Filtro para mês e ano usando input type="month" */}
      <div className="mb-6">
        <label htmlFor="filtroData" className="mr-2 text-lg font-semibold">Selecione o Mês e Ano:</label>
        <input
          type="month"
          id="filtroData"
          value={`${filtroAno}-${filtroMes.toString().padStart(2, '0')}`} // Formata para YYYY-MM
          onChange={(e) => {
            const [ano, mes] = e.target.value.split('-');
            setFiltroAno(ano);
            setFiltroMes(mes);
          }}
          className="border-2 border-emerald-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200 ease-in-out w-full md:w-auto"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card de Total Despesas */}
        <div className="bg-red-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Total de Despesas</h2>
          <p className="text-2xl font-bold text-red-700">R$ {totalDespesas.toFixed(2)}</p>
          <div className="w-full bg-red-300 h-2 rounded-lg mt-4">
            <div
              className="bg-red-600 h-2 rounded-lg transition-all delay-75 duration-500 ease-in-out"
              style={{ width: `${percentualDespesas}%` }}
            ></div>
          </div>
        </div>

        {/* Card de Total Receitas */}
        <div className="bg-green-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Total de Receitas</h2>
          <p className="text-2xl font-bold text-green-700">R$ {totalReceitas.toFixed(2)}</p>
          <div className="w-full bg-green-300 h-2 rounded-lg mt-4">
            <div
              className="bg-green-600 h-2 rounded-lg transition-all delay-75 duration-500 ease-in-out"
              style={{ width: `${percentualReceitas}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciarDespesa;
