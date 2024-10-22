import React, { useEffect, useState } from 'react';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';

const SideBar = ({filtroMes, filtroAno}) => {
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [maioresDespesas, setMaioresDespesas] = useState([]);
  const [tiposMaioresDespesas, setTiposMaioresDespesas] = useState([]); // Novo estado
  const [despesas, setDespesas] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  

  

  useEffect(() => {

    getAllDespesas().then((res) => {

        const dataFiltered = res.data.filter((despesa) => {
            const dataDespesa = new Date(despesa.data); // Converte a string da data em um objeto Date
            return (
              dataDespesa.getMonth() + 1 === parseInt(filtroMes) && // Adiciona 1 porque getMonth() retorna 0-11
              dataDespesa.getFullYear() === parseInt(filtroAno) // Compara o ano
            );
        });
        //console.log("dataFiltered " + dataFiltered)
        setDespesas(dataFiltered)
        const total = res.data.reduce((acc, despesa) => acc + despesa.preco, 0);
        console.log("total" + total)
        setTotalDespesas(total)
    })




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
        console.log(transacoesFiltradas)
        setTransacoes(transacoesFiltradas);
        const totalReceitaReduce = transacoesFiltradas.reduce((acc, transacao) => acc + transacao.preco, 0);
        setTotalReceitas(totalReceitaReduce);
        console.log("Transacao: " + transacoes)
        console.log("totalReceitas " + totalReceitaReduce)
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransacoes();
  }, [filtroMes, filtroAno]);

  useEffect(() => {
    if (!Array.isArray(despesas)) {
        console.error('Despesas não é um array:', despesas);
        return; // Previne a execução se despesas não for um array
    }

    // Agrupando e somando despesas pelo tipo
    // Agrupando e somando despesas pelo tipo
    const despesasPorTipo = despesas.reduce((acc, despesa) => {
    // Certifica-se de que a propriedade existe
    if (despesa.tipoDesepesa && despesa.preco) { // Corrigido para tipoDesepesa
        if (!acc[despesa.tipoDesepesa]) { // Corrigido para tipoDesepesa
            acc[despesa.tipoDesepesa] = 0; // Corrigido para tipoDesepesa
        }
        acc[despesa.tipoDesepesa] += despesa.preco; // Corrigido para tipoDesepesa
    } else {
        console.warn('Despesa inválida:', despesa);
    }
    return acc;
}, {});

// Convertendo o objeto de despesas agrupadas em um array e filtrando os 5 maiores
const maioresDespesasArray = Object.entries(despesasPorTipo)
    .map(([tipo, total]) => ({ tipoDesepesa: tipo, total })) // Corrigido para tipoDesepesa
    .sort((a, b) => b.total - a.total)
    .slice(0, 5); // Pega as 5 maiores despesas

//console.log('Maiores despesas calculadas:', maioresDespesasArray);

setMaioresDespesas(maioresDespesasArray);
setTiposMaioresDespesas(maioresDespesasArray); // Salva no novo estado
//console.log(maioresDespesas);
//console.log(tiposMaioresDespesas);

}, [totalReceitas, totalDespesas, despesas]);


  return (
    <div className="flex-grow bg-white p-4">
      {/* Card 1: Saldo em Contas */}
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 mb-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Saldo em Contas</h3>
        <div className="flex justify-between">
          <span className="text-gray-600"><strong>Total</strong></span>
          <span className="font-bold text-blue-600">R$ {totalReceitas - totalDespesas}</span>
          

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
