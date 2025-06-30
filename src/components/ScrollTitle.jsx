import { useEffect, useRef, useState } from "react";

function ScrollTitle({children ,color, weight, fontSize, width, scrollSpeed = 1, classes = ''})
{
    const title = useRef(null);

    const [position, SetPosition] = useState(0);
    const positionRef = useRef(0);
    const requestRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() =>
    {        
        const computedStyle = window.getComputedStyle(title.current);
        let fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
        
        while (title.current.scrollWidth > title.current.clientWidth && fontSize > 100)
        {
            fontSize -= 1;
            title.current.style.fontSize = `${fontSize}px`;
        }

        title.current.style.setProperty("--scroll-percentage", `${((title.current.scrollWidth - title.current.clientWidth) / title.current.clientWidth) * 100}%`);
    }, []);

    useEffect(() =>
    {
        const animate = () =>
        {
            if (positionRef.current === 0 && title.current.scrollWidth != title.current.clientWidth)
            {
                timeoutRef.current = setTimeout(() =>
                {
                    positionRef.current -= 1 * scrollSpeed;
                    SetPosition(positionRef.current);
                    requestRef.current = requestAnimationFrame(animate);
                }, 1000);
            }
            else if (positionRef.current > -(title.current.scrollWidth - title.current.clientWidth))
            {
                positionRef.current -= 1 * scrollSpeed;
                SetPosition(positionRef.current);
                requestRef.current = requestAnimationFrame(animate);
            }
            else
            {
                timeoutRef.current = setTimeout(() =>
                {
                    positionRef.current = 0;
                    SetPosition(positionRef.current);
                    requestRef.current = requestAnimationFrame(animate);
                }, 1000);
            }
        };
    
        animate();
    
        return () =>
        {
            cancelAnimationFrame(requestRef.current);
            clearTimeout(timeoutRef.current);
        };
      }, []);

    return (
        <div className={`flex-grow overflow-hidden`} style={{
            width: width,
            marginRight: `${fontSize * 0.5}rem`,
            marginLeft: `${fontSize * 0.5}rem`
        }}>
            <h1 ref={title} className={`${"whitespace-nowrap text-center " + classes}`} style={{
                width: width,
                color: color,
                fontWeight: weight,
                fontSize: `${fontSize * 1}rem`,
                transform: `translateX(${position}px)`
            }}>{children}</h1>
        </div>
    );
}

export default ScrollTitle;