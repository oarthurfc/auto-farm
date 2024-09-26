// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken"); // Verifica se o token está presente

    return token ? children : <Navigate to="/login" />; // Redireciona se não estiver autenticado
};

export default ProtectedRoute;
