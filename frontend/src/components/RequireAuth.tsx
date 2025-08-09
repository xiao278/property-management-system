import { Navigate, useLocation } from "react-router-dom";
import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

interface RequireAuthProps {
    requireAdmin: boolean;
}

export function RequireAuth({ props, children }: {props?:RequireAuthProps, children: JSX.Element}) {
    const adminRequired = props ? props.requireAdmin : false;
    const {user, isAuthenticated} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        setIsLoading(false);
    }, [isAuthenticated])
    if (!isAuthenticated && !isLoading && 
        (!adminRequired || (adminRequired && user?.isAdmin))
    ) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    return children;
}