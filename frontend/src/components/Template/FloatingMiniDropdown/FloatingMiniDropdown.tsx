import { JSX, useCallback, useEffect, useRef, useState } from "react";
import "./FloatingMiniDropdown.css"

interface MenuItemActions {
    [actionName:string]: () => void;
}

export function FloatingMiniDropdown({ actions, children }: { actions: MenuItemActions, children: JSX.Element }) {    
    const [show, setShow] = useState(false);
    // const windowWidth = document.body.getBoundingClientRect().width
    // const boxRight = menuRef.current.getBoundingClientRect().right
    // const exceeding = windowWidth < boxRight

    const divRef = useRef<HTMLDivElement>(null);
    const handleClickOutsideRef = useRef<(event: MouseEvent) => void>((e) => {});
    
    const dismissPopup = useCallback(() => {
        setShow(false);
        document.removeEventListener("mousedown", handleClickOutsideRef.current);
    }, [setShow]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            dismissPopup();
        }
    }, [dismissPopup]);

    handleClickOutsideRef.current = handleClickOutside;

    useEffect(() => {
        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [show, handleClickOutside]);
    

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
                    <div className="FloatingDropdownMenu" ref={divRef}>
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