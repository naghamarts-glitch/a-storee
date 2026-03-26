import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

export const useSEO = ({
  title,
  description,
  keywords = "فن، تربية فنية، كتب، خادمات، تصميم، طباعة",
  image = "https://nagham-art-hub.com/og-image.jpg",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
}: SEOConfig) => {
  useEffect(() => {
    // Page Title
    document.title = `${title} | Nagham Art Hub`;

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Open Graph
    const setMetaProperty = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:image", image);
    setMetaProperty("og:url", url);
    setMetaProperty("og:type", type);

    // Twitter Card
    const setTwitterMeta = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) {
        existing.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setTwitterMeta("twitter:card", "summary_large_image");
    setTwitterMeta("twitter:title", title);
    setTwitterMeta("twitter:description", description);
    setTwitterMeta("twitter:image", image);

    // Canonical URL
    const canonical = document.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute("href", url);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [title, description, keywords, image, url, type]);
};
