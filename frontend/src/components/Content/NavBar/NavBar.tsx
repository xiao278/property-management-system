import { JSX, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { NavOption } from "./NavOption";
import "./NavBar.css"
import { AccountButton } from "../AccountButton/AccountButton";
import { FloatingMiniDropdown } from "../../Template/FloatingMiniDropdown/FloatingMiniDropdown";
import { housingEntryPageRoute } from "../../../pages/HousingEntryPage/HousingEntryPage";
import { AuthOrHide } from "../../Auth/AuthOrHide";
import { listingPageRoute } from "../../../pages/ListingPage/ListingPage";
import MenuIcon from '@mui/icons-material/Menu';
import { adminPageRoute } from "../../../pages/AdministrationPage/AdministrationPage";

interface AdaptiveNavbarProps {
    children: JSX.Element | JSX.Element[];
}

function AdaptiveNavbar (props: AdaptiveNavbarProps) {
    const { children } = props;
    const [ show, setShow ] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownOverlayRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function moveToViewportLeft() {
            if (!dropdownRef.current || !show) return;
            const rect = dropdownRef.current.getBoundingClientRect();
            const offsetX = rect.left;
            dropdownRef.current.style.transform = `translateX(${-offsetX}px)`;
            dropdownRef.current.style.width = "100vw";
        }
        function fillDownScreen() {
            if (!dropdownOverlayRef.current || !show) return;
            const rect = dropdownOverlayRef.current.getBoundingClientRect();
            const offsetY = rect.bottom;
            dropdownOverlayRef.current.style.height = `calc(100dvh - ${offsetY}px)`;
            dropdownOverlayRef.current.style.width = "100vw";
        }
        moveToViewportLeft();
        fillDownScreen();
    }, [show]);

    return (
        <>
            <div className="NavBarOptionsContainer WideOptionsContainer">
                {children}
            </div>
            <div className="NavBarOptionsContainer NarrowOptionsContainer">
                <div onClick={() => setShow(!show)}>
                    <MenuIcon sx={{height: "100%"}}/>
                </div>
                { !show ? <></> : 
                    <div className="NavBarDropdownContainer" ref={dropdownRef} onClick={() => setShow(false)}>
                        {children}
                        <div ref={dropdownOverlayRef} style={{
                            position: "absolute",
                            top: "100%",
                        }}/>
                    </div>
                }
            </div>
        </>
    )
}

export function NavBar () {
    const {logout} = useContext(AuthContext);
    return (
        <div className="NavBarContainer">
            <AdaptiveNavbar>
                <NavOption pagename="Overview (WIP)" pageroute="/overview"/>
                <NavOption pagename="Property List" pageroute={listingPageRoute}/>
                <AuthOrHide adminOnly={true}> 
                    <NavOption pagename="New Property" pageroute={housingEntryPageRoute}/>
                    <NavOption pagename="Admin" pageroute={adminPageRoute} />
                </AuthOrHide>
            </AdaptiveNavbar>
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