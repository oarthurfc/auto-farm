import { useContext } from "react";
import { AuthContext } from "./AuthContex";
import LoginPage from "../pages/login";

export const RequireAuth = ({ children }) => {
    const auth = useContext(AuthContext);
    
    if(!auth.accessToken){
        return <LoginPage/>
    }

    return children
};