import type { ServiceSlug } from './services';

/**
 * Local landing pages (/service-areas/<id>). Each one targets the searches Google Search Console
 * shows for that area, so the copy must stay unique per page (no "city name swapped" templates)
 * and must never contain invented figures (hours saved, percentages, client counts).
 */
export interface ServiceArea {
    id: string;
    /** Display name: "New Jersey", "South Jersey", "Hamilton"... */
    name: string;
    state: 'NJ' | 'PA' | 'NY';
    /** Drives the schema.org type used for areaServed. */
    kind: 'State' | 'Region' | 'County' | 'City';
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSub: string;
    intro: string[];
    towns: string[];
    serviceFocus: { slug: ServiceSlug; text: string }[];
    faqs: { q: string; a: string }[];
    service_keywords: string[];
}

const HOW_WE_WORK_REMOTE =
    'Most projects run over video calls, so distance is never a problem. When you are close enough, we are happy to drive over and meet in person.';

export const serviceAreas: ServiceArea[] = [
    {
        id: 'new-jersey',
        name: 'New Jersey',
        state: 'NJ',
        kind: 'State',
        metaTitle: 'AI Automation Agency in New Jersey',
        metaDescription:
            'Xtek AI is a New Jersey AI automation agency. We automate follow-up, scheduling, admin work and marketing for NJ small and mid-sized businesses.',
        heroTitle: 'The AI Automation Agency for New Jersey Businesses',
        heroSub:
            'Xtek AI is based in New Jersey. We build AI agents, workflow automations and marketing systems for local businesses across the state, from Bergen County to South Jersey.',
        intro: [
            'New Jersey businesses compete with New York and Philadelphia for the same customers, usually with smaller teams. AI automation closes that gap: lead follow-up, appointment booking, invoicing and social media can run on their own while you focus on the work only you can do.',
            'We are a New Jersey company, so we know the market: service businesses, contractors, clinics, salons, restaurants and professional offices that need practical systems, not a science project. Every engagement starts with an audit of how your business runs today, and we only automate what will actually pay off.',
        ],
        towns: [
            'Bergen County',
            'Mercer County',
            'Middlesex County',
            'Monmouth County',
            'Somerset County',
            'Burlington County',
            'Camden County',
            'Trenton',
            'Princeton',
            'Hamilton',
            'New Brunswick',
            'Cherry Hill',
            'Lakewood',
        ],
        serviceFocus: [
            { slug: 'smartflow-ai-growth-audit', text: 'Start here: we map your operations and show where automation will make the biggest difference.' },
            { slug: 'ai-agents-chatbots', text: 'AI agents that answer leads, book appointments and handle common questions 24/7.' },
            { slug: 'executive-ai-admin-automation', text: 'Automate invoicing, reporting and the admin work that eats your evenings.' },
            { slug: 'digital-marketing-aeo', text: 'Get found on Google and in AI search (ChatGPT, Gemini, Perplexity) for New Jersey searches.' },
        ],
        faqs: [
            {
                q: 'What is the best AI automation agency in New Jersey?',
                a: 'The best agency for you is one that starts with your actual workflows, builds systems your team can use, and stays local enough to meet you. Xtek AI is a New Jersey AI automation agency that does exactly that: an audit first, then AI agents, workflow automation and marketing built around how your business already works.',
            },
            {
                q: 'What does an AI automation agency do for a small business?',
                a: 'It connects the tools you already use (email, calendar, CRM, invoicing, social media) and adds AI where it saves time: answering and qualifying leads, sending follow-ups, booking meetings, preparing invoices and drafting content. The goal is fewer manual tasks and faster responses to customers.',
            },
            {
                q: 'Do you work with businesses outside New Jersey?',
                a: 'Yes. We are based in New Jersey and work with businesses across the United States. ' + HOW_WE_WORK_REMOTE,
            },
            {
                q: 'Which industries do you work with in New Jersey?',
                a: 'Mostly service businesses: beauty and barbershops, auto and home services, restaurants, health and wellness practices, retail and professional services such as insurance agencies and accounting firms.',
            },
        ],
        service_keywords: ['AI automation agency NJ', 'AI consulting New Jersey', 'Marketing automation New Jersey', 'Workflow automation NJ'],
    },
    {
        id: 'south-jersey',
        name: 'South Jersey',
        state: 'NJ',
        kind: 'Region',
        metaTitle: 'AI Automation in South Jersey: Cherry Hill, Marlton & Voorhees',
        metaDescription:
            'AI automation and marketing for South Jersey businesses in Cherry Hill, Marlton, Voorhees, Evesham, Medford, Haddon Township and Mount Laurel.',
        heroTitle: 'AI Automation for South Jersey Businesses',
        heroSub:
            'From Cherry Hill to Medford, we help South Jersey businesses automate follow-up, scheduling and marketing so they can grow without adding more admin work.',
        intro: [
            'South Jersey is full of owner-run businesses that live on referrals, phone calls and repeat customers. When the owner is busy doing the work, leads wait, messages go unanswered and invoices go out late. That is exactly the gap AI automation fills.',
            'We set up systems that reply to new leads in minutes, remind customers about appointments, ask happy clients for reviews and keep your Google and social profiles active. Everything is built around the tools you already use, and you always stay in control of what goes out.',
        ],
        towns: ['Cherry Hill', 'Marlton', 'Evesham Township', 'Voorhees Township', 'Medford', 'Haddon Township', 'Mount Laurel', 'Burlington County', 'Camden County'],
        serviceFocus: [
            { slug: 'ai-agents-chatbots', text: 'An AI assistant on your website and messages that answers questions and books appointments.' },
            { slug: 'digital-marketing-aeo', text: 'Local SEO and AI search visibility for searches like "near me" in South Jersey.' },
            { slug: 'web-design-development', text: 'Fast, mobile-first websites built to turn local searches into calls and bookings.' },
            { slug: 'smartflow-ai-growth-audit', text: 'A clear audit of where your business loses time and leads, with a step-by-step plan.' },
        ],
        faqs: [
            {
                q: 'Do you work with businesses in Cherry Hill, Marlton and Voorhees?',
                a: 'Yes. We work with businesses throughout South Jersey, including Cherry Hill, Marlton, Evesham, Voorhees, Medford, Haddon Township and Mount Laurel. ' + HOW_WE_WORK_REMOTE,
            },
            {
                q: 'What kind of business automation makes sense for a South Jersey small business?',
                a: 'The usual first wins are instant replies to new leads, automatic appointment reminders, review requests after each job, and a simple CRM so no customer falls through the cracks. We start with whatever costs you the most time today.',
            },
            {
                q: 'Can AI help my business show up in "near me" searches?',
                a: 'Yes, as part of local SEO. "Near me" results depend mostly on your Google Business Profile, your reviews and how clearly your website describes where you work. We optimize all three and keep them updated automatically.',
            },
            {
                q: 'Do I need to change the software I already use?',
                a: 'Usually not. We connect the email, calendar, CRM and booking tools you already have, and only suggest new tools when they clearly save time.',
            },
        ],
        service_keywords: ['AI automation South Jersey', 'Business automation Cherry Hill', 'AI marketing South Jersey', 'AI automation Marlton NJ'],
    },
    {
        id: 'bergen-county-nj',
        name: 'Bergen County',
        state: 'NJ',
        kind: 'County',
        metaTitle: 'AI Automation Agency in Bergen County, NJ',
        metaDescription:
            'AI automation agency serving Bergen County, NJ. AI agents, workflow automation and marketing for businesses in Hackensack, Paramus, Fort Lee and nearby.',
        heroTitle: 'AI Automation for Bergen County Businesses',
        heroSub:
            'Bergen County businesses compete side by side with New York City. We build AI agents and automations that help them answer faster, follow up every lead and run leaner.',
        intro: [
            'Customers in Bergen County expect New York speed: quick answers, easy online booking and fast follow-up. For a small team, keeping up with that by hand is exhausting.',
            'We automate the repetitive parts of your day, from lead intake and scheduling to invoicing and reporting, and add AI agents that can talk to customers on your website, by text or by phone. You get the responsiveness of a bigger company without hiring a bigger team.',
        ],
        towns: ['Hackensack', 'Paramus', 'Fort Lee', 'Englewood', 'Teaneck', 'Ridgewood', 'Fair Lawn', 'Mahwah'],
        serviceFocus: [
            { slug: 'ai-agents-chatbots', text: 'AI chat and voice agents that respond to customers instantly, day or night.' },
            { slug: 'executive-ai-admin-automation', text: 'Admin and accounting automation for busy offices and professional firms.' },
            { slug: 'smartflow-ai-growth-audit', text: 'A practical audit to find the automations with the best return for your business.' },
            { slug: 'digital-marketing-aeo', text: 'Visibility on Google and AI assistants when Bergen County customers search for you.' },
        ],
        faqs: [
            {
                q: 'Is there an AI automation agency that serves Bergen County, NJ?',
                a: 'Yes. Xtek AI is a New Jersey AI automation agency and works with businesses throughout Bergen County, including Hackensack, Paramus, Fort Lee, Englewood and Teaneck. ' + HOW_WE_WORK_REMOTE,
            },
            {
                q: 'What can an AI agent do for a Bergen County business?',
                a: 'It can answer common questions, qualify new leads, book appointments in your calendar, send reminders and hand the conversation to you when a person is needed. It works on your website, by text message and by phone.',
            },
            {
                q: 'How do you start a project?',
                a: 'With a SmartFlow AI Growth Audit. We look at how your business handles leads, scheduling, admin and marketing today, and give you a prioritized plan before anything is built.',
            },
        ],
        service_keywords: ['AI automation agency Bergen County', 'AI agents Bergen County NJ', 'Workflow automation Hackensack', 'AI consulting North Jersey'],
    },
    {
        id: 'hamilton-nj',
        name: 'Hamilton',
        state: 'NJ',
        kind: 'City',
        metaTitle: 'AI Automation for Hamilton, Trenton & Princeton, NJ',
        metaDescription:
            'AI automation for local businesses in Hamilton, Trenton, Princeton and Mercer County, NJ: AI agents, workflow automation, websites and marketing.',
        heroTitle: 'AI Automation for Hamilton & Mercer County Businesses',
        heroSub:
            'We help local businesses in Hamilton, Trenton, Princeton and the rest of Mercer County automate their busywork and get found online.',
        intro: [
            'Mercer County sits right between New York and Philadelphia, and local businesses here feel pressure from both sides. Owners in Hamilton and Trenton tell us the same thing: they are great at their trade, but the calls, messages, scheduling and paperwork never stop.',
            'We build practical automations for exactly that: AI that answers and books customers, reminders that cut no-shows, simple CRMs that track every lead, and websites that rank for local searches. We work in the area, so meeting in person is easy.',
        ],
        towns: ['Hamilton Township', 'Trenton', 'Princeton', 'West Windsor', 'East Windsor', 'Plainsboro', 'Lawrenceville', 'Robbinsville', 'Mercerville'],
        serviceFocus: [
            { slug: 'web-design-development', text: 'Websites for local businesses that load fast, look great on phones and turn visits into calls.' },
            { slug: 'ai-agents-chatbots', text: 'AI booking and chat agents so customers can schedule any time.' },
            { slug: 'digital-marketing-aeo', text: 'Local SEO for Hamilton, Trenton and Princeton searches, plus AI search visibility.' },
            { slug: 'content-creation', text: 'Social media content that keeps your business visible without taking your time.' },
        ],
        faqs: [
            {
                q: 'Do you offer in-person meetings in Hamilton, Trenton and Princeton?',
                a: 'Yes. Mercer County is close to home for us, so we regularly meet clients in person. We also work over video calls whenever that is easier for you.',
            },
            {
                q: 'What is AI automation for local businesses in Hamilton?',
                a: 'It means letting software handle repetitive tasks such as answering common questions, booking appointments, sending reminders and follow-ups, and posting on social media, so the owner and staff can focus on customers.',
            },
            {
                q: 'How long does a typical project take?',
                a: 'It depends on scope. A focused automation can be live in a few weeks; a full system with a website, AI agent and CRM takes longer. You get a clear timeline after the initial audit.',
            },
        ],
        service_keywords: ['AI automation Hamilton NJ', 'Business automation Trenton NJ', 'AI agency Princeton', 'Web design Mercer County'],
    },
    {
        id: 'manhattan-ny',
        name: 'New York City',
        state: 'NY',
        kind: 'City',
        metaTitle: 'AI Automation Agency for New York City Small Businesses',
        metaDescription:
            'AI automation agency for New York City small businesses: AI agents, workflow and marketing automation for companies in Manhattan, Brooklyn and Queens.',
        heroTitle: 'AI Automation for New York City Small Businesses',
        heroSub:
            'We help small and mid-sized businesses in Manhattan, Brooklyn and Queens automate lead follow-up, scheduling and marketing with practical AI systems.',
        intro: [
            'In New York City, the business that answers first usually wins. Small teams cannot be on the phone, in the inbox and on social media all day, which is where AI agents and automation make the biggest difference.',
            'We design custom automations and AI agents around how your business already works, connecting your CRM, calendar, email and marketing tools. We are a short drive away in New Jersey and work with NYC clients over video calls and in person.',
        ],
        towns: ['Manhattan', 'Brooklyn', 'Queens', 'Staten Island', 'The Bronx', 'Long Island'],
        serviceFocus: [
            { slug: 'ai-agents-chatbots', text: 'Custom AI agents for sales, support and scheduling.' },
            { slug: 'executive-ai-admin-automation', text: 'Business process automation for reporting, invoicing and admin.' },
            { slug: 'digital-marketing-aeo', text: 'Marketing automation and AI search visibility in a crowded market.' },
            { slug: 'smartflow-ai-growth-audit', text: 'An audit that shows where AI will save the most time before you invest.' },
        ],
        faqs: [
            {
                q: 'Do you work with small businesses in New York City?',
                a: 'Yes. We work with small and mid-sized businesses in Manhattan, Brooklyn, Queens and the rest of the city, mostly over video calls and in person when needed.',
            },
            {
                q: 'Can you build a custom AI agent for my NYC business?',
                a: 'Yes. We build AI agents that answer customers, qualify leads, book meetings and update your CRM, trained on your own services, policies and tone.',
            },
            {
                q: 'What is the difference between marketing automation and AI automation?',
                a: 'Marketing automation sends the right message at the right time (follow-ups, newsletters, reminders). AI automation adds judgment: understanding messages, writing replies and making simple decisions. We usually combine both.',
            },
        ],
        service_keywords: ['AI automation agency New York', 'AI agency NYC', 'Marketing automation agency New York', 'Custom AI agent development NYC'],
    },
    {
        id: 'philadelphia-pa',
        name: 'Philadelphia',
        state: 'PA',
        kind: 'City',
        metaTitle: 'AI Automation Agency in Philadelphia, PA',
        metaDescription:
            'AI automation agency serving Philadelphia businesses: AI agents, workflow automation, AI SEO and marketing for Philly and the surrounding area.',
        heroTitle: 'AI Automation for Philadelphia Businesses',
        heroSub:
            'Just across the river in New Jersey, we help Philadelphia businesses automate their operations and show up in Google and AI search.',
        intro: [
            'Philadelphia has a deep base of local service businesses, practices and professional firms, many of them growing faster than their back office. When leads, messages and admin work pile up, customers notice.',
            'We build AI agents, workflow automations and marketing systems that take that load off your team. Because we are minutes away in South Jersey, Philadelphia clients get the convenience of a local partner, in person or over video.',
        ],
        towns: ['Center City', 'Old City', 'Fishtown', 'University City', 'South Philadelphia', 'Northern Liberties', 'King of Prussia'],
        serviceFocus: [
            { slug: 'smartflow-ai-growth-audit', text: 'An AI strategy audit that maps your processes and shows where to start.' },
            { slug: 'digital-marketing-aeo', text: 'AI SEO: visibility on Google and in AI assistants for Philadelphia searches.' },
            { slug: 'ai-agents-chatbots', text: 'AI agents that respond to leads and book appointments around the clock.' },
            { slug: 'executive-ai-admin-automation', text: 'Automated reporting, invoicing and admin for busy offices.' },
        ],
        faqs: [
            {
                q: 'Do you work with businesses in Philadelphia?',
                a: 'Yes. We are based in New Jersey, close to Philadelphia, and work with businesses across the city and its suburbs. ' + HOW_WE_WORK_REMOTE,
            },
            {
                q: 'What is AI SEO?',
                a: 'AI SEO (also called AEO) means structuring your website and content so that search engines and AI assistants like ChatGPT, Gemini and Perplexity can understand it and recommend your business when people ask for a provider in Philadelphia.',
            },
            {
                q: 'Can you help us build an AI strategy?',
                a: 'Yes. Our SmartFlow AI Growth Audit reviews your operations and gives you a prioritized AI strategy: what to automate first, what tools to use and what results to measure.',
            },
        ],
        service_keywords: ['AI automation agency Philadelphia', 'AI SEO Philadelphia', 'AI strategy Philadelphia', 'Business automation PA'],
    },
];

export const getServiceArea = (id: string) => serviceAreas.find((a) => a.id === id);
