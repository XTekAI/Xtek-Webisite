import { getAllPosts } from '../../lib/blogLoader';
import { serviceAreas } from '../../content/service-areas';
import { CONTACT, SITE_URL, SOCIAL_LINKS, absoluteUrl } from '../../lib/seo';

export const dynamic = 'force-static';

// Plain-text site summary for AI assistants (https://llmstxt.org), generated
// from the same data as the pages so it never drifts out of date.
export function GET() {
    const lines = [
        '# Xtek AI',
        '',
        '> Xtek AI is a US-based AI implementation agency. We help businesses automate workflows, accounting and admin work, deploy AI agents and chatbots, and grow through AEO (Answer Engine Optimization) marketing, web design and development.',
        '',
        '## Services',
        '- SmartFlow AI: Growth Audit - in-depth analysis of marketing and sales processes to find bottlenecks and maximize revenue flow.',
        '- Executive AI: Admin Audit - automation of invoicing, inventory, document workflows and financial reporting.',
        '- AI Agents & Chatbots - conversational text and voice agents integrated with your business data.',
        '- Digital Marketing & AEO - traditional SEO plus optimization for AI answer engines.',
        '- Web Design & Development - fast, optimized websites with technical SEO built in.',
        '- Content Creation - copywriting, visual production and social media management.',
        `- [Next Horizon](${absoluteUrl('/next-horizon')}) - closed-loop internal platform with departmental silos, private AI and unified meetings for government, healthcare and corporate teams.`,
        '',
        '## Key pages',
        `- [Home](${SITE_URL}/): overview of services and contact form`,
        `- [Success Stories](${absoluteUrl('/stories')}): client case studies with measured results`,
        `- [Blog](${absoluteUrl('/blog')}): articles on AI automation and digital marketing`,
        `- [Privacy Policy](${absoluteUrl('/privacy')})`,
        `- [Terms of Use](${absoluteUrl('/terms')})`,
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
