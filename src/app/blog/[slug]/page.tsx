// app/articles/[slug]/page.tsx
"use client";

import { supabase } from "@/lib/supabase";
import {
    BookmarkIcon,
    ChevronLeftIcon,
    ClockIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
    id: number;
    title: string;
    content: string;
    image_url: string;
    description: string;
    author_name: string;
    reading_time: number;
    category: string;
    published_at: string;
    slug: string;
}

export default function ArticleDetail({
    params,
}: {
    params: { slug: string };
}) {
    const [article, setArticle] = useState<Article | null>(null);
    const [articlesRecents, setArticlesRecents] = useState<Article[]>([]);
    const [articlesLies, setArticlesLies] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("slug", params.slug)
                .single();

            if (error) {
                console.error("Error fetching article:", error);
                return;
            }

            setArticle(data);

            // Charger les articles récents
            const { data: recents } = await supabase
                .from("articles")
                .select("*")
                .neq("slug", params.slug)
                .eq("is_active", true)
                .order("published_at", { ascending: false })
                .limit(3);

            if (recents) {
                setArticlesRecents(recents);
            }

            // Charger les articles de la même catégorie
            if (data.category) {
                const { data: lies } = await supabase
                    .from("articles")
                    .select("*")
                    .eq("category", data.category)
                    .neq("slug", params.slug)
                    .eq("is_active", true)
                    .limit(3);

                if (lies) {
                    setArticlesLies(lies);
                }
            }

            setLoading(false);
        };

        fetchArticle();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!article) {
        return <div>Article non trouvé</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section avec image */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={article.image_url || "/placeholder-image.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/articles"
                            className="inline-flex items-center text-white mb-4 hover:underline"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-2" />
                            Retour aux articles
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {article.title}
                        </h1>
                        <p className="text-xl mb-6">{article.description}</p>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <UserIcon className="h-5 w-5 mr-2" />
                                <span>{article.author_name}</span>
                            </div>
                            <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 mr-2" />
                                <span>{article.reading_time} min de lecture</span>
                            </div>
                            <div className="flex items-center">
                                <BookmarkIcon className="h-5 w-5 mr-2" />
                                <span>{article.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu de l'article */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <article className="bg-white rounded-lg shadow-lg p-8">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>

                {/* Articles récents */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Articles récents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articlesRecents.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.slug}`}
                                className="block group"
                            >
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={article.image_url || "/placeholder-image.jpg"}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm text-indigo-600 mb-2">
                                            {article.category}
                                        </p>
                                        <h3 className="font-bold mb-2 group-hover:text-indigo-600">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {article.reading_time} min de lecture
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Articles liés */}
                {articlesLies.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">Dans la même catégorie</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {articlesLies.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/blog/${article.slug}`}
                                    className="block group"
                                >
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={article.image_url || "/placeholder-image.jpg"}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="text-sm text-indigo-600 mb-2">
                                                {article.category}
                                            </p>
                                            <h3 className="font-bold mb-2 group-hover:text-indigo-600">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {article.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer avec métadonnées */}
            <footer className="bg-gray-50 border-t border-gray-200 mt-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                            <span>
                                Publié le{" "}
                                {format(new Date(article.published_at), "dd MMMM yyyy", {
                                    locale: fr,
                                })}
                            </span>
                            <span>•</span>
                            <span>{article.reading_time} min de lecture</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Par {article.author_name}</span>
                            <span>•</span>
                            <span>Dans {article.category}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
