import { JSX, useRef, useState } from "react";
import "./FloatingMiniDropdown.css"
import * as ReactDOM from 'react-dom'

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
                    <button 
                        className="FloatingDropdownMenuButtons FloatingDropdownMenuRetract"
                        onClick={() => {setShow(false)}}
                    >^</button>
                </div>
            :<></>}
        </div>
    )
}