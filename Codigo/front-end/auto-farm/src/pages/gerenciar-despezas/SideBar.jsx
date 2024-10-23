import React, { useEffect, useState } from 'react';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';

const SideBar = ({ filtroMes, filtroAno }) => {
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [maioresDespesas, setMaioresDespesas] = useState([]);
  const [tiposMaioresDespesas, setTiposMaioresDespesas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [allDespesas, setAllDespesas] = useState(0); // Alterado para armazenar o total geral de despesas
  const [allReceitas, setAllReceitas] = useState(0); // Alterado para armazenar o total geral de receitas

  useEffect(() => {
    // Fetch de todas as despesas (sem filtro)
    getAllDespesas().then((res) => {
      // Calcular o total geral de despesas
      const totalDespesasGeral = res.data.reduce((acc, despesa) => acc + despesa.preco, 0);
      setAllDespesas(totalDespesasGeral); // Atualiza o total geral de despesas

      // Filtrar as despesas pelo mês e ano selecionados
      const despesasFiltradas = res.data.filter((despesa) => {
        const dataDespesa = new Date(despesa.data);
        return (
          dataDespesa.getMonth() + 1 === parseInt(filtroMes) &&
          dataDespesa.getFullYear() === parseInt(filtroAno)
        );
      });

      setDespesas(despesasFiltradas); // Atualiza despesas filtradas para o mês
      const totalDespesasMes = despesasFiltradas.reduce((acc, despesa) => acc + despesa.preco, 0);
      setTotalDespesas(totalDespesasMes); // Atualiza o total de despesas no mês
    });

    // Fetch de todas as transações (sem filtro)
    getAllTransacoes().then((res) => {
      // Calcular o total geral de receitas
      const totalReceitasGeral = res.data.reduce((acc, transacao) => acc + transacao.preco, 0);
      setAllReceitas(totalReceitasGeral); // Atualiza o total geral de receitas

      // Filtrar as transações (receitas) pelo mês e ano selecionados
      const transacoesFiltradas = res.data.filter((transacao) => {
        const dataTransacao = new Date(transacao.data);
        return (
          dataTransacao.getMonth() + 1 === parseInt(filtroMes) &&
          dataTransacao.getFullYear() === parseInt(filtroAno)
        );
      });

      setTransacoes(transacoesFiltradas); // Atualiza transações filtradas para o mês
      const totalReceitasMes = transacoesFiltradas.reduce((acc, transacao) => acc + transacao.preco, 0);
      setTotalReceitas(totalReceitasMes); // Atualiza o total de receitas no mês
    });
  }, [filtroMes, filtroAno]);

  useEffect(() => {
    if (!Array.isArray(despesas)) {
      console.error('Despesas não é um array:', despesas);
      return;
    }

    // Agrupando e somando despesas pelo tipo
    const despesasPorTipo = despesas.reduce((acc, despesa) => {
      if (despesa.tipoDesepesa && despesa.preco) {
        if (!acc[despesa.tipoDesepesa]) {
          acc[despesa.tipoDesepesa] = 0;
        }
        acc[despesa.tipoDesepesa] += despesa.preco;
      } else {
        console.warn('Despesa inválida:', despesa);
      }
      return acc;
    }, {});

    // Convertendo o objeto de despesas agrupadas em um array e filtrando os 5 maiores
    const maioresDespesasArray = Object.entries(despesasPorTipo)
      .map(([tipo, total]) => ({ tipoDesepesa: tipo, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    setMaioresDespesas(maioresDespesasArray);
    setTiposMaioresDespesas(maioresDespesasArray);
  }, [totalReceitas, totalDespesas, despesas]);

  return (
    <div className="flex-grow p-4 pt-12">
      {/* Card 1: Saldo em Contas */}
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Saldo em Contas</h3>
        <div className="flex justify-between"> {/* Essa div é o contêiner para aplicar space-between */}
          <span className="text-gray-600"><strong>Saldo Geral:</strong></span>
          <span className="font-bold text-blue-600">R$ {allReceitas - allDespesas}</span> {/* Total geral */}
        </div>
        <div className="flex justify-between mt-2"> {/* Outra div para o total do mês */}
          <span className='text-gray-600'><strong>Saldo no Mês:</strong></span>
          <span className='font-bold text-blue-600'>R$ {totalReceitas - totalDespesas}</span> {/* Total no mês */}
        </div>
      </div>

      {/* Card 2: Maiores Despesas do Mês */}
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Maiores Despesas do Mês</h3>
        {tiposMaioresDespesas.length > 0 ? (
          <ul>
            {tiposMaioresDespesas.map((despesa, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{despesa.tipoDesepesa}</span>
                <span className="text-red-600">R$ {despesa.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Nenhuma despesa registrada.</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
