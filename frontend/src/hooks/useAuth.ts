import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { TokenUserInfo } from "../../../interface/Auth";
import { tokenName } from "../api";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<TokenUserInfo | null>(null);

    const loadToken = (token: string) => {
        const decoded:TokenUserInfo = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
    }

    const login = (token: string) => {
        localStorage.setItem(tokenName, token);
        loadToken(token);
    }

    const logout = () => {
        localStorage.removeItem(tokenName);
        setUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const token = localStorage.getItem(tokenName)
        if (token && !isAuthenticated) {
            loadToken(token)
        }
    });

    return {isAuthenticated, user, login, logout}
}

export { useAuth }