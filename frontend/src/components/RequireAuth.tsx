import { Navigate } from "react-router-dom";
import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { loginPageRoute } from "../pages/LoginPage/LoginPage";

interface RequireAuthProps {
    requireAdmin: boolean;
}

export function RequireAuth({ props, children }: {props?:RequireAuthProps, children: JSX.Element[]}) {
    const adminRequired = props ? props.requireAdmin : false;
    const {user, isAuthenticated} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading, isAuthenticated)
    useEffect(() => {
        setIsLoading(false);
    }, [isAuthenticated])
    if (!isAuthenticated && !isLoading && 
        (!adminRequired || (adminRequired && user?.isAdmin))
    ) {
        return <Navigate to={`${loginPageRoute}`} replace/>
    }
    return (
        <div>
            {children}
        </div>
    );
}