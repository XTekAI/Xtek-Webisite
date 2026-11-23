/**
 * Specific automations (/solutions/<slug>). Industry pages link their "What we automate" cards here, so each
 * card opens a page about exactly what it promises. Each solution names the main service it belongs to.
 * No invented figures, no client names, no compliance promises.
 */
export interface Solution {
    slug: string;
    name: string;
    short: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSub: string;
    intro: string[];
    includes: string[];
    steps: { title: string; text: string }[];
    worksWith: string[];
    parent: { label: string; href: string; text: string };
    product?: { label: string; href: string; text: string };
    faqs: { q: string; a: string }[];
    keywords: string[];
}

export const solutions: Solution[] = [
    {
        slug: 'ai-receptionist',
        name: 'AI Receptionist for Calls, Texts & DMs',
        short: 'AI receptionist',
        metaTitle: 'AI Receptionist for Calls, Texts & DMs',
        metaDescription:
            'An AI receptionist that answers calls, texts, website chat and social DMs 24/7, books appointments and hands real conversations to your team.',
        heroTitle: 'An AI Receptionist That Answers Every Call, Text and DM',
        heroSub:
            'Never miss a customer because everyone is busy. Your AI receptionist answers in your business’s voice, books appointments and passes anything important to you.',
        intro: [
            'Most small businesses lose customers in the first minute: the phone rings while everyone is working, a DM sits unread, a website visitor leaves without an answer. The next business on the list picks up.',
            'An AI receptionist answers every channel at once, day and night. It knows your services, hours, prices you choose to share and policies, books or requests appointments, takes detailed messages and alerts you instantly when a person needs to step in.',
        ],
        includes: [
            'Answers phone calls with a natural voice, and texts, website chat, Instagram and Facebook messages',
            'Trained on your services, hours, policies and tone of voice',
            'Books, moves or requests appointments in your calendar or booking system',
            'Separates urgent requests from routine ones and alerts the right person',
            'Sends you a short summary of every conversation',
            'Hands the conversation to a human whenever the customer asks or the topic needs it',
        ],
        steps: [
            { title: 'Learn your business', text: 'We collect your services, FAQs, policies and the way you like to talk to customers.' },
            { title: 'Connect your channels', text: 'Phone line, website chat and social inboxes are connected to the assistant.' },
            { title: 'Test with real scenarios', text: 'We run common and tricky conversations until the answers sound right to you.' },
            { title: 'Go live and improve', text: 'We review conversations in the first weeks and keep refining the instructions.' },
        ],
        worksWith: ['Your business phone number', 'Website chat', 'Instagram & Facebook messages', 'SMS', 'Google Calendar and common booking tools'],
        parent: { label: 'AI Agents & Chatbots', href: '/services/ai-agents-chatbots', text: 'The AI receptionist is part of our AI Agents & Chatbots service.' },
        faqs: [
            { q: 'Does an AI receptionist replace my staff?', a: 'No. It takes the repetitive questions and after-hours messages off their plate, so your team spends time with customers in front of them.' },
            { q: 'Will customers know they are talking to AI?', a: 'We recommend being transparent. The assistant can introduce itself as your virtual assistant and transfer to a person whenever needed.' },
            { q: 'What happens with questions it cannot answer?', a: 'It takes a detailed message, tells the customer when to expect an answer and notifies you right away.' },
        ],
        keywords: ['AI receptionist', 'AI phone answering for small business', 'AI DM assistant', '24/7 answering service AI'],
    },
    {
        slug: 'online-booking-reminders',
        name: 'Online Booking, Deposits & Reminders',
        short: 'Online booking',
        metaTitle: 'Online Booking with Deposits & Appointment Reminders',
        metaDescription:
            'Online booking for your business with deposits, confirmations, reminders and easy rescheduling, so fewer appointments are missed.',
        heroTitle: 'Online Booking with Deposits and Reminders That Cut No-Shows',
        heroSub:
            'Let customers book themselves any time, pay a deposit when it makes sense and get reminders that keep your schedule full.',
        intro: [
            'Booking by phone and DM means back-and-forth, double bookings and no record of who confirmed. No-shows hurt even more when the slot was blocked for a long service.',
            'We set up online booking on your website and social profiles, organized by staff member and service, with optional deposits, automatic confirmations, reminders before the appointment and one-tap rescheduling. Your cancellation policy is applied the same way every time.',
        ],
        includes: [
            'Booking page or widget on your website, Google profile and social bios',
            'Services, durations and schedules per staff member',
            'Optional deposits or prepayment through a secure payment link',
            'Confirmation and reminder messages by text and email',
            'Easy reschedule and cancel links that follow your policy',
            'A clear daily schedule for your team',
        ],
        steps: [
            { title: 'Define services and rules', text: 'Services, durations, staff, deposits and cancellation policy.' },
            { title: 'Set up booking', text: 'We configure your booking tool or build a booking flow on your website.' },
            { title: 'Turn on messages', text: 'Confirmations, reminders and reschedule links in your business’s voice.' },
            { title: 'Launch and adjust', text: 'We watch the first weeks and adjust timing and wording.' },
        ],
        worksWith: ['Your website', 'Google Business Profile booking links', 'Instagram & Facebook', 'Common booking platforms', 'Payment links'],
        parent: { label: 'Web Design & Development', href: '/services/web-design-development', text: 'Online booking is built as part of our Web Design & Development service.' },
        faqs: [
            { q: 'Can I keep my current booking app?', a: 'Often, yes. We connect to many common platforms; when that is not possible, we build booking into your website.' },
            { q: 'Can customers pay a deposit when they book?', a: 'Yes. Deposits or prepayment can be required for specific services, with your cancellation policy shown before they confirm.' },
            { q: 'How do reminders reduce no-shows?', a: 'Customers get a confirmation and reminders with an easy way to reschedule, so cancellations happen early enough to fill the slot.' },
        ],
        keywords: ['Online booking with deposits', 'Appointment reminder automation', 'Reduce no-shows', 'Booking system for small business'],
    },
    {
        slug: 'follow-up-reminders',
        name: 'Follow-Up, Recall & Service Reminders',
        short: 'Follow-up & reminders',
        metaTitle: 'Automated Customer Follow-Up, Recall & Service Reminders',
        metaDescription:
            'Aftercare messages, recall for check-ups, maintenance and seasonal reminders that bring customers back at the right time, automatically.',
        heroTitle: 'Follow-Up and Reminders That Bring Customers Back',
        heroSub:
            'Aftercare, check-up recall, maintenance and seasonal reminders sent at the right moment, so repeat business doesn’t depend on anyone remembering.',
        intro: [
            'Most repeat business is lost quietly. Customers mean to come back for their next service, check-up or maintenance, but life gets busy and nobody reminds them.',
            'We automate the messages that happen after the visit: aftercare instructions, a check-in a few days later, recall when a check-up or service is due, seasonal offers to past customers and maintenance reminders. Each message goes out at the right time, sounds like your business and includes an easy way to book.',
        ],
        includes: [
            'Aftercare or thank-you messages right after the visit or job',
            'Check-ins a few days later (healing photos, satisfaction, questions)',
            'Recall when a check-up, exam, cleaning or service is due',
            'Seasonal campaigns to past customers (sealing season, winter prep and similar)',
            'Maintenance and reorder reminders',
            'Easy booking links in every message and automatic stop when the customer books',
        ],
        steps: [
            { title: 'Map the customer timeline', text: 'We define what should happen after each type of visit or job, and when.' },
            { title: 'Write the messages', text: 'Short, friendly texts and emails in your voice, in English or Spanish.' },
            { title: 'Connect your records', text: 'Visits or jobs come from your booking tool, CRM or a simple form your team uses.' },
            { title: 'Launch and measure', text: 'We watch replies and bookings and adjust timing and wording.' },
        ],
        worksWith: ['Booking and scheduling tools', 'Your CRM or customer list', 'Email and SMS', 'Google Sheets or simple forms'],
        parent: { label: 'Executive AI: Admin Automation', href: '/services/executive-ai-admin-automation', text: 'Follow-up and reminder sequences are part of our admin and workflow automation service.' },
        faqs: [
            { q: 'Will customers feel spammed?', a: 'No, because messages are few, timely and relevant to their own visit, and they stop as soon as the customer books or replies.' },
            { q: 'Can messages go out in Spanish?', a: 'Yes. Each customer can receive messages in their preferred language.' },
            { q: 'Does this work for health practices?', a: 'Yes, for reminders and recall. We keep patient health information only in tools approved for it and keep messages general.' },
        ],
        keywords: ['Customer follow-up automation', 'Recall reminders', 'Service reminder automation', 'Aftercare messages'],
    },
    {
        slug: 'reviews-reputation',
        name: 'Review Requests & Reputation',
        short: 'Reviews & reputation',
        metaTitle: 'Automated Google Review Requests & Reputation Management',
        metaDescription:
            'Automatic review requests after every visit, alerts for unhappy customers and help replying to reviews, so your Google profile reflects your real work.',
        heroTitle: 'More Google Reviews Without Asking Every Customer by Hand',
        heroSub:
            'Reviews drive local search and trust. We ask every happy customer at the right moment and alert you when someone needs attention.',
        intro: [
            'Customers check reviews before they call, and Google uses them to decide who shows up in "near me" results. Most happy customers would leave a review, but only if someone asks at the right time.',
            'We send a short, friendly review request after each visit or job with a direct link to your Google profile. Customers who report a problem are routed to you privately so you can make it right, and we help you reply to reviews quickly and professionally.',
        ],
        includes: [
            'Review request by text or email after each visit or completed job',
            'Direct link to your Google review page (and other platforms you choose)',
            'Private alert when a customer reports a problem',
            'Suggested replies to new reviews for you to approve',
            'Consistent timing so reviews arrive steadily, month after month',
        ],
        steps: [
            { title: 'Pick the moment', text: 'We choose when to ask, for example the day after the service.' },
            { title: 'Connect your visits', text: 'Completed visits or jobs trigger the request automatically.' },
            { title: 'Write the message', text: 'Short, personal and in your voice.' },
            { title: 'Monitor and reply', text: 'New reviews and alerts reach you with suggested replies.' },
        ],
        worksWith: ['Google Business Profile', 'Booking and job tools', 'Email and SMS'],
        parent: { label: 'Digital Marketing & AEO', href: '/services/digital-marketing-aeo', text: 'Review automation is part of our Digital Marketing & AEO service, together with local SEO.' },
        faqs: [
            { q: 'Is it allowed to ask customers for reviews?', a: 'Yes. Google allows asking customers for reviews. What is not allowed is buying reviews or offering rewards for them, and we never do that.' },
            { q: 'Can you filter out unhappy customers?', a: 'We invite every customer to review, and also give unhappy customers a direct way to reach you so you can solve the problem.' },
            { q: 'Do reviews really help local rankings?', a: 'Reviews are one of the signals Google uses for local results, together with relevance and distance, and they strongly influence whether customers call.' },
        ],
        keywords: ['Google review automation', 'Review request texts', 'Reputation management small business', 'Get more Google reviews'],
    },
    {
        slug: 'loyalty-rebooking',
        name: 'Loyalty Programs & Rebooking',
        short: 'Loyalty & rebooking',
        metaTitle: 'Digital Loyalty Cards & Automatic Rebooking',
        metaDescription:
            'Digital loyalty cards in Apple Wallet and Google Wallet with MyLoyalink, plus rebooking reminders that bring regulars back on schedule.',
        heroTitle: 'Loyalty Cards and Rebooking That Keep Regulars Coming Back',
        heroSub:
            'Reward repeat customers with a digital loyalty card they keep in their phone wallet, and remind them when it is time to book again.',
        intro: [
            'Regular customers are the heart of a barbershop, salon, studio or café, but paper punch cards get lost and regulars drift away when nobody reminds them it is time to come back.',
            'We set up MyLoyalink, our own loyalty app, so customers save a stamp card in Apple Wallet or Google Wallet without downloading an app, and we connect rebooking reminders that go out when each client is due for their next visit.',
        ],
        includes: [
            'Digital stamp card in Apple Wallet and Google Wallet, no app download',
            'Rewards you define, for example a free service after a number of visits',
            'Rebooking reminders based on each client’s usual visit rhythm',
            'Easy booking link in every reminder',
            'Optional birthday or special-date messages',
        ],
        steps: [
            { title: 'Design your program', text: 'We define stamps, rewards and how customers join.' },
            { title: 'Set up MyLoyalink', text: 'Your branded card is created and ready to share by QR code or link.' },
            { title: 'Connect rebooking', text: 'Reminders are linked to visits and your booking page.' },
            { title: 'Launch in the shop', text: 'Counter QR codes and messages invite customers to join.' },
        ],
        worksWith: ['Apple Wallet', 'Google Wallet', 'Your booking page', 'SMS and email'],
        parent: { label: 'Digital Products', href: '/products', text: 'Loyalty runs on MyLoyalink, one of our Digital Products.' },
        product: { label: 'MyLoyalink', href: 'https://www.myloyalink.com/en', text: 'See MyLoyalink, our digital loyalty card app.' },
        faqs: [
            { q: 'Do customers need to download an app?', a: 'No. The loyalty card is saved directly in Apple Wallet or Google Wallet.' },
            { q: 'Can I choose the rewards?', a: 'Yes. You decide how many stamps a reward takes and what the reward is.' },
            { q: 'How do rebooking reminders know when to send?', a: 'They follow each client’s usual time between visits, or a schedule you choose per service.' },
        ],
        keywords: ['Digital loyalty card', 'Loyalty program for barbershops', 'Apple Wallet loyalty card', 'Rebooking reminders'],
    },
    {
        slug: 'lead-response-follow-up',
        name: 'Instant Lead Response & Proposal Follow-Up',
        short: 'Lead response & follow-up',
        metaTitle: 'Instant Lead Response & Proposal Follow-Up Automation',
        metaDescription:
            'Respond to every lead in minutes, qualify the project, book the estimate and follow up on proposals automatically until the customer decides.',
        heroTitle: 'Answer Every Lead in Minutes and Follow Up Until They Decide',
        heroSub:
            'The first business to respond usually wins the job. We make sure that is you, and that no proposal is forgotten after you send it.',
        intro: [
            'Leads arrive from your website, Google, social media and lead platforms at all hours. When the reply comes the next day, the customer has already talked to someone else. And after an estimate goes out, follow-up is usually the first thing to slip.',
            'We connect every lead source to one system that replies within minutes, asks the key questions, collects photos or details, books the estimate or call, and then follows up on your proposal with short, personal messages until the customer says yes, no or not now.',
        ],
        includes: [
            'Instant replies to web forms, calls, social messages and lead platforms',
            'Qualifying questions and photo collection',
            'Estimate or call booking in your calendar',
            'Proposal follow-up sequence that stops when the customer replies',
            'All leads in one CRM with clear stages',
            'Daily summary of new and pending leads',
        ],
        steps: [
            { title: 'Map your lead sources', text: 'Website, phone, Google, social and platforms like Angi or Thumbtack.' },
            { title: 'Define the questions', text: 'What you need to know to quote or schedule.' },
            { title: 'Build the follow-up', text: 'Messages after estimates, timed and written in your voice.' },
            { title: 'Launch and review', text: 'We check response times and conversions and refine the flow.' },
        ],
        worksWith: ['Website forms', 'Phone and SMS', 'Facebook & Instagram', 'Lead platforms by email', 'Your CRM or a new simple one'],
        parent: { label: 'AI Agents & Chatbots', href: '/services/ai-agents-chatbots', text: 'Lead response is powered by our AI Agents & Chatbots service.' },
        faqs: [
            { q: 'How fast is "instant"?', a: 'Within minutes, at any hour. The customer gets a reply and next steps while you get a summary.' },
            { q: 'Will follow-up messages annoy customers?', a: 'They are short, spaced out and stop as soon as the customer replies, books or declines.' },
            { q: 'Can leads from Angi or Thumbtack go into the same system?', a: 'In most cases, yes, through email notifications or direct connections.' },
        ],
        keywords: ['Lead response automation', 'Speed to lead', 'Proposal follow-up', 'Contractor lead follow-up'],
    },
    {
        slug: 'quotes-estimates',
        name: 'Instant Quotes & Estimate Intake',
        short: 'Quotes & estimates',
        metaTitle: 'Instant Quote Assistant & Estimate Intake Automation',
        metaDescription:
            'An assistant and smart forms that collect job details and photos, give quotes from your own pricing rules and book estimate visits.',
        heroTitle: 'Quotes in Minutes, Estimate Visits Booked Automatically',
        heroSub:
            'Stop collecting the same details by phone. Customers describe the job, send photos and get a quote or an estimate visit, based on your own pricing rules.',
        intro: [
            'Every quote request starts with the same questions: address, size, type of work, timing, photos. Collecting that by phone and text takes time, and slow quotes lose jobs.',
            'We build a quote assistant and smart forms that ask exactly what you need, apply your pricing rules for standard jobs, flag the jobs that need a site visit and book that visit on the right calendar. You get a complete brief instead of a voicemail.',
        ],
        includes: [
            'Smart quote form and chat assistant on your website and social profiles',
            'Questions tailored to your services (size, rooms, surface, frequency, add-ons)',
            'Photo and address collection',
            'Quotes from your pricing rules for standard jobs',
            'Estimate visit booking for custom jobs',
            'A clear summary of every request',
        ],
        steps: [
            { title: 'Write down your pricing rules', text: 'We turn how you price jobs into clear rules, and decide which jobs need a visit.' },
            { title: 'Build the intake', text: 'Form and assistant ask only what is needed for your services.' },
            { title: 'Connect your calendar', text: 'Estimate visits land on the right person’s schedule.' },
            { title: 'Launch and refine', text: 'We review real requests and fine-tune questions and prices.' },
        ],
        worksWith: ['Your website', 'Facebook & Instagram', 'Google Calendar', 'Email and SMS', 'Your CRM'],
        parent: { label: 'AI Agents & Chatbots', href: '/services/ai-agents-chatbots', text: 'The quote assistant is part of our AI Agents & Chatbots service.' },
        faqs: [
            { q: 'Will the quotes be accurate?', a: 'They follow the pricing rules you approve. Jobs outside those rules are flagged for a visit or a custom quote.' },
            { q: 'Can customers send photos?', a: 'Yes. Photos are collected with the request and attached to the summary you receive.' },
            { q: 'What if I prefer to quote everything myself?', a: 'Then the assistant only collects the details and books the visit, and you send the quote.' },
        ],
        keywords: ['Instant quote assistant', 'Estimate request automation', 'Cleaning quote automation', 'Paving estimate booking'],
    },
    {
        slug: 'scheduling-status-updates',
        name: 'Scheduling, Dispatch & Status Updates',
        short: 'Scheduling & status updates',
        metaTitle: 'Job Scheduling, Dispatch & Automatic Customer Status Updates',
        metaDescription:
            'Put jobs on the right calendar, notify crews, and send customers automatic updates: confirmed, on the way, ready for pickup, rescheduled.',
        heroTitle: 'Scheduling and Status Updates Without the Phone Tag',
        heroSub:
            'Jobs go to the right person, and customers always know what is happening: confirmed, on the way, ready, or moved because of the weather.',
        intro: [
            'A big share of calls to a service business are status questions: “Is my car ready?”, “When will the plumber arrive?”, “Are we still on for tomorrow if it rains?”. Each one interrupts someone who is working.',
            'We connect your schedule to automatic messages. When a job is booked, assigned, started, delayed, ready or completed, the customer is notified, and your crew gets the details they need. Rescheduling many customers at once, for example on a rain day, takes a click instead of an afternoon of calls.',
        ],
        includes: [
            'Jobs and appointments on each crew or technician’s calendar',
            'Crew notifications with address and job details',
            'Customer updates: confirmed, on the way, ready, completed',
            'Approval requests for estimates or extra work',
            'Bulk rescheduling messages for weather or delays',
            'Pickup and order-ready notifications',
        ],
        steps: [
            { title: 'Map your job stages', text: 'From booked to completed: which updates matter to your customers.' },
            { title: 'Connect your schedule', text: 'Your calendar, dispatch or shop software triggers the messages.' },
            { title: 'Write the updates', text: 'Short texts and emails in your voice and the customer’s language.' },
            { title: 'Launch and adjust', text: 'We watch the first weeks and tune timing and wording.' },
        ],
        worksWith: ['Google Calendar', 'Common field service and shop management tools', 'SMS and email', 'Simple forms for your crew'],
        parent: { label: 'Executive AI: Admin Automation', href: '/services/executive-ai-admin-automation', text: 'Scheduling and status automation is part of our admin and workflow automation service.' },
        faqs: [
            { q: 'Do I need new dispatch software?', a: 'Not necessarily. We connect to many existing tools, or use shared calendars and simple forms your crew already understands.' },
            { q: 'Can I reschedule many customers at once?', a: 'Yes. Mark the affected day or jobs and customers receive a message with the new time or a link to choose one.' },
            { q: 'Can customers approve extra work by text?', a: 'Yes. They can receive the estimate and approve or decline it from their phone.' },
        ],
        keywords: ['Job status updates for customers', 'Dispatch automation', 'Crew scheduling automation', 'Order ready notifications'],
    },
    {
        slug: 'digital-intake-forms',
        name: 'Digital Intake & Onboarding Forms',
        short: 'Digital intake forms',
        metaTitle: 'Digital Intake & New Client Onboarding Forms',
        metaDescription:
            'Online intake and onboarding forms completed before the first visit, sent automatically after booking, so check-in is faster and nothing is missing.',
        heroTitle: 'Digital Intake Forms Completed Before the First Visit',
        heroSub:
            'Replace clipboards and back-and-forth emails with online forms sent automatically after booking, so you start every first visit with complete information.',
        intro: [
            'Paper forms slow down every new client and patient: handwriting to decode, missing answers and data typed in twice. For service businesses, onboarding details often arrive scattered across emails and texts.',
            'We build online intake and onboarding forms that are sent automatically after booking, work on any phone, save answers in the right place and remind people who have not finished. For health practices, forms are set up only in tools approved for patient information.',
        ],
        includes: [
            'Mobile-friendly forms in your branding, in English and Spanish',
            'Automatic sending after booking, with reminders until completed',
            'Signatures and consent checkboxes where needed',
            'File and photo uploads',
            'Answers saved to your system or a secure folder',
        ],
        steps: [
            { title: 'Review your current forms', text: 'We decide what to ask, what to drop and where answers should go.' },
            { title: 'Build the forms', text: 'Clean, mobile-first forms in your branding.' },
            { title: 'Automate sending', text: 'Forms go out after booking and reminders follow until they are done.' },
            { title: 'Launch and refine', text: 'We review completion and adjust questions.' },
        ],
        worksWith: ['Your booking system', 'Email and SMS', 'Approved form and storage tools', 'Google Drive or your practice software when allowed'],
        parent: { label: 'Web Design & Development', href: '/services/web-design-development', text: 'Intake forms are built as part of our Web Design & Development service.' },
        faqs: [
            { q: 'Can patients fill out forms on their phone?', a: 'Yes. Forms are designed for phones first and work on any device.' },
            { q: 'Where are the answers stored?', a: 'In the system you choose. For health practices, only in tools approved for patient information.' },
            { q: 'Can forms include signatures and consent?', a: 'Yes, signatures and consent checkboxes can be added where your process needs them.' },
        ],
        keywords: ['Digital intake forms', 'New patient forms online', 'Client onboarding forms', 'Online consent forms'],
    },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
