import "./BurgerIconAnimated.css"

export function BurgerIconAnimated() {
    const strokeColor = "rgb(255,255,255)"
    return (
        <div className="MenuCross menu--1 HamburgerMenuContainer">
            <label className="MenuIconLabel">
            <input type="checkbox" className="HamburgerMenuInput" />
            <svg viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="20" />
                <path className="line--1 MenuLine" stroke={strokeColor} d="M0 40h62c13 0 6 28-4 18L35 35" />
                <path className="line--2 MenuLine" stroke={strokeColor} d="M0 50h70" />
                <path className="line--3 MenuLine" stroke={strokeColor} d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
            </label>
        </div>
    )
}