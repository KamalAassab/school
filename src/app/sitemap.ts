import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content";

const routes = [
  "",
  "/presentation",
  "/pedagogie",
  "/vie-scolaire",
  "/cambridge",
  "/recrutement",
  "/contact",
  "/inscription",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
