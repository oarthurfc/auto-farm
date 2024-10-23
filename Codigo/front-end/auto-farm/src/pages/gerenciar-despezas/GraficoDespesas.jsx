import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllDespesas } from '../../services/DespesaService';
import { getAllTransacoes } from '../../services/TransacoesService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoDespesas = ({ filtroAno }) => {
    const [despesas, setDespesas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const despesaRes = await getAllDespesas();
                const transacaoRes = await getAllTransacoes();
                console.log("despRES:")
                console.log(despesaRes)
                console.log("tranRES:")
                console.log(transacaoRes)
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
                console.log("DESPESAS:")
                console.log(despesas)
                console.log("TRANSACOESS:")
                console.log(transacoes)
                console.log("Ano selecionado:", filtroAno);  // Verifique se o filtroAno é realmente "2024"

                
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [filtroAno]);  // Atualiza o gráfico sempre que o filtroAno mudar

    // Arrays para armazenar os valores de despesas e receitas por mês
    const despesasPorMes = Array(12).fill(0);  // Inicializando 12 meses com 0
    const receitasPorMes = Array(12).fill(0);  // Inicializando 12 meses com 0

    // Preenchendo os valores de despesas
    despesas.forEach(despesa => {
        const mes = new Date(despesa.data).getMonth(); // 0-11
        despesasPorMes[mes] += despesa.preco; // Somando as despesas ao mês correspondente
    });

    // Preenchendo os valores de receitas
    transacoes.forEach(transacao => {
        const mes = new Date(transacao.data).getMonth(); // 0-11
        receitasPorMes[mes] += transacao.preco; // Somando as receitas ao mês correspondente
    });

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Nome dos meses
        datasets: [
            {
                label: 'Despesas',
                data: despesasPorMes, // Dados de despesas
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // Cor vermelha com opacidade
                borderColor: 'rgba(255, 99, 132, 1)', // Borda sólida vermelha
                borderWidth: 2, // Largura da borda
                hoverBackgroundColor: 'rgba(255, 99, 132, 1)', // Cor sólida no hover
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Receitas',
                data: receitasPorMes, // Dados de receitas
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Cor azul com opacidade
                borderColor: 'rgba(54, 162, 235, 1)', // Borda sólida azul
                borderWidth: 2, // Largura da borda
                hoverBackgroundColor: 'rgba(54, 162, 235, 1)', // Cor sólida no hover
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
                        size: 14, // Tamanho da fonte da legenda
                        weight: 'bold' // Negrito
                    },
                    color: '#333', // Cor da legenda
                },
            },
            title: {
                display: true,
                text: `Gráfico de Despesas e Receitas por Mês de ${filtroAno}`,
                font: {
                    size: 18, // Tamanho da fonte do título
                    weight: 'bold' // Negrito
                },
                color: '#333', // Cor do título
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#555', // Cor dos rótulos no eixo X
                    font: {
                        size: 12, // Tamanho da fonte no eixo X
                    },
                },
                grid: {
                    display: false, // Remover a grade de fundo no eixo X
                },
            },
            y: {
                ticks: {
                    color: '#555', // Cor dos rótulos no eixo Y
                    font: {
                        size: 12, // Tamanho da fonte no eixo Y
                    },
                },
                grid: {
                    borderDash: [8, 4], // Linhas tracejadas no eixo Y
                },
            },
        },
        elements: {
            bar: {
                borderRadius: 5, // Bordas arredondadas nas barras
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}> {/* Ocupar 100% da div pai */}
            <Bar options={options} data={data} />
        </div>
    );
    
};

export default GraficoDespesas;
