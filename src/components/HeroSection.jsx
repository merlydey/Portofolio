import React from "react";
import {ArrowDown} from "lucide-react";

export const HeroSection = () =>  {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="container max-w-4xl mx-auto text-center z-10">
                    {/* layout: h1 and paragraph stacked (p selalu di bawah h1) */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
                            <span className="text-primary opacity-0 animate-fade-in-delay-1"> Deyo</span>
                            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> Irfandiantoro</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3 ">
                            I am a full-stack developer who seeks peace of mind and soul when I start coding. 
                            I’m not that great, but I’m eager to learn the latest technologies.
                        </p>

                        <div className="py-4 opacity-0 aniate-fade-in-delay-4">
                            <a href="#projects" className="cosmic-button">
                                View My Work
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-sm text-muted-foreground mb-2">
                        Scroll
                    </span>
                    <ArrowDown className="h-5 w-5 text-primary"/>
                </div>
        </section>
    );
}