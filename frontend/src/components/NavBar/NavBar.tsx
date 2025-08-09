import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { NavOption } from "./NavOption";
import "./NavBar.css"
import { AccountButton } from "./AccountButton";
import { FloatingMiniDropdown } from "../FloatingMiniDropdown/FloatingMiniDropdown";

export function NavBar () {
    const {logout} = useContext(AuthContext);
    return (
        <div className="NavBarContainer">
            <div className="NavBarOptionsContainer WideOptionsContainer">
                <NavOption pagename="Overview" pageroute="overview"/>
                <NavOption pagename="Listing" pageroute="listing"/>
                <NavOption pagename="Filler1" pageroute="invalid1"/> 
                <NavOption pagename="Filler2" pageroute="invalid2"/> 
                <NavOption pagename="Filler3" pageroute="invalid3"/> 
            </div>
            <div className="MiscContainer">
                {/* <div>Welcome {user?.firstname} {user?.lastname}</div>
                <button onClick={handleLogout}>Logout</button> */}
                <FloatingMiniDropdown actions={{
                    "Log out": logout,
                    "test1": () => console.log("test1 clicked"),
                    "test2": () => console.log("test2 clicked")
                }}>
                    <AccountButton />
                </FloatingMiniDropdown>
            </div>
        </div>
    );
}