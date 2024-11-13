import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://perrine-sophrologie.vercel.app";

  // Récupérer tous les articles actifs
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("is_active", true);

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Pages d'articles
  const articlePages =
    articles?.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "weekly",
      priority: 0.6,
    })) || [];

  return [...staticPages, ...articlePages];
}
