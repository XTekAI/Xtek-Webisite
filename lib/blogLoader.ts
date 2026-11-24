import storedPosts from '../content/blog/posts.json';
import { clampDescription } from './seo';

const HTML_TAGS = 'a|b|i|em|strong|p|div|span|ul|ol|li|h[1-6]|blockquote|br|hr|table|thead|tbody|tr|td|th|section|article|code|pre';

/**
 * Most post bodies were pasted with stray spaces inside tags ("< p", "< /a>",
 * "</li >"). Browsers treat those as plain text, so headings and paragraphs
 * showed up as raw markup and links were never closed. Repair them here.
 */
function normalizeHtml(html: string): string {
    return html
        .replace(new RegExp(`<\\s*/\\s*(${HTML_TAGS})\\s*>`, 'gi'), '</$1>')
        .replace(new RegExp(`<\\s+(${HTML_TAGS})\\b`, 'gi'), '<$1');
}

/**
 * One entry per post. The n8n "XTEK · Blog SEO" workflow appends new posts to this file through
 * GitHub, so every field except slug/title/date/content is optional.
 */
interface StoredPost {
    slug: string;
    title: string;
    seoTitle?: string;
    description?: string;
    date: string; // YYYY-MM-DD
    tags?: string[];
    image?: string;
    /** 3-4 short "Label: text" points shown in the Key Takeaways box. */
    takeaways?: string[];
    content: string; // HTML
}

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readingTime?: string;
    category?: string;
    tags: string[];
    excerpt?: string;
    featuredImage?: string;
    content: string;
    id: string;
    desc?: string;
    image?: string;
    seoTitle: string;
    seoDescription: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-03-08" -> "Mar 08, 2026" (the display format the views and toIsoDate expect). */
function displayDate(iso: string): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    if (!m) return iso || '';
    return `${MONTHS[Number(m[2]) - 1]} ${m[3]}, ${m[1]}`;
}

function readingTime(html: string): string {
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 230))} min`;
}


const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const textOf = (html: string) =>
    html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60) || 'section';

/**
 * Gives every article the same structure, whoever wrote it (a person or the n8n blog workflow):
 * ids on the section titles, a Key Takeaways box and a Table of Contents (unless the article already has
 * its own), and the FAQ turned into drop-downs. Styling lives in app/globals.css (.blog-body).
 */
function enhanceContent(html: string, takeaways?: string[]): string {
    let out = html;
    const hasTakeaways = /Key Takeaways/i.test(out);
    const hasToc = /Table of Contents/i.test(out);

    // 1) ids on h2 (reused when the article already has them) + the list of sections
    const used = new Set<string>();
    const headings: { id: string; text: string }[] = [];
    out = out.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs: string, inner: string) => {
        const text = textOf(inner);
        const existing = /\bid="([^"]+)"/.exec(attrs);
        let id = existing ? existing[1] : slugify(text);
        if (!existing) {
            const base = id;
            let n = 2;
            while (used.has(id)) id = `${base}-${n++}`;
        }
        used.add(id);
        if (!/Key Takeaways|Table of Contents/i.test(text)) headings.push({ id, text });
        return existing ? match : `<h2${attrs} id="${id}">${inner}</h2>`;
    });

    // 2) FAQ section: each question + its answer becomes a drop-down
    out = out.replace(/(<h2[^>]*>(?:(?!<\/h2>)[\s\S])*(?:Frequently asked questions|FAQ)(?:(?!<\/h2>)[\s\S])*<\/h2>)([\s\S]*?)(?=<h2\b|$)/i, (_m, head: string, body: string) => {
        const converted = body.replace(
            /<h3[^>]*>([\s\S]*?)<\/h3>\s*(<p[^>]*>[\s\S]*?<\/p>)/gi,
            (_q, question: string, answer: string) => `<details class="blog-faq"><summary>${textOf(question)}</summary><div>${answer}</div></details>`,
        );
        // Older articles write each question/answer as <div><p bold>question</p><p>answer</p></div>
        const convertedDivs = converted.replace(
            /<div[^>]*>\s*<p[^>]*font-weight:\s*bold[^>]*>([\s\S]*?)<\/p>\s*(<p[^>]*>[\s\S]*?<\/p>)\s*<\/div>/gi,
            (_q, question: string, answer: string) => `<details class="blog-faq"><summary>${textOf(question)}</summary><div>${answer}</div></details>`,
        );
        return head + convertedDivs;
    });

    // 3) Key Takeaways + Table of Contents, right after the opening paragraph
    const lead: string[] = [];
    if (takeaways && takeaways.length && !hasTakeaways) {
        const items = takeaways.map((t) => {
            const m = /^(.{3,45}?):\s+([\s\S]+)$/.exec(t.trim());
            return `<li>${m ? `<strong>${escapeHtml(m[1])}:</strong> ${escapeHtml(m[2])}` : escapeHtml(t)}</li>`;
        });
        lead.push(`<aside class="blog-callout"><h2>Key Takeaways</h2><ul>${items.join('')}</ul></aside>`);
    }
    if (!hasToc && headings.length >= 3) {
        const items = headings.map((h) => `<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`);
        lead.push(`<nav class="blog-callout blog-toc" aria-label="Table of contents"><h2>Table of Contents</h2><ul>${items.join('')}</ul></nav>`);
    }
    if (lead.length) {
        const firstP = /^\s*<p[\s\S]*?<\/p>/i.exec(out);
        out = firstP ? out.slice(0, firstP[0].length) + lead.join('') + out.slice(firstP[0].length) : lead.join('') + out;
    }
    return out;
}

function toBlogPost(post: StoredPost): BlogPost {
    const tags = post.tags ?? [];
    const content = normalizeHtml(post.content || '');
    const desc = post.description || '';
    return {
        id: post.slug,
        slug: post.slug,
        title: post.title,
        seoTitle: post.seoTitle || post.title,
        seoDescription: clampDescription(desc),
        date: displayDate(post.date),
        readingTime: readingTime(content),
        category: tags[0] || 'General',
        tags,
        excerpt: desc,
        desc,
        featuredImage: post.image || '',
        image: post.image || '',
        content: enhanceContent(content, post.takeaways),
    };
}

export function getAllPosts(): BlogPost[] {
    return (storedPosts as StoredPost[])
        .slice()
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .map(toBlogPost);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const allPosts = getAllPosts();
    return allPosts.find(post => post.slug === slug);
}

/** Other posts to link from a post page: same-tag posts first, then newest. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
    const all = getAllPosts();
    const current = all.find((post) => post.slug === slug);
    const others = all.filter((post) => post.slug !== slug);
    if (!current) return others.slice(0, limit);

    const shared = (post: BlogPost) => post.tags.filter((tag) => current.tags.includes(tag)).length;
    return others
        .map((post, index) => ({ post, index, score: shared(post) }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .slice(0, limit)
        .map(({ post }) => post);
}
