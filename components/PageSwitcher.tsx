"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Home from '../views/Home';
import AuditLanding from '../views/AuditLanding';

const PageSwitcher: React.FC = () => {
    const { isLandingMode } = useLanguage();
    // landing.xtekai.com shows the English ad landing page (same as /free-audit).
    return isLandingMode ? <AuditLanding lang="en" /> : <Home />;
};

export default PageSwitcher;
