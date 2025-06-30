import GenerateClamp from "../utils/clamp-gen";

function Button({label = "Button", size = 1, bgColor, textWeight, textSize, textColor, radius, onClick})
{
    const width = GenerateClamp(3.75 * size, 5 * size, 320, 1980);

    return (
        <button 
            className="w-[clamp(3.75rem,1.1905vw+3.5268rem,5rem)] h-14 bg-white rounded-r-sm text-graphite font-bold hover:cursor-pointer"
            style={{
                width : width,
                backgroundColor: bgColor,
                fontWeight: textWeight,
                fontSize: textSize,
                color: textColor,
                borderRadius: radius,
            }}
            onClick={onClick}
        >{label}</button>
    );
}

export default Button;