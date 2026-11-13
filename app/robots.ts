import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

// Search engines and AI assistants are welcome to read and cite the public site. They are listed by name
// so the policy is explicit; /api/ (form endpoints) is not content and stays out of every index.
const AI_CRAWLERS = [
    'GPTBot', // OpenAI (training)
    'OAI-SearchBot', // ChatGPT search
    'ChatGPT-User', // ChatGPT browsing on behalf of a user
    'ClaudeBot', // Anthropic
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot', // Perplexity
    'Perplexity-User',
    'Google-Extended', // Gemini / AI Overviews grounding
    'Applebot-Extended', // Apple Intelligence
    'Bingbot', // Bing and Copilot
    'CCBot', // Common Crawl (used by many AI models)
    'meta-externalagent', // Meta AI
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/', disallow: '/api/' },
            { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
