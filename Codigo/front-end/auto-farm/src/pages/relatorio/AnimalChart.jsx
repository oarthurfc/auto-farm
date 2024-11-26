import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Cookies from 'js-cookie';


const AnimalChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Quantidade de Rebanhos por Ano',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const token = Cookies.get('accessToken');  

        axios.get('https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/animal/countByYear', {
            headers: {
                Authorization: `Bearer ${token}`  // Adiciona o token nos headers
            }
        })
            .then((response) => {
                const data = response.data;
                console.log(response.data);

                // Verifique se os dados são válidos antes de chamar .map
                if (Array.isArray(data) && data.length > 0) {
                    const years = data.map(item => item._id);      // Extrai os anos
                    const counts = data.map(item => item.count);   // Extrai as contagens

                    setChartData({
                        labels: years,
                        datasets: [
                            {
                                label: 'Quantidade de Rebanhos por Ano',
                                data: counts,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                } else {
                    console.warn("Os dados retornados estão vazios ou em formato inesperado");
                }
            })
            .catch((error) => console.error("Erro ao buscar dados de rebanhos por ano:", error));
    }, []);

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2 className="text-center text-2xl font-bold text-emerald-800 mb-6">Quantidade de Rebanhos por Ano</h2>
            <Bar 
                data={chartData} 
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Ano',
                                font: {
                                    size: 16
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Quantidade',
                                font: {
                                    size: 16
                                }
                            },
                            beginAtZero: true,
                        }
                    },
                }} 
            />
        </div>
    );
};

export default AnimalChart;
