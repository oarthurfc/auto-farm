import axios from "axios";

const BASE_URL = 'https://autofarm-app-service-plan-bscsakggbdb8hbek.westus-01.azurewebsites.net/register';

const CadastroService = {
    create: (userData) => {
        return axios.post(BASE_URL, userData);
    }
};

export default CadastroService;
