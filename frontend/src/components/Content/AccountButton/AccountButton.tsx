import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import "./AccountButton.css";

const colors = [
    "#c4d926", "#6bd926", "#26d93b", "#d99426", "#d93b26",
    "#d626d9", "#d92682", "#d92629", "#7d26d9", "#2629d9",
    "#a026d9", "#d926b8", "#d9265f", "#4726d9", "#265fd9",
    "#d92653", "#d95326", "#d9ac26", "#d926ac", "#ac26d9",
    "#26d935", "#26d98e", "#26cad9", "#71d926", "#cad926"
]

function unicodeStringHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.codePointAt(i)!;
        hash = ((hash << 5) - hash) + charCode;
        hash = hash | 0;
        if (charCode > 0xffff) i++
    }
    return Math.abs(hash);
}

function hexBrightness(str: string) {
    const colorMatch = str.match(/#([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})/)
    if (colorMatch == null) return -1;
    const r = parseInt(colorMatch[1], 16);
    const g = parseInt(colorMatch[2], 16);
    const b = parseInt(colorMatch[3], 16);
    return r * 0.299 + g * 0.587 + b * 0.114;
}

export function AccountButton() {
    const {user} = useContext(AuthContext);
    const firstname = user ? user.firstname : "?";
    const lastname = user ? user.lastname : "?"
    const hash = unicodeStringHash(firstname+lastname);
    const color = colors[hash % colors.length];
    const colorBrightness = hexBrightness(color);
    return (
        <div className="AccountButton" style={{
            backgroundColor: color
        }}>
            <div className="AccountButtonText" style={{
                color: colorBrightness > 127 ? "black" : "white"
            }}>
                {firstname.charAt(0) + lastname.charAt(0)}
            </div>
        </div>
    )
}