import { getAllPosts } from '../../lib/blogLoader';
import { serviceAreas } from '../../content/service-areas';
import { services } from '../../content/services';
import { CONTACT, SITE_URL, SOCIAL_LINKS, absoluteUrl } from '../../lib/seo';

export const dynamic = 'force-static';

// Plain-text site summary for AI assistants (https://llmstxt.org), generated
// from the same data as the pages so it never drifts out of date.
export function GET() {
    const lines = [
        '# Xtek AI',
        '',
        '> Xtek AI is an AI implementation agency based in New Jersey, USA, founded by Lisandro Orellana (Founder & CEO). We help businesses automate workflows, accounting and admin work, deploy AI agents and chatbots, and grow through AEO (Answer Engine Optimization) marketing, web design and development.',
        '',
        '## Services',
        ...services.map((s) => `- [${s.en.name}](${absoluteUrl(`/services/${s.slug}`)}) - ${s.en.metaDescription}`),
        `- [Digital Products](${absoluteUrl('/products')}) - subscription apps for local businesses: MyLoyalink (https://www.myloyalink.com/en - stamp-based loyalty cards in Apple Wallet and Google Wallet, no app required, from $29/month with a 14-day free trial) and a digital menu for restaurants (in development).`,
        `- [Next Horizon](${absoluteUrl('/next-horizon')}) - closed-loop internal platform with departmental silos, private AI and unified meetings for government, healthcare and corporate teams.`,
        '',
        '## Key pages',
        `- [Home](${SITE_URL}/): overview of services and contact form`,
        `- [Success Stories](${absoluteUrl('/stories')}): real client projects (booking systems, AI agents, websites, loyalty apps)`,
        `- [Blog](${absoluteUrl('/blog')}): articles on AI automation and digital marketing`,
        `- [Privacy Policy](${absoluteUrl('/privacy')})`,
        `- [Terms and Conditions](${absoluteUrl('/terms')})`,
        `- [SMS Terms](${absoluteUrl('/sms-terms')}): text-message program terms (opt-in, STOP/HELP, rates)`,
        '',
        '## Service areas',
        ...serviceAreas.map(
            (area) => `- [${area.city}, ${area.state}](${absoluteUrl(`/service-areas/${area.id}`)}): ${area.metaTitle}`
        ),
        '',
        '## Blog articles',
        ...getAllPosts().map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)})`),
        '',
        '## Contact',
        `- Email: ${CONTACT.email}`,
        `- Phone: ${CONTACT.phone}`,
        `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
        `- Instagram: ${SOCIAL_LINKS.instagram}`,
        `- Facebook: ${SOCIAL_LINKS.facebook}`,
        `- Google Business Profile (client reviews): ${SOCIAL_LINKS.google}`,
        '',
    ];

    return new Response(lines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
