import type { MetadataRoute } from "next";

/** Unlisted: ask every crawler to stay out. Headers add X-Robots-Tag as well. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
