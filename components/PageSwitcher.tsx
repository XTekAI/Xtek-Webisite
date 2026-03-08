"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Home from '../views/Home';
import LandingPage from '../views/LandingPage';

const PageSwitcher: React.FC = () => {
    const { isLandingMode } = useLanguage();
    return isLandingMode ? <LandingPage /> : <Home />;
};

export default PageSwitcher;
