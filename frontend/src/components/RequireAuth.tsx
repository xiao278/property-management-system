import { Navigate, useLocation } from "react-router-dom";
import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export function RequireAuth({ children }: {children: JSX.Element}) {
    const {isAuthenticated} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        setIsLoading(false);
    }, [isAuthenticated])
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return children;
}