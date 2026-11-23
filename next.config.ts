import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the same Wi-Fi load the dev server (http://10.0.0.97:3000).
  allowedDevOrigins: ["10.0.0.97"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Off-topic blog posts removed on 2026-11-23. Send their old URLs to the closest page.
  async redirects() {
    const removed: Record<string, string> = {
      "quantum-computing-breakthroughs-2024-the-new-frontiers-in-technology-ai-and-global-regulation": "/blog",
      "the-rising-stars-of-ai-image-generators-a-2026-curated-list": "/blog",
      "aws-ai-factories-a-groundbreaking-leap-in-ai-application-development": "/blog",
      "the-rise-and-thrive-of-the-digital-marketing-agency-scene-in-raleigh-nc": "/services/digital-marketing-aeo",
      "understanding-pydantic-ai-the-revolutionary-python-agent-framework": "/services/ai-agents-chatbots",
      "your-complete-guide-to-digital-marketing-agencies": "/services/digital-marketing-aeo",
      "exploring-the-world-of-effective-context-engineering-for-ai-agents": "/services/ai-agents-chatbots",
      "unveiling-the-value-of-a-digital-marketing-agency": "/services/digital-marketing-aeo",
    };
    return Object.entries(removed).map(([slug, destination]) => ({
      source: `/blog/${slug}`,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
