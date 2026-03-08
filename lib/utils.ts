
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        window.history.pushState(null, '', `#${targetId}`);
    }
};
