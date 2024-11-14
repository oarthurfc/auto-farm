import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const GraficoLucro = ({ filtroAno }) => {
    const [despesas, setDespesas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const despesaRes = await getAllDespesas();
                const transacaoRes = await getAllTransacoes();
                
                // Filtrar despesas e transações pelo ano selecionado
                const despesasFiltradas = despesaRes.data.filter(despesa => {
                    const anoDespesa = new Date(despesa.data).getFullYear();
                    return anoDespesa === parseInt(filtroAno);
                });

                const transacoesFiltradas = transacaoRes.data.filter(transacao => {
                    const anoTransacao = new Date(transacao.data).getFullYear();
                    return anoTransacao === parseInt(filtroAno);
                });

                setDespesas(despesasFiltradas);
                setTransacoes(transacoesFiltradas);
                
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [filtroAno]);  // Atualiza o gráfico sempre que o filtroAno mudar

    // Arrays para armazenar o lucro por mês
    const lucroPorMes = Array(12).fill(0);  // Inicializando 12 meses com 0

    // Calculando o lucro (transações - despesas) por mês
    despesas.forEach(despesa => {
        const mes = new Date(despesa.data).getMonth();
        lucroPorMes[mes] -= despesa.preco; // Subtraindo as despesas do lucro
    });

    transacoes.forEach(transacao => {
        const mes = new Date(transacao.data).getMonth();
        lucroPorMes[mes] += transacao.preco; // Somando as receitas ao lucro
    });

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Meses do ano
        datasets: [
            {
                label: 'Lucro Mensal',
                data: lucroPorMes, // Dados do lucro mensal
                borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo da linha
                borderWidth: 2, // Largura da borda
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Cor dos pontos
                pointBorderColor: 'rgba(75, 192, 192, 1)', // Cor da borda dos pontos
                pointRadius: 5, // Tamanho dos pontos
                fill: false, // Não preencher a área abaixo da linha
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#333',
                },
            },
            title: {
                display: true,
                text: `Lucro Mensal de ${filtroAno}`,
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#555',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false, // Remover a grade no eixo X
                },
            },
            y: {
                ticks: {
                    color: '#555',
                    font: {
                        size: 12,
                    },
                    beginAtZero: true, // Começar o gráfico no zero
                },
                grid: {
                    borderDash: [8, 4], // Linhas tracejadas no eixo Y
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default GraficoLucro;
