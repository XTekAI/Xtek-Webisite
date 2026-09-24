"use client";

import React, { useId } from 'react';

interface HoneypotProps {
    value: string;
    onChange: (value: string) => void;
}

/**
 * Hidden field real visitors never see or fill; a bot that autofills every input on the page
 * catches it. Positioned off-screen instead of `display:none`/`visibility:hidden`, since some
 * bots skip those but still fill absolutely-positioned fields.
 *
 * The `name="website"` must stay exactly this — app/api/lead/route.ts checks that field name.
 */
const Honeypot: React.FC<HoneypotProps> = ({ value, onChange }) => {
    const id = useId();
    return (
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label htmlFor={id}>Leave this field empty</label>
            <input
                id={id}
                type="text"
                name="website"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
            />
        </div>
    );
};

export default Honeypot;
