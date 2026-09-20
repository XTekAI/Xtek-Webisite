"use client";

import React from 'react';
import { openCookieSettings } from '../lib/consent';

/** Opens the cookie settings panel. Styled as a link so it reads naturally in text. */
const CookieSettingsButton: React.FC<{ className?: string; children?: React.ReactNode }> = ({
    className = 'text-sky-300 underline underline-offset-2 hover:text-white',
    children = 'Cookie Settings',
}) => (
    <button type="button" onClick={openCookieSettings} className={className}>
        {children}
    </button>
);

export default CookieSettingsButton;
