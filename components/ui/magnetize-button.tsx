"use client"

import * as React from "react"

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface MagnetizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    particleCount?: number;
    attractRadius?: number;
    children?: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i].x,
            y: particles[i].y,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    return (
        <Button
            className={cn(
                "min-w-40 relative touch-none",
                "bg-secondary text-white",
                "hover:bg-secondary/90",
                "border border-secondary/50",
                "transition-all duration-300 rounded-full",
                className
            )}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index].x, y: particles[index].y }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-white/80",
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-40"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2">
                <span className="">
                    {props.children || (isAttracting ? "Attracting" : "Hover me")}
                </span>
            </span>
        </Button>
    );
}

export { MagnetizeButton }
