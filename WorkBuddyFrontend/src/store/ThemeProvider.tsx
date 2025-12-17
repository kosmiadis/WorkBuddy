import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeCtxI {
    theme: 'light' | 'dark',
    toggleTheme: () => void,
}

const ThemeCtx = createContext<ThemeCtxI>({
    theme: 'light',
    toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider ({ children }: {children: ReactNode}) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    
    useEffect(() => {
        const preferredTheme = localStorage.getItem('theme');
        if (preferredTheme == 'light' || preferredTheme == 'dark') {
            setTheme(preferredTheme);
        }
    }, [])

    function toggleTheme () {
        setTheme((prevTheme) => {
            if (prevTheme == 'light') {
                localStorage.setItem('theme', 'dark')
                return 'dark'
            }
            localStorage.setItem('theme', 'light')
            return 'light'
        });
    }

    const values: ThemeCtxI = {
        theme,
        toggleTheme
    }
    return <ThemeCtx.Provider value={values}>
        {children}
    </ThemeCtx.Provider>
}