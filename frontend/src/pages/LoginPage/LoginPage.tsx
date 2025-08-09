import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../../interface/Auth";
import { post } from "../../api";
import { AuthContext } from "../../components/AuthProvider";
import './LoginPage.css'
import { mainPageRoute } from "../../Router";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
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
            navigate(`/${mainPageRoute}`)
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="LoginPage">
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="LogInputContainer">
                    <h1>login</h1>
                </div>
                <div className="LogInputContainer">
                    <p>Username</p>
                    <input
                        className="LoginTextInput"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="LogInputContainer">
                    <p>Password</p>
                    <input
                        className="LoginTextInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="LogInputContainer">
                    <p className="LoginError">{error}</p>
                </div>
                <div className="LogInputContainer">
                    <button className="LoginButton" type="submit">Connect</button>
                </div>
            </form>
        </div>
    );
}