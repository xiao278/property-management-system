import "./LoadingContentPlaceholder.css";

export function LoadingContentPlaceholder() {
    const color1 = "#616161";
    const color2 = "#616161";   
    const color3 = "#616161";
    return (
        <div className="LoadingContentPlaceholderContainer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="50%">
                <rect fill={color1} stroke={color1} strokeWidth="11" width="30" height="30" x="25" y="50"><animate attributeName="y" calcMode="spline" dur="1.2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill={color2} stroke={color2} strokeWidth="11" width="30" height="30" x="85" y="50"><animate attributeName="y" calcMode="spline" dur="1.2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill={color3} stroke={color3} strokeWidth="11" width="30" height="30" x="145" y="50"><animate attributeName="y" calcMode="spline" dur="1.2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect>
            </svg>
        </div>
    );
}