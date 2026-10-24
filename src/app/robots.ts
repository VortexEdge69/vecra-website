import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PRIVATE_PATHS = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/checkout/",
  "/payment/",
  "/login",
  "/my-transactions",
  "/custom-plan",
  "/email-verification",
  "/verification-in-progress",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      // Answer engines and AI search crawlers are welcome on public pages.
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
