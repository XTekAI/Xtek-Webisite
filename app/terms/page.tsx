import type { Metadata } from 'next';
import LegalDocument, { A, P, UL, type LegalSection } from '../../components/LegalDocument';
import JsonLd from '../../components/JsonLd';
import { LEGAL } from '../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../lib/seo';

const TITLE = 'Terms and Conditions | Xtek AI';
const DESCRIPTION =
    'The terms for using the Xtek AI website and our AI automation, marketing and web services: engagements, payment, IP, AI use, liability and governing law.';

export const metadata: Metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/terms',
});

const sections: LegalSection[] = [
    {
        id: 'agreement',
        title: 'Agreement to these terms',
        body: (
            <>
                <P>
                    These Terms and Conditions (&ldquo;Terms&rdquo;) are a legal agreement between you and {LEGAL.name} (&ldquo;Xtek AI&rdquo;, &ldquo;we&rdquo;,
                    &ldquo;us&rdquo;), a United States company. They apply to your use of <strong>xtekai.com</strong> and our landing pages (the &ldquo;Site&rdquo;) and, together
                    with any proposal, statement of work or order form we sign with you (a &ldquo;Proposal&rdquo;), to the services we provide (the &ldquo;Services&rdquo;).
                </P>
                <P>
                    By using the Site, submitting a form, or accepting a Proposal, you agree to these Terms and to our <A href="/privacy">Privacy Policy</A>. If you do not
                    agree, do not use the Site or the Services. If a Proposal conflicts with these Terms, the Proposal controls for that engagement.
                </P>
            </>
        ),
    },
    {
        id: 'eligibility',
        title: 'Who may use the Site and Services',
        body: (
            <>
                <P>
                    Our Site and Services are intended for businesses and adults in the United States. You must be at least 18 years old and, if you act for a business,
                    have authority to bind that business to these Terms.
                </P>
            </>
        ),
    },
    {
        id: 'site-use',
        title: 'Using the Site',
        body: (
            <>
                <P>You agree not to:</P>
                <UL>
                    <li>use the Site unlawfully or in a way that infringes anyone&rsquo;s rights;</li>
                    <li>attempt to gain unauthorized access to the Site, our systems or other users&rsquo; data, or interfere with their security or operation;</li>
                    <li>scrape, copy, or resell Site content, or use bots or automated means to submit forms or overload the Site;</li>
                    <li>submit false, misleading or third-party information without permission, or send malicious code;</li>
                    <li>use the AI assistant to obtain or share sensitive information, to harass, or to attempt to manipulate it into unsafe behavior.</li>
                </UL>
                <P>
                    We may suspend or block access that we reasonably believe violates these Terms. Content on the Site, including blog articles, is for general
                    information only and is not legal, financial, tax, medical or other professional advice.
                </P>
            </>
        ),
    },
    {
        id: 'services',
        title: 'Our Services and engagements',
        body: (
            <>
                <P>
                    We provide AI automation, AI agents and chatbots, workflow and administrative automation, digital marketing and answer-engine (AEO) optimization, web
                    design and development, content creation, and the Next Horizon platform. The scope, deliverables, timeline, fees and acceptance criteria of each
                    engagement are set out in a Proposal.
                </P>
                <UL>
                    <li>Services are delivered based on the findings of the initial strategic audit and the scope agreed in the Proposal. Work outside that scope is a change request that we will quote separately.</li>
                    <li>Implementation timelines are estimates. They depend on the complexity of your business and on the data, access and approvals you provide on time.</li>
                    <li>We may use subcontractors and third-party tools to perform the Services and remain responsible for their work on our engagement.</li>
                    <li>Meetings are held by video call unless we agree otherwise.</li>
                </UL>
                <P>A request to contact us through a form is not an offer to buy or sell; no engagement exists until you and Xtek AI both accept a Proposal.</P>
            </>
        ),
    },
    {
        id: 'fees',
        title: 'Fees, invoices and payment',
        body: (
            <>
                <P>
                    Fees, billing schedule and expenses are stated in the Proposal. Unless it says otherwise: fees are in US dollars and exclusive of taxes (which you pay,
                    except taxes on our income); invoices are due within 15 days of the invoice date; and fees already paid are non-refundable except where we agree in
                    writing or the law requires. If an invoice is overdue, we may pause the Services until it is paid, and we may charge interest at the lower of 1.5% per
                    month or the maximum rate allowed by law.
                </P>
                <P>Third-party subscriptions or usage charges (for example, AI model, phone, hosting or advertising costs) are billed to you at cost unless the Proposal includes them.</P>
            </>
        ),
    },
    {
        id: 'client-responsibilities',
        title: 'Your responsibilities and your data',
        body: (
            <>
                <UL>
                    <li>Give us accurate information, timely access, decisions and feedback that we reasonably need.</li>
                    <li>Make sure you have the rights and, where needed, the consents and notices required to give us the data, accounts and content you provide, and to have us process them for you.</li>
                    <li>Review our deliverables and AI outputs before you rely on them or publish them, and keep your own backups.</li>
                    <li>Follow the terms of third-party platforms you ask us to work with (for example, advertising and social platforms).</li>
                </UL>
                <P>
                    <strong>Personal information.</strong> Where we process personal information on your behalf, we act as your service provider under applicable US privacy laws.
                    We will process it only to provide the Services and as you instruct, and will sign a data processing addendum on request. Our own use of personal
                    information is described in our <A href="/privacy">Privacy Policy</A>.
                </P>
            </>
        ),
    },
    {
        id: 'ip',
        title: 'Intellectual property',
        body: (
            <>
                <UL>
                    <li><strong>Your materials.</strong> You keep ownership of the data, content, logos and materials you give us (&ldquo;Client Materials&rdquo;) and grant us a limited license to use them only to provide the Services.</li>
                    <li><strong>Our materials.</strong> Unless the Proposal says otherwise, Xtek AI keeps ownership of the automation agents, workflows, code, prompts, templates, methods and know-how we create or already own, including anything reusable across clients.</li>
                    <li><strong>License to you.</strong> Once you have paid the fees for a deliverable, you receive a non-exclusive, non-transferable license to use it for your internal business operations, unless the Proposal assigns ownership to you (for example, a custom website&rsquo;s design and copy).</li>
                    <li><strong>Site content.</strong> The Site, its text, design, graphics and the Xtek AI name and logo belong to us or our licensors. You may view and share pages for personal or internal business use, but may not copy or reuse them commercially without written permission. Third-party names and logos belong to their owners.</li>
                    <li><strong>Feedback.</strong> If you send us suggestions, we may use them without obligation to you.</li>
                </UL>
            </>
        ),
    },
    {
        id: 'ai',
        title: 'AI-generated output',
        body: (
            <>
                <P>
                    Our Services and the Site use artificial intelligence, including models from third parties. AI output can be inaccurate, incomplete, biased or similar to
                    other outputs, and may not be protected by copyright. We take reasonable steps to review deliverables, but you are responsible for checking AI output
                    before you use it for decisions, filings, customer communications or regulated activities. AI output is not professional advice. Where the law requires
                    it, tell people when they are interacting with an AI system.
                </P>
            </>
        ),
    },
    {
        id: 'results',
        title: 'Results, case studies and reviews',
        body: (
            <>
                <P>
                    Case studies, statistics, testimonials and reviews on the Site (including reviews copied from our Google Business Profile) describe the experiences of
                    specific clients. Results depend on many factors, are not typical or guaranteed, and past performance does not guarantee future results. We do not
                    guarantee any particular revenue, ranking, traffic, conversion, cost saving or search or AI-answer placement.
                </P>
            </>
        ),
    },
    {
        id: 'messages',
        title: 'Text and email messages',
        body: (
            <>
                <P>
                    <strong>Service messages (required).</strong> To submit one of our forms you must agree to receive service messages from Xtek AI by text (SMS) and email,
                    including automated ones: replies to your inquiry, meeting scheduling, confirmations, reminders and follow-ups. This is how we respond and manage appointments.
                </P>
                <P>
                    <strong>Marketing messages (optional).</strong> Using separate, unchecked boxes you may also choose to receive marketing texts and/or marketing emails
                    (offers, promotions, news). Consent to marketing is optional and is not a condition of any purchase.
                </P>
                <P>
                    Text messages are governed by our <A href="/sms-terms">SMS Terms</A>: message frequency varies, message and data rates may apply, and you can reply STOP
                    to opt out of texts or HELP for help. Replying STOP ends all text messages from us, and we will then contact you by email or phone. Marketing emails include an
                    unsubscribe link, and we honor opt-outs promptly.
                </P>
            </>
        ),
    },
    {
        id: 'third-parties',
        title: 'Third-party services and links',
        body: (
            <>
                <P>
                    The Site and Services may connect to or depend on third-party products such as Google, Meta, LinkedIn, ElevenLabs, hosting and AI providers. We do not
                    control them, and their terms apply to your use of them. We are not responsible for their availability, content or changes, though we will work
                    reasonably with you to adjust the Services if a change affects them.
                </P>
            </>
        ),
    },
    {
        id: 'confidentiality',
        title: 'Confidentiality',
        body: (
            <>
                <P>
                    Each party will keep the other&rsquo;s non-public business information confidential, use it only for the engagement, and protect it with reasonable care,
                    except for information that is public, already known, independently developed, or that must be disclosed by law. This duty continues for three years
                    after the engagement ends and, for trade secrets and personal information, for as long as they remain confidential or protected.
                </P>
            </>
        ),
    },
    {
        id: 'disclaimers',
        title: 'Disclaimers',
        body: (
            <>
                <P>
                    THE SITE AND THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;. TO THE FULLEST EXTENT PERMITTED BY LAW, XTEK AI DISCLAIMS ALL
                    WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTY THAT THE SITE OR
                    SERVICES WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE OR THAT AI OUTPUT WILL BE ACCURATE. Nothing in these Terms limits any warranty we give you in a
                    Proposal.
                </P>
            </>
        ),
    },
    {
        id: 'liability',
        title: 'Limitation of liability',
        body: (
            <>
                <P>
                    TO THE FULLEST EXTENT PERMITTED BY LAW, XTEK AI WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES,
                    OR FOR LOST PROFITS, REVENUE, DATA OR GOODWILL, ARISING OUT OF OR RELATED TO THE SITE, THE SERVICES OR THESE TERMS, EVEN IF ADVISED OF THE POSSIBILITY.
                    OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO AN ENGAGEMENT WILL NOT EXCEED THE FEES YOU PAID US FOR THAT ENGAGEMENT IN THE 12 MONTHS BEFORE THE EVENT
                    GIVING RISE TO THE CLAIM; FOR USE OF THE FREE SITE, IT WILL NOT EXCEED US$100.
                </P>
                <P>
                    These limits do not apply to liability that cannot be limited by law, such as fraud, willful misconduct or gross negligence. Some jurisdictions do not
                    allow certain limits, so parts of this section may not apply to you.
                </P>
            </>
        ),
    },
    {
        id: 'indemnity',
        title: 'Indemnification',
        body: (
            <>
                <P>
                    If you use the Services for a business, you will defend and indemnify Xtek AI against third-party claims, losses and reasonable costs (including
                    attorneys&rsquo; fees) arising from Client Materials you provide, your breach of these Terms or the law, or your use of deliverables or AI output in
                    violation of law or third-party rights. We will give you prompt notice of the claim and reasonable cooperation.
                </P>
            </>
        ),
    },
    {
        id: 'term',
        title: 'Term and termination',
        body: (
            <>
                <P>
                    These Terms apply while you use the Site or an engagement is active. Either of us may end an engagement as stated in the Proposal or, if it is silent,
                    on 30 days&rsquo; written notice; either of us may end it immediately for the other&rsquo;s uncured material breach after 10 days&rsquo; notice. On
                    termination you will pay for Services performed and non-cancellable costs incurred up to the termination date, and we will return or delete Client
                    Materials as you reasonably request, subject to legal retention duties. Sections that by their nature should survive (including payment,
                    intellectual property, confidentiality, disclaimers, liability, indemnity and governing law) will survive.
                </P>
            </>
        ),
    },
    {
        id: 'law',
        title: 'Governing law and disputes',
        body: (
            <>
                <P>
                    These Terms are governed by the laws of the State of {LEGAL.governingState}, without regard to its conflict-of-law rules. Before filing a claim, each party
                    will try in good faith to resolve the dispute informally for at least 30 days after written notice. If that fails, the state and federal courts located
                    in {LEGAL.governingState} have exclusive jurisdiction, and each party consents to them. Nothing prevents either party from seeking urgent injunctive relief
                    to protect confidential information or intellectual property. Consumers keep any rights that the law of their state gives them and that cannot be waived.
                </P>
            </>
        ),
    },
    {
        id: 'general',
        title: 'General terms',
        body: (
            <>
                <UL>
                    <li><strong>Entire agreement.</strong> These Terms, the Privacy Policy, the SMS Terms and any Proposal are the whole agreement about their subject and replace earlier discussions.</li>
                    <li><strong>Changes.</strong> We may update these Terms by posting the new version with a new effective date; changes do not affect a signed Proposal unless both parties agree. Continued use of the Site after a change means you accept it.</li>
                    <li><strong>Severability and waiver.</strong> If a provision is unenforceable, the rest stays in effect; not enforcing a provision is not a waiver.</li>
                    <li><strong>Assignment.</strong> You may not assign these Terms without our written consent; we may assign them in a merger or sale of the business.</li>
                    <li><strong>Force majeure.</strong> Neither party is liable for delays beyond its reasonable control, such as outages of internet, cloud or AI providers, natural disasters or acts of government.</li>
                    <li><strong>Electronic communications.</strong> You agree that we may communicate with you and provide notices electronically, and that electronic signatures are valid.</li>
                    <li><strong>Relationship.</strong> We are independent contractors; nothing creates a partnership, employment or agency.</li>
                </UL>
            </>
        ),
    },
    {
        id: 'contact-us',
        title: 'Contact us',
        body: (
            <>
                <P>
                    Questions about these Terms? Email <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> or call <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. We are
                    an online business without a public office, so please contact us electronically or by phone.
                </P>
            </>
        ),
    },
];

export default function TermsPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('Terms and Conditions', DESCRIPTION, '/terms', LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Terms and Conditions', path: '/terms' },
                    ]),
                ]}
            />
            <LegalDocument
                title="Terms and Conditions"
                intro={
                    <>
                        <P>
                            These terms explain the rules for using the Xtek AI website and the basics of how we work with clients: how engagements start, how we get paid,
                            who owns what, how we use AI, and what happens if something goes wrong. Please read them together with our{' '}
                            <A href="/privacy">Privacy Policy</A>.
                        </P>
                    </>
                }
                sections={sections}
                otherPage={{ href: '/privacy', label: 'Read our Privacy Policy' }}
            />
        </>
    );
}
