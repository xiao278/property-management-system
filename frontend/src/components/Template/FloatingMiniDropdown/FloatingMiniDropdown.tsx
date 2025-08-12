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

    //trigger spacing
    const detectionRegionThickness = 40; //px
    const detectionRegionSpacing = 40; //px
    
    const nearSpacing = `-${detectionRegionSpacing + detectionRegionThickness}px`;
    const farSpacing = `calc(100% + ${detectionRegionSpacing}px)`;
    const crossSpacing = `-${detectionRegionSpacing + detectionRegionThickness}px`;
    const backgroundColor = "none";
    const handleOnEnter = () => {
        setShow(false);
    }

    return (
        <div className="FloatingDropdownContainer">
            <div className="FloatingDropdownToggleButton" onClick={() => {setShow(!show)}}>
                {children}
            </div>
            {show ? 
                <div className="FloatingDropdownMenuWrapper" >
                    <div className="FloatingDropdownMenu">
                        {Object.entries(actions).map(([actionName, actionCallback]) => (
                            <button className="FloatingDropdownMenuButtons" key={actionName} onClick={actionCallback}>
                                {actionName}
                            </button>
                        ))}
                    </div>
                    <div onMouseEnter={handleOnEnter} style={{position:"absolute", left:crossSpacing, right:crossSpacing, bottom:nearSpacing, top:farSpacing, backgroundColor:backgroundColor}}></div>
                    <div onMouseEnter={handleOnEnter} style={{position:"absolute", left:crossSpacing, right:crossSpacing, bottom:farSpacing, top:nearSpacing, backgroundColor:backgroundColor}}></div>
                    <div onMouseEnter={handleOnEnter} style={{position:"absolute", left:farSpacing, right:nearSpacing, bottom:crossSpacing, top:crossSpacing, backgroundColor:backgroundColor}}></div>
                    <div onMouseEnter={handleOnEnter} style={{position:"absolute", left:nearSpacing, right:farSpacing, bottom:crossSpacing, top:crossSpacing, backgroundColor:backgroundColor}}></div>
                </div>
            :<></>}
        </div>
    )
}