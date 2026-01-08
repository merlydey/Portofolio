import {Moon, Sun} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
             setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

     return (
         <button 
         onClick={toggleTheme} 
         aria-pressed={isDarkMode}
         title="Toggle theme"
         className={cn(
           "hidden sm:flex fixed top-4 right-4 z-50 items-center p-2 rounded-full transition-transform duration-150 shadow-md",
           "bg-white/80 dark:bg-gray-900/75 backdrop-blur border border-gray-200 dark:border-gray-700",
           "hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
         )}
         > 
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-400" /> 
        ) : (
          <Moon className="h-6 w-6 text-sky-600"/>
        )}
    </button>
    );
};