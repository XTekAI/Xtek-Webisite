"use client";

import React from 'react';
import ContactForm from './ContactForm';
import { useLanguage } from '../context/LanguageContext';
import LiquidBackdrop from './LiquidBackdrop';

/**
 * The home page contact wizard, reusable on any page. Buttons on the same page link to "#contact",
 * so visitors fill the form without being sent back to the home page.
 */
const ContactSection: React.FC<{ title?: string; subtitle?: string }> = ({ title, subtitle }) => {
    const { t } = useLanguage();
    return (
        <section id="contact" className="py-24 px-6 relative isolate overflow-hidden scroll-mt-24">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent"></div>
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{title ?? t.contact.section_title}</h2>
                <p className="text-xl text-white/60">{subtitle ?? t.contact.section_subtitle}</p>
            </div>
            <LiquidBackdrop variant="section" />
            <ContactForm />
        </section>
    );
};

export default ContactSection;
