import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export function DashboardPage () {
    const {logout, user} = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <div>Welcome {user?.username}</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}