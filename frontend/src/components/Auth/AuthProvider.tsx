import { createContext, JSX } from "react";
import { useAuth } from "../../hooks/useAuth";

export const AuthContext = createContext<ReturnType<typeof useAuth>>({
        isAuthenticated: false,
        user: null,
        login: (token: string) => {console.log("error logging in")},
        logout: () => {console.log("error logging out")}
    });

export function AuthProvider({children}: {children: JSX.Element}) {
    const authHook = useAuth();
    return (
        <AuthContext.Provider value={authHook}>
            {children}
        </AuthContext.Provider>
    )
}