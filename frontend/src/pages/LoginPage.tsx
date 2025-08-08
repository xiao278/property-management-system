import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "../../../interface/Auth";
import { post } from "../api";
import { AuthContext } from "../components/AuthProvider";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useContext(AuthContext);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginPayload: LoginForm = {
                username: username,
                password: password
            }

            const response = await post("/api/auth/login", loginPayload)

            if (response.ok) {
                const { token } = await response.json();
                login(token);
            }
            else {
                // server did not like credentials
                setError('Invalid credentials');
            }
        }
        catch (err) {
            // probably server OK but login(token) threw an error
            setError('Login failed');
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(location.state?.from?.pathname || '/dashboard', {replace: true})
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <div className="loginError">{error}</div>}
            </form>
        </div>
    );
}