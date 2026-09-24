import type { Metadata } from 'next';
import LegalDocument, { A, H3, P, Table, UL, type LegalSection } from '../../components/LegalDocument';
import CookieSettingsButton from '../../components/CookieSettingsButton';
import JsonLd from '../../components/JsonLd';
import { LEGAL } from '../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../lib/seo';

const TITLE = 'Privacy Policy (CCPA & US State Privacy Laws) | Xtek AI';
const DESCRIPTION =
    'How Xtek AI collects, uses, shares and protects personal information, and the privacy rights you have under the CCPA/CPRA and other US state laws.';

export const metadata: Metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/privacy',
});

const sections: LegalSection[] = [
    {
        id: 'who-we-are',
        title: 'Who we are and what this policy covers',
        body: (
            <>
                <P>
                    {LEGAL.name} (&ldquo;Xtek AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a United States AI implementation and digital marketing agency. We are
                    the &ldquo;business&rdquo; (controller) responsible for the personal information described in this policy. We operate online: we do not run a public
                    office, and our meetings with clients take place by video call.
                </P>
                <P>
                    This policy applies to personal information we collect through <strong>xtekai.com</strong> and its sub-sites (including our landing pages), our
                    contact, quote and newsletter forms, our AI voice and chat assistant, our emails and calls with prospects, and our interactions on Google, Facebook,
                    Instagram and LinkedIn.
                </P>
                <P>
                    <strong>Client work.</strong> When we build or run automations for a client, we often handle personal information that belongs to the client&rsquo;s own
                    customers or staff. In that case we act as the client&rsquo;s <strong>service provider</strong>, follow the client&rsquo;s instructions and handle that
                    information under our written agreement with the client. If your information is held by one of our clients, please contact that client first.
                </P>
                <P>
                    <strong>Contact:</strong> <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> · <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>.
                </P>
            </>
        ),
    },
    {
        id: 'information-we-collect',
        title: 'Personal information we collect',
        body: (
            <>
                <P>
                    This is the personal information we collected in the last 12 months and continue to collect, with the matching California (CCPA) category:
                </P>
                <Table
                    head={['What we collect', 'Examples', 'Where it comes from', 'CCPA category']}
                    rows={[
                        [
                            'Contact details',
                            'Name, business or organization name, email address, phone number, sector or industry (Next Horizon requests).',
                            'You, when you complete a contact, quote or newsletter form, or write or call us.',
                            'Identifiers; customer records (Cal. Civ. Code § 1798.80(e)); professional information (business name)',
                        ],
                        [
                            'Your messages and requests',
                            'The description of your project, questions, meeting preferences, and the content of emails and calls with us.',
                            'You.',
                            'Commercial information; audio and electronic information (call and email content)',
                        ],
                        [
                            'Text message (SMS) records',
                            'Your mobile number, whether and when you opted in or out, the wording you agreed to, the page and device details of your opt-in, and the content and delivery status of the messages we exchange.',
                            'You, and our messaging platform provider.',
                            'Identifiers; commercial information; electronic information',
                        ],
                        [
                            'AI assistant conversations',
                            'Your voice and/or typed messages and the resulting transcript when you use our AI voice or chat assistant.',
                            'You, through the assistant on our site.',
                            'Audio and electronic information',
                        ],
                        [
                            'Device and usage data',
                            'IP address, browser and device type, pages viewed, referring page, approximate location derived from your IP address, date and time.',
                            'Automatically from your browser. Server logs are always created; analytics and advertising tools apply as described under Cookies.',
                            'Internet or other network activity; geolocation data (approximate only)',
                        ],
                        [
                            'Online identifiers',
                            'Cookie identifiers set by Google Analytics and the Meta Pixel.',
                            'Your browser, unless you opt out.',
                            'Identifiers; internet or other network activity',
                        ],
                        [
                            'Client and business information',
                            'Business documents, account access, invoices and workflow data you give us to deliver services.',
                            'You, during an engagement.',
                            'Commercial information; professional information',
                        ],
                        [
                            'Public profile interactions',
                            'Reviews, messages or comments you post on our Google Business Profile, Facebook, Instagram or LinkedIn pages.',
                            'You and the platform.',
                            'Identifiers; electronic information',
                        ],
                    ]}
                />
                <P>
                    <strong>Sensitive personal information.</strong> We do not ask for and do not intend to collect sensitive personal information (such as health data,
                    Social Security or other government ID numbers, financial account credentials, precise geolocation, biometric data, or information about race,
                    religion, sexual orientation or immigration status). Please do not send it to us through our forms or the AI assistant. Xtek AI is not a HIPAA covered
                    entity and our website is not intended for protected health information.
                </P>
                <P>You are never required to give us personal information, but we may be unable to respond to your request without it.</P>
            </>
        ),
    },
    {
        id: 'how-we-use-it',
        title: 'How we use personal information',
        body: (
            <>
                <P>We use the information above for these business purposes:</P>
                <UL>
                    <li>to respond to your inquiry, schedule meetings and prepare proposals;</li>
                    <li>to provide, manage, support and bill for our services, and to keep records for tax, accounting and legal purposes;</li>
                    <li>to send our newsletter and other marketing about our services (you can opt out at any time);</li>
                    <li>to understand how the site is used and improve it (Google Analytics);</li>
                    <li>to measure and improve our advertising on Facebook and Instagram (Meta Pixel);</li>
                    <li>to operate the AI voice and chat assistant and answer visitors&rsquo; questions;</li>
                    <li>to keep the site and our business secure, prevent fraud and abuse, and fix errors;</li>
                    <li>to comply with the law and to establish, exercise or defend legal claims.</li>
                </UL>
                <P>
                    We do not make decisions about you based solely on automated processing that produce legal or similarly significant effects, and we do not use personal
                    information to train our own AI models. We do not sell personal information for money.
                </P>
            </>
        ),
    },
    {
        id: 'cookies',
        title: 'Cookies, similar technologies and your privacy choices',
        body: (
            <>
                <P>
                    <strong>Notice at collection.</strong> When you visit our site, we and our providers may collect device and usage data and set cookies for analytics
                    (Google Analytics) and advertising measurement (Meta Pixel), for the purposes described in this policy and for as long as the cookie durations below.
                    You can opt out at any time.
                </P>
                <Table
                    head={['Name', 'Provider', 'Purpose', 'Category', 'Typical duration']}
                    rows={[
                        [
                            <code key="c1">xtek-cookie-consent</code>,
                            'Xtek AI (stored in your browser’s local storage)',
                            'Remembers your privacy choices.',
                            'Strictly necessary',
                            'Until you change it or clear your browser data',
                        ],
                        [
                            <code key="c2">_ga, _ga_G-29BT1LZTS0</code>,
                            'Google Analytics 4 (Google LLC)',
                            'Tells visitors apart and measures how the site is used.',
                            'Analytics',
                            'Up to 2 years',
                        ],
                        [
                            <code key="c3">_fbp, _fbc</code>,
                            'Meta Pixel (Meta Platforms, Inc.)',
                            'Measures the results of our Facebook and Instagram ads and attributes visits to them.',
                            'Marketing / advertising',
                            'Up to 90 days',
                        ],
                    ]}
                />
                <H3>Other third-party requests</H3>
                <P>
                    To display the site we load some resources from third parties that receive your IP address and browser details when your browser requests them:
                    animation scripts from cdnjs (Cloudflare) and unpkg, some photographs from Unsplash, and the AI assistant widget from ElevenLabs (loaded after you
                    interact with the page or after a few seconds). Fonts are served from our own domain.
                </P>
                <H3>Cloudflare Turnstile</H3>
                <P>
                    Our website forms are protected by Cloudflare Turnstile, which helps us prevent spam and abuse. Turnstile may collect information about your device
                    and browser to verify that you are a real person. This data is processed by Cloudflare under its{' '}
                    <A href="https://www.cloudflare.com/turnstile-privacy-policy/">Turnstile Privacy Addendum</A>.
                </P>
                <H3>Your Privacy Choices</H3>
                <UL>
                    <li>
                        Open <CookieSettingsButton>Your Privacy Choices</CookieSettingsButton> (also linked in the footer) to opt out of analytics and/or advertising
                        cookies. When you opt out we stop loading those tools and delete their cookies; you can change your mind there at any time.
                    </li>
                    <li>
                        <strong>Global Privacy Control (GPC).</strong> If your browser or extension sends a GPC signal, we treat it as a valid request to opt out of the
                        sale or sharing of your personal information and of targeted advertising, and we do not load analytics or advertising tools for that browser.
                    </li>
                    <li>You can also block or delete cookies in your browser settings, which may affect how some pages work.</li>
                    <li>
                        Opt out of Google Analytics across sites with the <A href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</A> and manage
                        ads on Facebook and Instagram in your <A href="https://www.facebook.com/adpreferences">Meta ad preferences</A>.
                    </li>
                </UL>
                <P>
                    <strong>Do Not Track.</strong> &ldquo;Do Not Track&rdquo; browser signals are not a recognized standard, so we do not respond to them. We do respond to
                    Global Privacy Control, as described above.
                </P>
            </>
        ),
    },
    {
        id: 'ai-assistant',
        title: 'AI voice and chat assistant',
        body: (
            <>
                <P>
                    Our website offers an AI-powered assistant (&ldquo;Start a call&rdquo;) provided by ElevenLabs. <strong>You are talking to an artificial intelligence,
                    not a person.</strong> When you use it, your voice or messages are sent to the provider so the assistant can understand and answer you, and the
                    conversation <strong>may be recorded, transcribed and stored</strong>. We use it to answer questions about our services and to help you reach us. By
                    using it you agree to this recording.
                </P>
                <UL>
                    <li>Using the assistant is optional; you can contact us by form, email or phone instead.</li>
                    <li>Do not share sensitive information (health, financial account, government ID or password details) with the assistant.</li>
                    <li>The assistant can make mistakes. It does not give legal, medical or financial advice, and nothing it says is a binding offer.</li>
                    <li>Conversation data is handled under our agreement with the provider and this policy, and kept only as long as described under &ldquo;How long we keep information&rdquo;.</li>
                </UL>
            </>
        ),
    },
    {
        id: 'sms',
        title: 'Text and email messages',
        body: (
            <>
                <P>
                    We send two kinds of messages, and our forms ask for your agreement to each one (for text messages, see also our <A href="/sms-terms">SMS Terms</A>):
                </P>
                <UL>
                    <li>
                        <strong>Service messages (text and email)</strong> about your inquiry and appointments: replies, meeting scheduling, confirmations, reminders and
                        follow-ups. You agree to these by checking the required service-messages box when you submit a form, because we use them to answer you and manage
                        your appointments.
                    </li>
                    <li>
                        <strong>Marketing messages</strong>: offers, promotions and news about our services. These are <strong>optional</strong>. Marketing texts and marketing
                        emails each have their own unchecked box, and consent to them is never a condition of any purchase.
                    </li>
                </UL>
                <P>
                    We collect and keep your mobile number, a record of each consent (the wording you accepted, the date and time, the page you used, and your browser and IP
                    address) and the messages we exchange with you.
                </P>
                <UL>
                    <li>Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out of texts at any time and <strong>HELP</strong> for help; every marketing email has an unsubscribe link.</li>
                    <li>We use a third-party messaging platform and mobile carriers to deliver text messages; they process your number and message content on our behalf.</li>
                    <li>
                        <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> Text messaging originator
                        opt-in data and consent will not be shared with any third party for their own use.
                    </li>
                </UL>
            </>
        ),
    },
    {
        id: 'sharing',
        title: 'Who we share personal information with',
        body: (
            <>
                <P>In the last 12 months we disclosed personal information for business purposes to:</P>
                <UL>
                    <li>
                        <strong>Service providers</strong> that act on our instructions: website hosting and content delivery; workflow-automation and email/CRM tools that
                        receive form submissions; scheduling and video-meeting tools; the AI assistant provider (ElevenLabs); and analytics (Google) and advertising
                        measurement (Meta) providers.
                    </li>
                    <li><strong>Professional advisers</strong> such as accountants, lawyers and insurers, under confidentiality duties.</li>
                    <li><strong>Authorities and other parties</strong> when the law requires it or to protect rights, safety and security.</li>
                    <li><strong>A successor</strong> if we are involved in a merger, acquisition or sale of assets.</li>
                    <li><strong>Others at your direction</strong>, for example when you ask us to connect with one of your vendors.</li>
                </UL>
                <P>
                    <strong>Sale and sharing.</strong> We do not sell personal information for money. Advertising and analytics cookies (the Meta Pixel and Google Analytics)
                    send identifiers and internet activity to Meta and Google, which some state laws treat as a &ldquo;sale&rdquo; or as &ldquo;sharing&rdquo; for
                    cross-context behavioral advertising. We do this only for visitors who have not opted out. You can opt out at any time through{' '}
                    <CookieSettingsButton>Your Privacy Choices</CookieSettingsButton> or with a Global Privacy Control signal. We do not knowingly sell or share the personal
                    information of anyone under 16.
                </P>
                <P>
                    <strong>Mobile information.</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging
                    originator opt-in data and consent will not be shared with any third party for their own use. See &ldquo;Text and email messages&rdquo; above.
                </P>
            </>
        ),
    },
    {
        id: 'location',
        title: 'Where information is processed',
        body: (
            <>
                <P>
                    Xtek AI is based in the United States and offers its services to businesses in the United States. We store and process personal information in the
                    United States. We do not currently offer our services to individuals in the European Economic Area, the United Kingdom or Switzerland. If you access
                    our site from outside the United States, you understand that your information will be transferred to and processed in the United States, where data
                    protection laws may differ from those in your country.
                </P>
            </>
        ),
    },
    {
        id: 'retention',
        title: 'How long we keep information',
        body: (
            <>
                <P>We keep personal information only as long as needed for the purposes above, using these criteria:</P>
                <UL>
                    <li><strong>Inquiries and prospects:</strong> until your request is resolved and for a reasonable period afterwards so we can follow up; deleted on request unless we need it for a legal reason.</li>
                    <li><strong>Clients:</strong> for the length of the engagement and afterwards for the period required for tax, accounting, contract and dispute purposes.</li>
                    <li><strong>Newsletter:</strong> until you unsubscribe, after which we keep a minimal suppression record so we do not email you again.</li>
                    <li><strong>Analytics and advertising data:</strong> for the retention period configured in those tools; cookies expire as listed above.</li>
                    <li><strong>Consent records:</strong> the record of your text-message and email consent is kept for at least four years after your last interaction or opt-out, or longer if the law requires, so that we can show what you agreed to.</li>
                    <li><strong>AI assistant conversations and server logs:</strong> for as short a time as is needed to answer, improve reliability and keep the service secure.</li>
                </UL>
                <P>When we no longer need information we delete or de-identify it.</P>
            </>
        ),
    },
    {
        id: 'security',
        title: 'How we protect information',
        body: (
            <>
                <P>
                    We use reasonable administrative, technical and physical safeguards appropriate to the risk, including encrypted connections (HTTPS/TLS) between your
                    browser and our site, access limited to people who need it, and providers that maintain their own security programs. No system is completely secure,
                    so we cannot guarantee absolute security. If a breach affects your information, we will notify you and the authorities as the law requires.
                </P>
            </>
        ),
    },
    {
        id: 'your-rights',
        title: 'Your privacy rights (California and other US states)',
        body: (
            <>
                <P>
                    Depending on where you live, laws such as the California Consumer Privacy Act as amended by the California Privacy Rights Act (&ldquo;CCPA&rdquo;) and
                    the privacy laws of Colorado, Connecticut, New Jersey, Oregon, Texas, Virginia and other states give you rights over your personal information. We honor
                    these rights for residents of every state that grants them.
                </P>
                <UL>
                    <li><strong>Know / access:</strong> the categories and specific pieces of personal information we hold about you, the sources, the purposes, and the categories of recipients (see the table above and &ldquo;Who we share personal information with&rdquo;);</li>
                    <li><strong>Delete</strong> personal information we collected from you, subject to legal exceptions;</li>
                    <li><strong>Correct</strong> inaccurate personal information;</li>
                    <li><strong>Portability:</strong> receive your information in a portable, readily usable format;</li>
                    <li><strong>Opt out of sale, sharing and targeted advertising:</strong> use <CookieSettingsButton>Your Privacy Choices</CookieSettingsButton> or a GPC signal, which we treat as a valid opt-out request;</li>
                    <li><strong>Limit use of sensitive personal information:</strong> not applicable, because we do not collect it for inference or profiling;</li>
                    <li><strong>No retaliation:</strong> we will not deny you services, charge different prices or give a different quality of service because you exercised a right.</li>
                </UL>
                <P>
                    <strong>How to make a request.</strong> Email <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> or call <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>{' '}
                    and tell us which right you want to exercise. We will confirm receipt within 10 business days and respond within 45 days (we may extend once by another
                    45 days and will tell you why). To protect you, we verify a request by matching details you give us with what we already hold. You may use an
                    authorized agent, who must show your written permission; we may still verify your identity directly with you.
                </P>
                <P>
                    <strong>Appeals.</strong> If we decline your request and your state gives you a right to appeal, reply to our decision (or email us with the subject
                    &ldquo;Appeal&rdquo;) within 60 days and we will respond within the period your state requires. You can also contact your state attorney general.
                </P>
                <P>
                    <strong>California &ldquo;Shine the Light&rdquo; and Nevada.</strong> California residents may ask once a year which personal information we shared with
                    third parties for their direct marketing (we do not do so). Nevada residents may submit an opt-out request about the sale of personal information; we
                    do not sell it as Nevada law defines the term.
                </P>
            </>
        ),
    },
    {
        id: 'marketing',
        title: 'Emails, calls and marketing preferences',
        body: (
            <>
                <P>
                    We send marketing emails only to people who subscribed or whom we may lawfully contact for business purposes, in line with the CAN-SPAM Act. Every
                    marketing email includes a working unsubscribe link and our contact details, and we honor opt-outs within 10 business days. You can also ask us to stop
                    by emailing <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A>.
                </P>
                <P>
                    We may call you about your inquiry at the number you provide; tell us if you prefer not to be called and we will stop and add your number to our internal
                    do-not-call list. We send <strong>service messages</strong> by text and email (replies, scheduling, confirmations, reminders and follow-ups) because you agreed to
                    them when you submitted a form. We send <strong>marketing</strong> texts and emails only if you checked the separate, optional boxes for them or otherwise opted
                    in (see &ldquo;Text and email messages&rdquo; and our <A href="/sms-terms">SMS Terms</A>), and we never make consent to marketing a condition of buying anything
                    (Telephone Consumer Protection Act). You can opt out of marketing at any time.
                </P>
            </>
        ),
    },
    {
        id: 'children',
        title: 'Children',
        body: (
            <>
                <P>
                    Our website and services are intended for businesses and adults. They are not directed to children under 16, and we do not knowingly collect personal
                    information from them (in line with the Children&rsquo;s Online Privacy Protection Act). If you believe a child has given us information, contact us and
                    we will delete it.
                </P>
            </>
        ),
    },
    {
        id: 'third-party-links',
        title: 'Third-party sites and platforms',
        body: (
            <>
                <P>
                    Our site links to services we do not control, such as Google, Facebook, Instagram and LinkedIn. Their privacy practices are governed by their own
                    policies, and we encourage you to read them. Reviews shown on our site are copied from our public Google Business Profile with the reviewer&rsquo;s
                    displayed name.
                </P>
            </>
        ),
    },
    {
        id: 'changes',
        title: 'Changes to this policy',
        body: (
            <>
                <P>
                    We may update this policy as our practices or the law change. We will post the new version here with a new effective date and, for material changes,
                    give additional notice (for example on the site or by email).
                </P>
            </>
        ),
    },
    {
        id: 'contact-us',
        title: 'Contact us',
        body: (
            <>
                <P>
                    Questions, requests or complaints about privacy? Email <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> or call{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. We are an online business without a public office, so please contact us electronically or by phone.
                </P>
            </>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('Privacy Policy', DESCRIPTION, '/privacy', LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Privacy Policy', path: '/privacy' },
                    ]),
                ]}
            />
            <LegalDocument
                title="Privacy Policy"
                intro={
                    <>
                        <P>
                            Your privacy matters to us. This policy explains, in plain language, what personal information Xtek AI collects, why we collect it, who we share it
                            with, how long we keep it and what choices and rights you have under the <strong>California Consumer Privacy Act (CCPA/CPRA)</strong> and other{' '}
                            <strong>US state privacy laws</strong>.
                        </P>
                        <P>
                            To change your cookie and advertising choices, open <CookieSettingsButton>Your Privacy Choices</CookieSettingsButton>. To read the rules for using our
                            website and services, see our <A href="/terms">Terms and Conditions</A>.
                        </P>
                    </>
                }
                sections={sections}
                otherPage={{ href: '/terms', label: 'Read our Terms and Conditions' }}
            />
        </>
    );
}
