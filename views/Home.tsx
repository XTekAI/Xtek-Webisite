"use client";


import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import SuccessStories from '../components/SuccessStories';
import ContactSection from '../components/ContactSection';
import BlogSection from '../components/BlogSection';
import FAQ from '../components/FAQ';
import Legal from '../components/Legal';
import ServiceAreasStrip from '../components/ServiceAreasStrip';
import GoogleReviews from '../components/GoogleReviews';
import { useScrollToHash } from '../lib/useScrollToHash';

const Home: React.FC = () => {
    useScrollToHash();

    return (
        <>
            <Hero />
            <TrustedBy />
            <AboutUs />
            <Services />
            <SuccessStories />
            <GoogleReviews />
            <ContactSection />
            <BlogSection />
            <FAQ />
            <ServiceAreasStrip />
            <Legal />
        </>
    );
};
export default Home;
