"use client";

import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import React from 'react';

import { serviceAreas } from '../../content/service-areas';
import { Brain, LineChart, Server, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceAreaLayout: React.FC = () => {
    const params = useParams<{ cityId: string }>();
    const cityId = params?.cityId;
    const area = serviceAreas.find((a) => a.id === cityId);

    if (!area) {
        redirect("/");
    }

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24 relative"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary-light/10 blur-[100px] rounded-full"></div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text max-w-4xl mx-auto leading-tight relative">
                    {area.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed relative">
                    {area.heroSub}
                </p>
                <p className="text-sm font-semibold tracking-wider text-primary-light uppercase space-x-2">
                    {area.neighborhoods.map((n, i) => (
                        <span key={i} className="inline-block bg-primary-dark/30 rounded-full px-4 py-1 border border-primary-light/10 m-1">
                            # {n}
                        </span>
                    ))}
                </p>
            </motion.div>

            {/* Local Authority Section */}
            <div className="mb-24 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent"></div>
                <div className="glass-panel p-10 relative overflow-hidden text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">{area.localAuthText}</h2>
                    <p className="text-xl text-white/70 leading-relaxed italic border-l-4 border-primary-light pl-6">
                        "{area.localAuthExample}"
                    </p>
                </div>
            </div>

            {/* Core Services Grid */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-12">Core Services for {area.city}</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="glass-panel p-8 text-left hover:border-primary-light/30 transition-all cursor-crosshair">
                        <Brain className="w-10 h-10 text-primary-light mb-6" />
                        <h3 className="text-2xl font-semibold mb-4 text-white">Custom AI Development</h3>
                        <p className="text-white/60">Bespoke software and machine learning tools designed specifically for {area.city} industries.</p>
                    </div>
                    <div className="glass-panel p-8 text-left hover:border-secondary-light/30 transition-all cursor-crosshair">
                        <LineChart className="w-10 h-10 text-secondary-light mb-6" />
                        <h3 className="text-2xl font-semibold mb-4 text-white">Marketing Automation</h3>
                        <p className="text-white/60">Lead generation that never sleeps. We scale your online footprint effortlessly.</p>
                    </div>
                    <div className="glass-panel p-8 text-left hover:border-accent-yellow/30 transition-all cursor-crosshair">
                        <Server className="w-10 h-10 text-accent-yellow mb-6" />
                        <h3 className="text-2xl font-semibold mb-4 text-white">CRM Integration</h3>
                        <p className="text-white/60">Making your local sales team 10x more efficient with unified and automated systems.</p>
                    </div>
                </div>
            </div>

            {/* Local SEO / Secret Sauce */}
            <div className="mb-24 max-w-4xl mx-auto glass-panel p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-primary-light/50 flex flex-col items-center justify-center p-6 bg-primary-dark/20 text-center">
                        <MapPin className="w-10 h-10 text-primary-light mb-2" />
                        <span className="text-xs font-bold text-white/70 uppercase">Local <br /> Focus</span>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">{area.seoText}</h2>
                    <p className="text-lg text-white/60 mb-6">{area.seoExample}</p>
                    <div className="flex gap-4 flex-wrap text-sm text-primary-light/80">
                        {area.service_keywords.map((kw, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {kw}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Local FAQ */}
            <div className="max-w-3xl mx-auto mb-20 text-center md:text-left">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="glass-panel p-8">
                        <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                            <span className="text-primary-light pb-1">Q:</span>
                            {area.faqInPerson.q}
                        </h3>
                        <p className="text-white/60 pl-8">{area.faqInPerson.a}</p>
                    </div>
                    <div className="glass-panel p-8">
                        <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                            <span className="text-primary-light pb-1">Q:</span>
                            {area.faqTime.q}
                        </h3>
                        <p className="text-white/60 pl-8">{area.faqTime.a}</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 border-t border-primary-light/20 pt-16">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                    Get a Free Strategy Session for Your {area.city} Business <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default ServiceAreaLayout;
