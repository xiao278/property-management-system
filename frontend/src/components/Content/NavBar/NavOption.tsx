import { useLocation, useNavigate } from "react-router-dom";
import { mainPageRoute } from "../../../App";
import "./NavOption.css";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext } from "react";

interface NavOptionProps {
    pagename: string;
    pageroute: string;
}

export function NavOption(props:NavOptionProps) {
    const {user} = useContext(AuthContext);
    const {pagename, pageroute} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const route = `${mainPageRoute}${pageroute}`
    const handleClick = () => {
        navigate(route);
    }
    const isActive = location.pathname.startsWith(route);
    return (
        <div className={"NavOption NavOptionHorizontal " + (isActive ? " NavOptionActive" : "")} onClick={handleClick}>
            <p>{`${pagename}`}</p>
        </div>        
    )
}