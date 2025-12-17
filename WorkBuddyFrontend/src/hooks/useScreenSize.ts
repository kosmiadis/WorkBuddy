import { useEffect, useState } from "react";

export function useScreenSize () {
    const [ screenSize, setScreenSize ] = useState({ width: window.innerWidth, height: window.innerHeight });

    function handleResize () {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }


    useEffect(() => {
        window.addEventListener('resize', handleResize)
        
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    
    return { ...screenSize, isMobile: screenSize.width <= 639, isTablet: screenSize.width <= 1023, isLaptop: screenSize.width <= 1279 };
}