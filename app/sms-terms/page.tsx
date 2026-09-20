import type { Metadata } from 'next';
import LegalDocument, { A, P, UL, type LegalSection } from '../../components/LegalDocument';
import JsonLd from '../../components/JsonLd';
import { LEGAL } from '../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../lib/seo';

const TITLE = 'SMS Terms and Messaging Policy | Xtek AI';
const DESCRIPTION =
    'Terms for text messages from Xtek AI: how you opt in, message types and frequency, rates, how to opt out with STOP, how to get HELP, and how we protect your mobile information.';

export const metadata: Metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/sms-terms',
});

const sections: LegalSection[] = [
    {
        id: 'program',
        title: 'Program description',
        body: (
            <>
                <P>
                    {LEGAL.name} sends text (SMS/MMS) messages to people who have agreed to receive them (the &ldquo;Messaging Program&rdquo;). The messages are sent by Xtek
                    AI, using an automated system and a third-party messaging platform, to the mobile number you gave us on our website. There are two kinds:
                </P>
                <UL>
                    <li>
                        <strong>Service messages</strong> (also sent by email): replies and follow-ups about your inquiry or quote request; meeting scheduling, confirmations and
                        reminders; and updates about services and projects you have with us.
                    </li>
                    <li>
                        <strong>Marketing messages</strong> (optional): offers, promotions and news about our AI automation, marketing and web services.
                    </li>
                </UL>
                <P>We do not use the Messaging Program to send messages about loans, debt, gambling, adult content or other prohibited content, and we do not send messages to numbers that did not opt in.</P>
            </>
        ),
    },
    {
        id: 'opt-in',
        title: 'How you join and your consent',
        body: (
            <>
                <P>You join by checking the boxes on one of our contact forms (the contact form on the home page, the landing-page form, or the Next Horizon request form) and submitting it with your mobile number. None of the boxes is pre-selected.</P>
                <UL>
                    <li>
                        <strong>Service messages: required to submit a form.</strong> You agree to receive service messages by text and email about your inquiry and appointments.
                        It is required because we use these messages to reply to you and manage your appointments. You can opt out of texts at any time by replying STOP.
                    </li>
                    <li>
                        <strong>Marketing messages: optional.</strong> Marketing texts and marketing emails each have their own separate box. Leaving them unchecked does not
                        affect your inquiry or your services, and <strong>consent to marketing is not a condition of any purchase</strong>.
                    </li>
                    <li>You may also opt in verbally or in writing during a conversation with us, and we will record it.</li>
                    <li>You confirm that you are the subscriber or authorized user of the number and are at least 18 years old.</li>
                    <li>We may send a message confirming your subscription and how to opt out.</li>
                </UL>
                <P>We keep a record of each consent (the wording you accepted, the date and time, the page you used and technical details such as your browser and IP address) so we can prove it if asked.</P>
            </>
        ),
    },
    {
        id: 'frequency-costs',
        title: 'Message frequency and costs',
        body: (
            <>
                <P>
                    <strong>Message frequency varies</strong> depending on your inquiry or engagement. Xtek AI does not charge for messages, but{' '}
                    <strong>message and data rates may apply</strong> according to your mobile plan. Check with your carrier for details.
                </P>
            </>
        ),
    },
    {
        id: 'opt-out',
        title: 'How to opt out (STOP)',
        body: (
            <>
                <P>
                    You can cancel at any time by replying <strong>STOP</strong> to any message. You can also reply END, CANCEL, UNSUBSCRIBE or QUIT, or contact us at{' '}
                    <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> or <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. Replying STOP ends all text messages from Xtek AI, both service and marketing. After you opt out we will send one final message
                    confirming it and then stop texting you, except where the law allows a reply to a request you made. To join again, submit the form again or reply START.
                </P>
            </>
        ),
    },
    {
        id: 'help',
        title: 'Help and support (HELP)',
        body: (
            <>
                <P>
                    Reply <strong>HELP</strong> to any message for assistance, or contact us at <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> or{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>.
                </P>
            </>
        ),
    },
    {
        id: 'carriers',
        title: 'Carriers and delivery',
        body: (
            <>
                <P>
                    The Messaging Program is available on participating US mobile carriers and to US phone numbers. Carriers and Xtek AI are not liable for delayed or
                    undelivered messages. Delivery depends on your device, coverage and carrier, and we cannot guarantee it.
                </P>
            </>
        ),
    },
    {
        id: 'privacy',
        title: 'Privacy and mobile information',
        body: (
            <>
                <P>
                    We handle your mobile number and messaging data as described in our <A href="/privacy">Privacy Policy</A>.
                </P>
                <UL>
                    <li><strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong></li>
                    <li>Text messaging originator opt-in data and consent will not be shared with any third party for their own use.</li>
                    <li>
                        We do share information, including your number and opt-in or opt-out status, with service providers that help us deliver messages, such as our
                        messaging platform provider and mobile carriers, only to provide the Messaging Program and under confidentiality obligations.
                    </li>
                </UL>
            </>
        ),
    },
    {
        id: 'number-changes',
        title: 'Changed or reassigned numbers',
        body: (
            <>
                <P>
                    If you change or give up your mobile number, tell us so we can stop texting the old one. We may use tools that check whether a number has been reassigned so that
                    we do not text someone who did not consent.
                </P>
            </>
        ),
    },
    {
        id: 'changes',
        title: 'Changes to these terms',
        body: (
            <>
                <P>
                    We may update these SMS Terms. The latest version is always on this page with its effective date. These terms are part of, and should be read with, our{' '}
                    <A href="/terms">Terms and Conditions</A>; if they conflict for text messaging, these SMS Terms control.
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
                    Xtek AI · <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> · <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. We are an online business without a
                    public office, so please contact us electronically or by phone.
                </P>
            </>
        ),
    },
];

export default function SmsTermsPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('SMS Terms and Messaging Policy', DESCRIPTION, '/sms-terms', LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'SMS Terms', path: '/sms-terms' },
                    ]),
                ]}
            />
            <LegalDocument
                title="SMS Terms and Messaging Policy"
                intro={
                    <>
                        <P>
                            These terms explain the Xtek AI text-messaging program: what messages you may get, how often, what they cost, how to stop them with{' '}
                            <strong>STOP</strong> and how to get help with <strong>HELP</strong>. We send two kinds of texts: <strong>service messages</strong> about your inquiry and appointments (you agree to these when you submit a form) and <strong>marketing messages</strong> (optional, with their own separate box).
                        </P>
                        <P>
                            <strong>Program name:</strong> Xtek AI Messaging · <strong>Sender:</strong> Xtek AI · <strong>Support:</strong>{' '}
                            <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A>, <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>
                        </P>
                    </>
                }
                sections={sections}
                otherPage={{ href: '/privacy', label: 'Read our Privacy Policy' }}
            />
        </>
    );
}
