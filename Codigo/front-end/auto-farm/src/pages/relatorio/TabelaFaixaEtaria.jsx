import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3500/animal';

const TabelaFaixaEtaria = () => {
  const [animais, setAnimais] = useState([]);
  const [tabelaData, setTabelaData] = useState([]);

  useEffect(() => {
    const token = Cookies.get('accessToken');  
    const fetchAnimais = async () => {
      try {
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`  // Adiciona o token nos headers
            }
        });
        setAnimais(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos animais:', error);
      }
    };

    fetchAnimais();
  }, []);

  useEffect(() => {
    // Função para calcular a faixa etária e agrupar os animais
    const calcularFaixaEtaria = () => {
      const faixas = {
        '0-12': { macho: 0, femea: 0 },
        '13-24': { macho: 0, femea: 0 },
        '25-36': { macho: 0, femea: 0 },
        'acima_36': { macho: 0, femea: 0 },
      };

      const calcularIdade = (dataNascimento) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        const idadeEmMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 + (hoje.getMonth() - nascimento.getMonth());
        return idadeEmMeses;
      };

      animais.forEach((animal) => {
        const idade = calcularIdade(animal.nascimento);
        const sexo = animal.sexo.toLowerCase();

        if (idade <= 12) {
          faixas['0-12'][sexo]++;
        } else if (idade <= 24) {
          faixas['13-24'][sexo]++;
        } else if (idade <= 36) {
          faixas['25-36'][sexo]++;
        } else {
          faixas['acima_36'][sexo]++;
        }
      });

      // Converter os dados para formato que será exibido na tabela
      const data = [
        { faixa: '0 a 12 meses', macho: faixas['0-12'].macho, femea: faixas['0-12'].femea },
        { faixa: '13 a 24 meses', macho: faixas['13-24'].macho, femea: faixas['13-24'].femea },
        { faixa: '25 a 36 meses', macho: faixas['25-36'].macho, femea: faixas['25-36'].femea },
        { faixa: 'Acima de 36 meses', macho: faixas['acima_36'].macho, femea: faixas['acima_36'].femea },
      ];

      setTabelaData(data);
    };

    if (animais.length > 0) {
      calcularFaixaEtaria();
    }
  }, [animais]);

  // Calcular total de animais
  const calcularTotal = () => {
    let totalMacho = 0;
    let totalFemea = 0;
    tabelaData.forEach(item => {
      totalMacho += item.macho;
      totalFemea += item.femea;
    });
    return totalMacho + totalFemea;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Tabela de Faixa Etária dos Animais</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-center">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center bg-gray-100 text-gray-600">Faixa Etária</th>
            <th className="px-6 py-3 text-center bg-gray-100 text-gray-600">Sexo</th>
            <th className="px-6 py-3 text-center bg-gray-100 text-gray-600">Quantidade de Animais</th>
          </tr>
        </thead>
        <tbody>
          {tabelaData.map((item, index) => ( 
            <>
              <tr key={`${index}-femea`} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.faixa}</td>
                <td className="px-6 py-4">Fêmea</td>
                <td className="px-6 py-4">{item.femea}</td>
              </tr>
              <tr key={`${index}-macho`} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.faixa}</td>
                <td className="px-6 py-4">Macho</td>
                <td className="px-6 py-4">{item.macho}</td>
              </tr>
            </>
          ))}
          {/* Linha de total */}
          <tr className="border-t font-semibold bg-neutral-200 text-center">
            <td colSpan="2" className="px-6 py-4">Total de Animais</td>
            <td className="px-6 py-4">{calcularTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabelaFaixaEtaria;
