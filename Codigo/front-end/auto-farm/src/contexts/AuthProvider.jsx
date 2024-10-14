import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import { login, logout } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const token = Cookies.get('accessToken'); 

  useEffect(() => {
    const validateAdminToken = () => {

      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decodifica o token JWT
          const roles = decodedToken?.UserInfo?.roles || []; // Acessa as roles no token

          if (roles.includes(2001)) { // Verifica se o usuário tem a role de ADMIN (2001)
            setAccessToken(token); // Define o token como válido
          } else {
            signout(); // Limpa o token se o usuário não for ADMIN
          }
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          signout(); // Limpa o token inválido
        }
      }
    };

    validateAdminToken();
  }); // Executa apenas uma vez ao montar

  const signin = async (email, password) => {
    const data = await login(email, password);
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      Cookies.set('accessToken', data.accessToken, { expires: 1 }); // Armazenando o token no cookie com expiração de 1 dia
      return true;
    }
    return false;
  };

  const signout = async () => {
    await logout(token); 
    setAccessToken(null); 
    Cookies.remove('accessToken'); // Remove o token do do cookie
  };

  return (
    <AuthContext.Provider value={{ accessToken, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
