import { useContext } from "react";
import { NavBarContext } from "./NavBar";
import { Link } from "react-router-dom";

function NavLink({to, position, size, iconPath, text, external})
{
    const context = useContext(NavBarContext);

    if(!context)
    {
        throw new Error("The NavLink component must be inside NavBar component.");
    }

    const linkContent = (
        <div className="group relative">
            {iconPath ? (
                <div className="bg-contain bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                    style={{
                        width: size,
                        height: size,
                        backgroundImage: `url(${iconPath})`
                    }}>
                </div>
            ) : (
                <div className="text-white font-medium text-center transition-all duration-300 group-hover:text-gray-300"
                    style={{
                        width: size,
                        height: size,
                        lineHeight: size,
                        fontSize: `calc(${size} * 0.4)`
                    }}>
                    {text}
                </div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
        </div>
    );

    if (external) {
        return (
            <a href={to} target="_blank" rel="noopener noreferrer" className="block">
                {linkContent}
            </a>
        );
    }

    return (
        <Link to={to} className="block">
            {linkContent}
        </Link>
    );
}

export default NavLink;