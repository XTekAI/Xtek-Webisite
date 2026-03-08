export interface ServiceArea {
    id: string;
    metaTitle: string;
    metaDescription: string;
    city: string;
    state: string;
    neighborhoods: string[];
    service_keywords: string[];
    heroTitle: string;
    heroSub: string;
    localAuthText: string;
    localAuthExample: string;
    seoText: string;
    seoExample: string;
    faqInPerson: { q: string; a: string };
    faqTime: { q: string; a: string };
}

export const serviceAreas: ServiceArea[] = [
    {
        id: "hamilton-nj",
        metaTitle: "AI Automation & Marketing Agency in Hamilton, NJ",
        metaDescription: "Top-rated AI automation agency serving Hamilton. We help Hamilton business owners automate workflows and scale marketing.",
        city: "Hamilton",
        state: "NJ",
        neighborhoods: ["Mercerville", "Nottingham", "White Horse"],
        service_keywords: ["AI Automation Hamilton", "Marketing Agency Hamilton", "Workflow Optimization NJ"],
        heroTitle: "The AI Automation Agency Powering Hamilton, NJ Businesses.",
        heroSub: "We help Hamilton entrepreneurs reclaim 15+ hours a week by automating manual workflows and scaling digital marketing.",
        localAuthText: "Why Hamilton Businesses are Choosing AI.",
        localAuthExample: "As a hub between Philly and New York, Hamilton businesses need the speed of AI to stay competitive.",
        seoText: "Proudly Serving the Hamilton Community.",
        seoExample: "Serving Hamilton and neighboring areas including Trenton, Lawrenceville, and Robbinsville.",
        faqInPerson: {
            q: "Do you offer in-person consultations in Hamilton?",
            a: "Yes, we offer local in-person consultations to understand your Hamilton business in depth."
        },
        faqTime: {
            q: "How long does it take to implement AI for a Hamilton business?",
            a: "Typically 4-8 weeks, scaling with the complexity of your workflow."
        }
    },
    {
        id: "philadelphia-pa",
        metaTitle: "AI Automation & Marketing Agency in Philadelphia, PA",
        metaDescription: "Top-rated AI automation agency serving Philadelphia. We help Philadelphia business owners automate workflows and scale marketing.",
        city: "Philadelphia",
        state: "PA",
        neighborhoods: ["Center City", "Old City", "Fishtown"],
        service_keywords: ["AI Automation Philadelphia", "Marketing Agency Philadelphia", "Workflow Optimization PA"],
        heroTitle: "The AI Automation Agency Powering Philadelphia, PA Businesses.",
        heroSub: "We help Philadelphia entrepreneurs reclaim 15+ hours a week by automating manual workflows and scaling digital marketing.",
        localAuthText: "Why Philadelphia Businesses are Choosing AI.",
        localAuthExample: "From Center City startups to established firms in Bucks County, we bridge the gap between tradition and tech.",
        seoText: "Proudly Serving the Philadelphia Community.",
        seoExample: "Serving the greater Philadelphia area including Center City, Fishtown, and King of Prussia.",
        faqInPerson: {
            q: "Do you offer in-person consultations in Philadelphia?",
            a: "Yes, we are available for in-person consultations throughout the greater Philadelphia metro."
        },
        faqTime: {
            q: "How long does it take to implement AI for a Philadelphia business?",
            a: "Typically 4-8 weeks to fully map and optimize your Philadelphia-based operations."
        }
    },
    {
        id: "manhattan-ny",
        metaTitle: "AI Automation & Marketing Agency in Manhattan, NY",
        metaDescription: "Top-rated AI automation agency serving Manhattan. We help Manhattan business owners automate workflows and scale marketing.",
        city: "Manhattan",
        state: "NY",
        neighborhoods: ["Financial District", "Midtown", "Tribeca"],
        service_keywords: ["AI Automation Manhattan", "Marketing Agency Manhattan", "Workflow Optimization NY"],
        heroTitle: "The AI Automation Agency Powering Manhattan, NY Businesses.",
        heroSub: "We help Manhattan entrepreneurs reclaim 15+ hours a week by automating manual workflows and scaling digital marketing.",
        localAuthText: "Why Manhattan Businesses are Choosing AI.",
        localAuthExample: "In the fast-paced Manhattan market, leveraging AI is essential for staying ahead of global competition.",
        seoText: "Proudly Serving the Manhattan Community.",
        seoExample: "Proudly serving Manhattan and surrounding boroughs, including Brooklyn, Queens, and the Financial District.",
        faqInPerson: {
            q: "Do you offer in-person consultations in Manhattan?",
            a: "Yes, we schedule in-person strategy sessions for clients in Manhattan and surrounding boroughs."
        },
        faqTime: {
            q: "How long does it take to implement AI for a Manhattan business?",
            a: "Typically 4-8 weeks for a complete AI and marketing automation roll-out."
        }
    }
];
