/**
 * Industry landing pages (/industries/<slug>). Copy must stay unique per industry, contain no invented
 * figures and no client names, and never promise regulatory compliance (e.g. HIPAA) for health practices.
 */
export interface Industry {
    slug: string;
    name: string;
    /** Short label for cards and pills. */
    short: string;
    /** schema.org BusinessAudience audienceType. */
    audience: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSub: string;
    intro: string[];
    painPoints: string[];
    /** Each card opens the page about exactly that: a /solutions page or a main /services page. */
    solutions: { title: string; text: string; href: string }[];
    steps: { title: string; text: string }[];
    faqs: { q: string; a: string }[];
    keywords: string[];
}

const AUDIT_STEP = { title: 'Audit', text: 'We map how your business handles calls, messages, bookings, payments and marketing today, and find where time and customers are lost.' };
const LIVE_STEP = { title: 'Launch and support', text: 'We launch, watch the first weeks closely, fix anything that feels off and keep improving the system with you.' };

export const industries: Industry[] = [
    {
        slug: 'tattoo-studios',
        name: 'Tattoo & Piercing Studios',
        short: 'Tattoo studios',
        audience: 'Tattoo and piercing studios',
        metaTitle: 'AI Automation for Tattoo & Piercing Studios',
        metaDescription:
            'Booking, deposits, consultation forms and follow-up on autopilot for tattoo and piercing studios. AI agents that answer DMs and calls while you tattoo.',
        heroTitle: 'AI Automation for Tattoo & Piercing Studios',
        heroSub:
            'Your artists should be tattooing, not answering the same DM fifty times a day. We automate inquiries, bookings, deposits and aftercare so the studio runs while the needles do.',
        intro: [
            'Tattoo studios live in Instagram DMs, phone calls and walk-ins. Every inquiry needs the same answers: price ranges, availability, which artist, how deposits work, what to bring. When the team is busy, those messages pile up and serious clients book somewhere else.',
            'We build systems that answer those questions instantly in your studio’s voice, collect reference photos and placement details, book consultations with the right artist, take deposits and send aftercare instructions automatically. Your artists see a clean schedule and a full brief before the client walks in.',
        ],
        painPoints: [
            'DMs and comments go unanswered for hours while artists are working',
            'Clients ask the same questions about pricing, deposits and availability',
            'No-shows and last-minute cancellations leave expensive gaps in the book',
            'Reference images, sizes and placements arrive scattered across apps',
            'Healed-photo and review requests depend on someone remembering',
        ],
        solutions: [
            { title: 'AI agent for DMs and calls', text: 'Answers Instagram, Facebook, website chat and phone inquiries 24/7, qualifies the idea and books the consultation.', href: '/solutions/ai-receptionist' },
            { title: 'Booking with deposits', text: 'Online booking per artist with deposit collection, reminders and a clear cancellation policy built in.', href: '/solutions/online-booking-reminders' },
            { title: 'Aftercare follow-up', text: 'Aftercare instructions right after the session, a check-in during healing and a request for a healed photo.', href: '/solutions/follow-up-reminders' },
            { title: 'Social content on autopilot', text: 'Turn finished work into scheduled posts and stories so the portfolio keeps growing without extra hours.', href: '/services/content-creation' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Set up your studio rules', text: 'Artists, styles, pricing ranges, deposit and cancellation policies: the AI learns exactly how your studio works.' },
            { title: 'Connect your channels', text: 'Instagram, Facebook, your website and phone line are connected to one booking system and one inbox.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can an AI agent answer tattoo inquiries without sounding robotic?', a: 'Yes. It is trained on your studio’s tone, artists and policies, answers common questions naturally and hands the conversation to a person when a client needs a custom quote or a real conversation with the artist.' },
            { q: 'Can clients pay a deposit when they book?', a: 'Yes. Booking can require a deposit through a payment link or your booking platform, with reminders before the appointment and your cancellation policy applied automatically.' },
            { q: 'Does this work for walk-in studios?', a: 'Yes. Walk-in shops use the same system for questions, waitlists and follow-up, while appointments stay optional.' },
        ],
        keywords: ['Tattoo studio booking automation', 'AI for tattoo shops', 'Tattoo deposit automation', 'Piercing studio scheduling'],
    },
    {
        slug: 'barbershops-salons',
        name: 'Barbershops & Beauty Salons',
        short: 'Barbershops & salons',
        audience: 'Barbershops, hair salons and beauty salons',
        metaTitle: 'AI Automation for Barbershops & Beauty Salons',
        metaDescription:
            'Online booking, AI receptionist, no-show reminders, loyalty and review requests for barbershops and beauty salons. More chair time, less phone time.',
        heroTitle: 'AI Automation for Barbershops & Beauty Salons',
        heroSub:
            'Keep every chair busy without living on the phone. We build booking, reminders, loyalty and marketing systems that run in the background of your shop or salon.',
        intro: [
            'In a barbershop or salon, the phone rings while you have clippers or color in your hands. Missed calls become missed appointments, and no-shows quietly eat the week’s revenue.',
            'We set up online booking per barber or stylist, an AI receptionist that answers calls and messages, reminders that cut no-shows, and simple loyalty and rebooking messages that bring clients back on schedule. Everything works with the booking tools you already use or a custom system built for your shop.',
        ],
        painPoints: [
            'Calls and messages come in while everyone is with a client',
            'No-shows and late cancellations leave empty chairs',
            'Regulars forget to rebook until they are overdue',
            'Reviews and social posts depend on whoever has time that day',
            'Walk-ins and appointments are hard to balance',
        ],
        solutions: [
            { title: 'AI receptionist', text: 'Answers calls and texts, shares prices and availability, and books, moves or cancels appointments 24/7.', href: '/solutions/ai-receptionist' },
            { title: 'Booking and reminders', text: 'Online booking per barber or stylist with confirmations, reminders and easy rescheduling links.', href: '/solutions/online-booking-reminders' },
            { title: 'Rebooking and loyalty', text: 'A digital loyalty card in Apple Wallet or Google Wallet (MyLoyalink) plus reminders when a client is due for their next visit.', href: '/solutions/loyalty-rebooking' },
            { title: 'Review requests', text: 'Automatic review requests after each visit, with a direct link to your Google profile.', href: '/solutions/reviews-reputation' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Set up services and staff', text: 'Services, durations, prices and each barber or stylist’s schedule are loaded into one booking system.' },
            { title: 'Turn on the assistant', text: 'The AI receptionist goes live on your phone line, website and social media, with reminders and rebooking messages.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can I keep the booking app I already use?', a: 'Usually, yes. We connect to many common booking platforms, and when that is not possible we build a booking flow on your own website.' },
            { q: 'Will an AI receptionist confuse my regular clients?', a: 'It is set up to sound like your shop, knows your services and staff, and passes anything unusual to you. Most clients simply see faster answers.' },
            { q: 'How do reminders reduce no-shows?', a: 'Clients get a confirmation when they book and reminders before the appointment with a one-tap link to reschedule, so cancellations happen early enough to refill the slot.' },
        ],
        keywords: ['Barbershop booking automation', 'AI receptionist for salons', 'Salon no-show reminders', 'Barbershop marketing'],
    },
    {
        slug: 'auto-repair-shops',
        name: 'Auto Repair Shops',
        short: 'Auto repair shops',
        audience: 'Auto repair shops and mechanics',
        metaTitle: 'AI Automation for Auto Repair Shops',
        metaDescription:
            'AI phone answering, appointment booking, repair status updates and service reminders for auto repair shops. Fewer interruptions in the bay, more booked jobs.',
        heroTitle: 'AI Automation for Auto Repair Shops',
        heroSub:
            'Your techs should be under the hood, not on hold. We automate calls, bookings, status updates and service reminders so the front desk keeps up with the shop floor.',
        intro: [
            'Auto repair shops lose time to the same calls every day: “Can you look at my car today?”, “Is it ready?”, “How much for brakes?”. Each one pulls someone away from a car, and every missed call can be a job that goes to the shop down the street.',
            'We build an AI assistant that answers those calls and messages, books drop-offs, collects the vehicle and symptom details, and sends customers status updates and pickup notices. After the visit, reminders for oil changes and inspections bring customers back at the right time.',
        ],
        painPoints: [
            'Phones ring constantly while the team is in the bays',
            'Customers call repeatedly to ask if their car is ready',
            'Estimates and approvals get delayed by phone tag',
            'Customers forget routine maintenance until something breaks',
            'Online reviews do not reflect how good the work really is',
        ],
        solutions: [
            { title: 'AI phone and chat assistant', text: 'Answers common questions, books drop-offs and collects make, model and symptoms before the car arrives.', href: '/solutions/ai-receptionist' },
            { title: 'Status updates and approvals', text: 'Automatic texts when the car is checked in, when an estimate needs approval and when it is ready for pickup.', href: '/solutions/scheduling-status-updates' },
            { title: 'Service reminders', text: 'Oil change, inspection and seasonal reminders that bring customers back without anyone calling them.', href: '/solutions/follow-up-reminders' },
            { title: 'Website that books jobs', text: 'A fast, mobile-first site with services, online booking and tools customers actually use.', href: '/services/web-design-development' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Map your shop workflow', text: 'From first call to pickup: we define every message, who approves estimates and how status changes are triggered.' },
            { title: 'Connect phone, site and shop tools', text: 'The assistant connects to your phone line, website and the shop management software you use when possible.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can AI answer calls for a mechanic shop?', a: 'Yes. A voice or text AI assistant can answer common questions, book appointments and take detailed messages, then pass complex conversations to your service advisor.' },
            { q: 'Will it give customers repair prices?', a: 'Only what you allow. Many shops share starting prices for common services and leave diagnostics and full estimates to the team.' },
            { q: 'Does it work with my shop management software?', a: 'We connect to many common tools. When a direct connection is not available, we use shared calendars, forms and notifications that fit how your shop already works.' },
        ],
        keywords: ['Auto repair shop automation', 'AI phone answering for mechanics', 'Car repair appointment booking', 'Service reminder automation'],
    },
    {
        slug: 'cleaning-companies',
        name: 'Cleaning Companies',
        short: 'Cleaning companies',
        audience: 'Residential and commercial cleaning companies',
        metaTitle: 'AI Automation for Cleaning Companies',
        metaDescription:
            'Instant quotes, booking, crew scheduling, reminders and recurring-client follow-up for residential and commercial cleaning companies.',
        heroTitle: 'AI Automation for Cleaning Companies',
        heroSub:
            'Turn quote requests into booked cleanings faster. We automate quotes, scheduling, reminders and follow-up so your team spends time cleaning, not chasing messages.',
        intro: [
            'Cleaning companies win jobs on speed: the first company to send a clear quote usually gets the booking. But quotes depend on square footage, rooms, frequency and add-ons, and answering every request by hand takes hours.',
            'We build quote forms and AI assistants that gather the right details and respond in minutes, booking flows that place jobs on the right crew’s schedule, reminders for clients and crews, and follow-up that turns one-time cleanings into recurring service.',
        ],
        painPoints: [
            'Quote requests wait hours or days for an answer',
            'Back-and-forth to collect home size, rooms and add-ons',
            'Scheduling crews and handling reschedules by text',
            'One-time clients never hear from you again',
            'Invoices and payment reminders take up evenings',
        ],
        solutions: [
            { title: 'Instant quote assistant', text: 'An AI assistant and smart form that collect the details, explain your pricing and book the cleaning.', href: '/solutions/quotes-estimates' },
            { title: 'Scheduling and reminders', text: 'Jobs land on the right crew’s calendar with client and crew reminders and easy reschedule links.', href: '/solutions/scheduling-status-updates' },
            { title: 'Recurring client follow-up', text: 'Messages after the first cleaning that offer weekly or biweekly service and make rebooking one tap away.', href: '/solutions/follow-up-reminders' },
            { title: 'Website built to convert', text: 'Service pages, areas served and an online quote form designed to turn visits into bookings.', href: '/services/web-design-development' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Define your pricing rules', text: 'Home size, rooms, frequency, add-ons and service areas become clear rules the assistant can quote from.' },
            { title: 'Connect booking and crews', text: 'Quotes, bookings, crew calendars and reminders are connected in one flow.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can AI give accurate cleaning quotes?', a: 'It can give quotes based on your own pricing rules, such as size, rooms, frequency and add-ons, and flag jobs that need a walkthrough or a custom price.' },
            { q: 'Does this work for commercial cleaning too?', a: 'Yes. Commercial requests usually route to a site visit or a custom proposal, while the assistant handles the intake and scheduling.' },
            { q: 'How do you turn one-time clients into recurring ones?', a: 'With a timely follow-up after the first cleaning, a simple offer for recurring service and reminders that make rebooking one tap away.' },
        ],
        keywords: ['Cleaning company automation', 'Cleaning business quotes', 'Cleaning crew scheduling', 'House cleaning booking'],
    },
    {
        slug: 'construction-remodeling',
        name: 'Construction & Remodeling Contractors',
        short: 'Construction & remodeling',
        audience: 'Construction, remodeling and home improvement contractors',
        metaTitle: 'AI Automation for Construction & Remodeling Contractors',
        metaDescription:
            'Lead intake, estimate scheduling, follow-up, project updates and review requests for construction and remodeling contractors.',
        heroTitle: 'AI Automation for Construction & Remodeling Contractors',
        heroSub:
            'Stop losing leads while you are on the job site. We automate lead intake, estimates, follow-up and client updates so your pipeline keeps moving while you build.',
        intro: [
            'Contractors get leads from Google, referrals, social media and lead platforms, often while they are on a roof or in a basement. By the time someone calls back, the homeowner has already talked to three other companies.',
            'We set up systems that respond to every lead within minutes, ask the right project questions, collect photos, book the estimate visit and follow up until the homeowner decides. Once a project starts, clients get updates automatically, and when it ends, they get a review request.',
        ],
        painPoints: [
            'Leads wait hours for a callback while you are on site',
            'Estimate visits are hard to schedule by phone tag',
            'Proposals go out and nobody follows up',
            'Clients call to ask how the project is going',
            'Finished projects rarely turn into reviews and referrals',
        ],
        solutions: [
            { title: 'Lead response in minutes', text: 'An AI assistant answers web, phone and social leads, asks project questions, collects photos and books the estimate.', href: '/solutions/lead-response-follow-up' },
            { title: 'Proposal follow-up', text: 'Automatic, personal follow-up after every estimate until the client says yes, no or not yet.', href: '/solutions/lead-response-follow-up' },
            { title: 'Project updates', text: 'Scheduled updates and milestone messages that keep homeowners informed without extra calls.', href: '/solutions/scheduling-status-updates' },
            { title: 'Portfolio website', text: 'A website that shows your work by project type and turns visitors into estimate requests.', href: '/services/web-design-development' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Map your sales process', text: 'From lead to estimate to signed contract, we define each step, message and reminder.' },
            { title: 'Connect lead sources', text: 'Your website, phone, social media and lead platforms flow into one CRM with instant responses.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'How fast can you respond to new leads?', a: 'Within minutes, at any hour. The assistant acknowledges the lead, asks the key project questions and offers estimate times, then alerts you with a summary.' },
            { q: 'Can you connect leads from Angi, Thumbtack or similar platforms?', a: 'In most cases, yes, through email or direct integrations, so every lead goes into the same follow-up system.' },
            { q: 'Do I need a new CRM?', a: 'Not necessarily. We can work with the CRM you have or set up a simple one that fits how a contracting business actually works.' },
        ],
        keywords: ['Contractor lead follow-up', 'Remodeling company automation', 'Construction CRM automation', 'Estimate scheduling for contractors'],
    },
    {
        slug: 'paving-driveway-contractors',
        name: 'Paving, Driveway & Sidewalk Contractors',
        short: 'Paving & driveway',
        audience: 'Paving, driveway sealing, sidewalk and masonry contractors',
        metaTitle: 'AI Automation & Marketing for Paving and Driveway Contractors',
        metaDescription:
            'Seasonal lead generation, instant estimate booking, weather-aware scheduling and follow-up for paving, driveway sealing and sidewalk contractors.',
        heroTitle: 'AI Automation for Paving, Driveway & Sidewalk Contractors',
        heroSub:
            'Your season is short, so every lead counts. We automate estimate requests, scheduling, reminders and seasonal marketing for paving and driveway contractors.',
        intro: [
            'Paving, sealcoating and sidewalk work is seasonal and weather-dependent. When the season opens, calls flood in; when it rains, the whole schedule moves. Keeping up by phone is exhausting, and leads slip through in the busiest weeks.',
            'We build systems that capture every estimate request with address and photos, book estimate visits, reschedule clients automatically when the weather changes the plan, and run seasonal campaigns that bring last year’s customers back for sealing and repairs.',
        ],
        painPoints: [
            'A flood of calls at the start of the season, then silence',
            'Rain delays mean rescheduling dozens of clients by hand',
            'Estimate requests arrive without address, size or photos',
            'Past customers are never reminded to reseal or repair',
            'Local competitors outrank you on Google during peak season',
        ],
        solutions: [
            { title: 'Estimate intake assistant', text: 'Collects the address, surface type, approximate size and photos, and books the estimate visit.', href: '/solutions/quotes-estimates' },
            { title: 'Scheduling and weather changes', text: 'Crew calendars, client reminders and fast rescheduling messages when weather moves the job.', href: '/solutions/scheduling-status-updates' },
            { title: 'Seasonal campaigns', text: 'Reminders to past customers before sealing season, with an easy way to book.', href: '/solutions/follow-up-reminders' },
            { title: 'Local SEO', text: 'A Google profile and site content built to win local searches for paving, sealing and sidewalk work in your towns.', href: '/services/digital-marketing-aeo' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Plan your season', text: 'Services, crews, towns you cover and how you handle weather delays become the rules of the system.' },
            { title: 'Connect leads and calendar', text: 'Phone, website and social leads flow into one schedule with automatic reminders.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can automation handle rain delays?', a: 'Yes. When you mark a day as rained out, affected clients can receive a message with the new date or a link to pick one, instead of individual calls.' },
            { q: 'How do I get more driveway sealing jobs from past customers?', a: 'With seasonal reminders sent to past customers before the season starts, a simple booking link and a review request after each job.' },
            { q: 'Do you help with Google rankings for paving searches?', a: 'Yes. Local SEO and your Google Business Profile are a big part of winning paving and sealing searches in specific towns.' },
        ],
        keywords: ['Paving company marketing', 'Driveway sealing leads', 'Sidewalk contractor automation', 'Sealcoating scheduling'],
    },
    {
        slug: 'plumbing-companies',
        name: 'Plumbing Companies',
        short: 'Plumbing companies',
        audience: 'Plumbing companies and plumbers',
        metaTitle: 'AI Automation for Plumbing Companies',
        metaDescription:
            '24/7 AI call answering, emergency triage, dispatch, reminders and follow-up for plumbing companies. Never miss an urgent call again.',
        heroTitle: 'AI Automation for Plumbing Companies',
        heroSub:
            'Emergencies don’t wait for business hours. We build AI answering, triage and dispatch systems so every call is answered and every job is followed up.',
        intro: [
            'Plumbing calls are often urgent: a burst pipe at night, a water heater out on a weekend. If nobody answers, the customer calls the next plumber on the list. At the same time, routine calls interrupt plumbers who are already on a job.',
            'We set up an AI assistant that answers every call and message, separates emergencies from routine work, collects the address and problem details, books the visit or alerts the on-call plumber, and follows up after the job for payment, reviews and maintenance.',
        ],
        painPoints: [
            'After-hours and weekend calls go to voicemail',
            'Urgent jobs and routine requests arrive mixed together',
            'Plumbers get interrupted on site to answer the phone',
            'Customers wait without knowing when the plumber will arrive',
            'Maintenance work, like water heater service, is never offered',
        ],
        solutions: [
            { title: '24/7 AI answering and triage', text: 'Answers every call and text, flags emergencies to the on-call plumber and books routine visits.', href: '/solutions/ai-receptionist' },
            { title: 'Dispatch and arrival updates', text: 'Jobs go to the right plumber’s schedule, and customers get confirmations and “on the way” messages.', href: '/solutions/scheduling-status-updates' },
            { title: 'Follow-up and maintenance', text: 'A check-in after every job and maintenance reminders, like water heater service, at the right time.', href: '/solutions/follow-up-reminders' },
            { title: 'Local search visibility', text: 'A Google profile and website content built for “plumber near me” and emergency searches.', href: '/services/digital-marketing-aeo' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Define what counts as an emergency', text: 'You decide which situations go straight to the on-call plumber and which get booked.' },
            { title: 'Connect phone and schedule', text: 'Your phone line, website and calendar or dispatch tool are connected to the assistant.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can an AI answer plumbing calls at night?', a: 'Yes. It answers 24/7, gathers the address and problem, and either books the visit or alerts the on-call plumber right away for emergencies.' },
            { q: 'Will customers know they are talking to AI?', a: 'We recommend being transparent. The assistant can introduce itself as your virtual assistant and hand the call to a person whenever needed.' },
            { q: 'Can it work with my dispatch software?', a: 'We connect to many common field service tools. Otherwise we use calendars and notifications that fit your current process.' },
        ],
        keywords: ['AI answering service for plumbers', 'Plumbing company automation', 'Plumber dispatch automation', 'Plumbing CRM'],
    },
    {
        slug: 'dental-practices',
        name: 'Dental Practices',
        short: 'Dental practices',
        audience: 'Dental practices and dentists',
        metaTitle: 'AI Automation for Dental Practices',
        metaDescription:
            'AI receptionist, appointment reminders, recall campaigns, intake forms and review requests for dental practices. Less front-desk overload, fuller schedules.',
        heroTitle: 'AI Automation for Dental Practices',
        heroSub:
            'Give your front desk room to care for patients in the office. We automate calls, scheduling requests, reminders, recall and reviews for dental practices.',
        intro: [
            'Dental front desks juggle phones, check-ins, insurance questions and scheduling at the same time. Calls go unanswered at peak hours, patients forget appointments, and hygiene recall slips when nobody has time to call.',
            'We build assistants that answer common patient questions and capture appointment requests, reminders that reduce no-shows, recall campaigns for cleanings, digital intake before the visit and review requests afterward. Patient information only goes into tools approved for it, and everything is designed around the practice management system you already use.',
        ],
        painPoints: [
            'Phones ring unanswered during busy check-in hours',
            'No-shows and late cancellations leave gaps in the schedule',
            'Hygiene recall depends on staff having time to call',
            'Paper intake forms slow down every new patient visit',
            'Happy patients rarely leave reviews',
        ],
        solutions: [
            { title: 'AI receptionist', text: 'Answers common questions about hours, services and insurance accepted, and captures appointment requests for your team.', href: '/solutions/ai-receptionist' },
            { title: 'Reminders and recall', text: 'Appointment confirmations, reminders and recall messages for cleanings and follow-up visits.', href: '/solutions/follow-up-reminders' },
            { title: 'Digital intake', text: 'New patient forms completed online before the visit, so check-in is faster.', href: '/solutions/digital-intake-forms' },
            { title: 'Review requests', text: 'Automatic review requests after each visit, with a direct link to your Google profile.', href: '/solutions/reviews-reputation' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Review privacy and systems', text: 'We look at your practice management software and decide which data each tool may handle.' },
            { title: 'Set up messages and assistant', text: 'Reminders, recall, intake and the assistant are configured in your practice’s voice.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Is AI safe to use in a dental office?', a: 'It can be, when it is set up carefully. We keep patient health information out of any tool that is not approved for it, and the assistant handles general questions and requests while your team handles clinical matters.' },
            { q: 'Can it book appointments directly in our practice software?', a: 'It depends on your system. Some allow direct booking; otherwise the assistant captures the request and your team confirms it in a few clicks.' },
            { q: 'How do recall campaigns work?', a: 'Patients due for a cleaning or follow-up receive a friendly reminder with an easy way to request a time, without your team making every call.' },
        ],
        keywords: ['AI receptionist for dental offices', 'Dental appointment reminders', 'Dental recall automation', 'Dental practice marketing'],
    },
    {
        slug: 'eye-care-practices',
        name: 'Optometrists & Eye Care Practices',
        short: 'Eye care practices',
        audience: 'Optometrists, eye doctors and eye care practices',
        metaTitle: 'AI Automation for Optometrists & Eye Care Practices',
        metaDescription:
            'Appointment requests, annual exam reminders, eyewear-ready notifications and review requests for optometrists and eye care practices.',
        heroTitle: 'AI Automation for Optometrists & Eye Care Practices',
        heroSub:
            'From exam reminders to “your glasses are ready”, we automate the messages that keep an eye care practice running smoothly.',
        intro: [
            'Eye care practices handle exams, contact lens fittings and an optical shop at once. Staff spend hours on reminder calls, “are my glasses ready?” calls and questions about insurance and frame selection.',
            'We automate those touchpoints: an assistant for common questions and appointment requests, annual exam reminders, notifications when glasses or contacts are ready, contact lens reorder reminders and review requests. Patient information only goes into tools approved for it, and the setup fits the systems your practice already uses.',
        ],
        painPoints: [
            'Patients forget their annual eye exam',
            'Staff field constant calls asking if glasses are ready',
            'Contact lens reorders depend on the patient remembering',
            'Phones get busy during exams and optical rush hours',
            'New patients cannot easily find the practice online',
        ],
        solutions: [
            { title: 'AI assistant for patients', text: 'Answers questions about hours, services and insurance accepted, and captures appointment requests.', href: '/solutions/ai-receptionist' },
            { title: 'Exam and reorder reminders', text: 'Annual exam reminders and contact lens reorder messages sent at the right time.', href: '/solutions/follow-up-reminders' },
            { title: 'Order-ready notifications', text: 'Automatic texts when glasses or contacts are ready for pickup.', href: '/solutions/scheduling-status-updates' },
            { title: 'Local visibility', text: 'A website and Google profile that help patients searching for an eye doctor nearby.', href: '/services/digital-marketing-aeo' },
        ],
        steps: [
            AUDIT_STEP,
            { title: 'Review privacy and systems', text: 'We review your practice and optical software and decide which data each tool may handle.' },
            { title: 'Set up reminders and assistant', text: 'Exam reminders, order notifications and the assistant are configured in your practice’s voice.' },
            LIVE_STEP,
        ],
        faqs: [
            { q: 'Can patients be notified automatically when their glasses are ready?', a: 'Yes. When your team marks an order as ready, the patient receives a text or email with pickup details.' },
            { q: 'Is it safe to use AI with patient information?', a: 'We design it so patient health information stays only in tools approved for it. The assistant handles general questions and requests, and your team handles anything clinical.' },
            { q: 'Do annual exam reminders really bring patients back?', a: 'A timely, friendly reminder with an easy way to request an appointment removes the main reason patients skip exams: forgetting.' },
        ],
        keywords: ['Optometry practice automation', 'Eye doctor appointment reminders', 'Optical shop notifications', 'Eye care marketing'],
    },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
