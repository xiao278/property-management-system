import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { NavOption } from "./NavOption";
import "./NavBar.css"
import { AccountButton } from "../AccountButton/AccountButton";
import { FloatingMiniDropdown } from "../../Template/FloatingMiniDropdown/FloatingMiniDropdown";
import { housingEntryPageRoute } from "../../../pages/HousingEntryPage/HousingEntryPage";

export function NavBar () {
    const {logout} = useContext(AuthContext);
    return (
        <div className="NavBarContainer">
            <div className="NavBarOptionsContainer WideOptionsContainer">
                <NavOption pagename="Overview" pageroute="/overview"/>
                <NavOption pagename="Listing" pageroute="/listing"/>
                <NavOption pagename="Filler1" pageroute="/invalid1"/> 
                <NavOption pagename="Filler2" pageroute="/invalid2"/> 
                <NavOption pagename="Filler3" pageroute="/invalid3"/>
                <NavOption pagename="New Entry" pageroute={housingEntryPageRoute} requireAdmin={true}/>
            </div>
            <div className="MiscContainer">
                {/* <div>Welcome {user?.firstname} {user?.lastname}</div>
                <button onClick={handleLogout}>Logout</button> */}
                <FloatingMiniDropdown actions={{
                    "Account": () => console.log("account clicked"),
                    "Log out": logout,
                }}>
                    <AccountButton />
                </FloatingMiniDropdown>
            </div>
        </div>
    );
}