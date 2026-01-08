import { useEffect, useState } from "react";
import {cn} from "@/lib/utils";
const skills =[
    //frontend
    {name: "HTML/CSS", level: 95, category: "frontend"},
    {name: "Javascript", level:70, category: "frontend"},
    {name: "React", level:50, category:"frontend"},
    {name: "Bootstrap css", level:80, category:"frontend"},
    {name: "Tailwind css", level:70, category:"frontend"},

    //backend
    {name:"laravel", level:80, category:"backend"},
    {name:".Net MVC", level:90, category:"backend"},
    {name:".Net Blazor", level:80, category:"backend"},
    {name:"SQL Server", level:70, category:"backend"},

    //Tools
    {name: "Git/Github", level: 90, category:"tools"},
    {name: "Visual Studio", level:80, category:"tools"},
    {name: "VS Code", level:80, category:"tools"},
    {name: "figma", level:80, category:"tools"},
];
 
const categories = ["all", "frontend", "backend", "tools"];

export const SkillSection = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
);  
    return ( 
    <section id="skills" 
    className="py-24 px-4 relative bg-secondary/30"
    >
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My<span className="text-primary"> Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category,key)=> (
                    <button 
                    key={key}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                        "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                        activeCategory === category ? "bg-primary text-primary-foreground" : 
                        "bg-secondary/70 text-foreground hover:bd-secodary"
                    )}
                    >
                      {category}
                    </button>
                ))} 
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {filteredSkills.map((skill) =>(
                    <div key={skill.name} className="bg-card p-6 rounded-lg shadow-xs transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg">
                                {skill.name}
                            </h3>
                            <span className="text-sm font-medium text-foreground/80">{skill.level}%</span>
                        </div>

                        <div className="w-full bg-secondary/50 h-3 rounded-full overflow-hidden">
                            <div 
                                className="bg-primary h-3 rounded-full origin-left transition-all duration-700 ease-out"
                                style={{width: `${skill.level}%`}}
                                role="progressbar"
                                aria-valuenow={skill.level}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    );
};