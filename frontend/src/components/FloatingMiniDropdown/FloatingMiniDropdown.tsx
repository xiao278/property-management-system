import { JSX, useState } from "react";
import "./FloatingMiniDropdown.css"

interface MenuItemActions {
    [actionName:string]: () => void;
}

export function FloatingMiniDropdown({ actions, children }: { actions: MenuItemActions, children: JSX.Element }) {    
    const [show, setShow] = useState(false);
    // const windowWidth = document.body.getBoundingClientRect().width
    // const boxRight = menuRef.current.getBoundingClientRect().right
    // const exceeding = windowWidth < boxRight

    return (
        <div className="FloatingDropdownContainer">
            <div className="FloatingDropdownToggleButton" onClick={() => {setShow(!show)}}>
                {children}
            </div>
            {show ? 
                <div className="FloatingDropdownMenu">
                    {Object.entries(actions).map(([actionName, actionCallback]) => (
                        <button className="FloatingDropdownMenuButtons" key={actionName} onClick={actionCallback}>
                            {actionName}
                        </button>
                    ))}
                </div>
            :<></>}
        </div>
    )
}