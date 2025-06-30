import React, { createContext, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";

const NavBarContext = createContext(null);

function NavBar({children})
{
    const [isScrolled, setIsScrolled] = useState(false);
    const start = [];
    const center = [];
    const end = [];

    React.Children.map(children, (child) => 
    {
        const position = child.props.position ?? "center";
        switch (position)
        {
            case "start":
                start.push(child);
                break;
            case "center":
                center.push(child);
                break;
            case "end":
                end.push(child);
                break;
        }
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4">
                <nav className={`w-full rounded-xl transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-black/80 backdrop-blur-md shadow-lg' 
                        : 'bg-transparent'
                }`}>
                    <div className="flex items-center justify-between h-16 px-4">
                        <div className="flex items-center space-x-8">
                            {start.map((navLink, index) => (
                                <div key={`start-${index}`} className="transform hover:scale-105 transition-transform">
                                    {navLink}
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center space-x-8">
                            {center.map((navLink, index) => (
                                <div key={`center-${index}`} className="transform hover:scale-105 transition-transform">
                                    {navLink}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center space-x-8">
                            {end.map((navLink, index) => (
                                <div key={`end-${index}`} className="transform hover:scale-105 transition-transform">
                                    {navLink}
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export { NavBar, NavBarContext };