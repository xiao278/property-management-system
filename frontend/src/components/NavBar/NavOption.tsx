import { useLocation, useNavigate } from "react-router-dom";
import { mainPageRoute } from "../../Router";
import "./NavOption.css";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

interface NavOptionProps {
    pagename: string;
    pageroute: string;
    requireAdmin?: boolean;
}

export function NavOption(props:NavOptionProps) {
    const {user} = useContext(AuthContext);
    const {pagename, pageroute} = props;
    const requireAdmin = props.requireAdmin ? props.requireAdmin : false;
    const navigate = useNavigate();
    const location = useLocation();
    const route = `/${mainPageRoute}/${pageroute}`
    const handleClick = () => {
        navigate(route);
    }
    const isActive = location.pathname.startsWith(route);
    return (
        (!requireAdmin || (requireAdmin && user?.isAdmin)) ?
            <div className={"NavOption NavOptionHorizontal " + (isActive ? " NavOptionActive" : "")} onClick={handleClick}>
                <p>{`${pagename}`}</p>
            </div>
        :
            <div></div>
        
        
    )
}