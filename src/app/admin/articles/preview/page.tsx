// app/articles/preview/page.tsx
'use client';

import { BookmarkIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PreviewArticle {
    title: string;
    content: string;
    image_url: string;
    description: string;
    author_name: string;
    reading_time: number;
    category: string;
    published_at: string;
}

export default function ArticlePreview() {
    const [article, setArticle] = useState<PreviewArticle | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const articleData = {
            title: decodeURIComponent(searchParams.get('title') || ''),
            content: decodeURIComponent(searchParams.get('content') || ''),
            image_url: decodeURIComponent(searchParams.get('image_url') || ''),
            description: decodeURIComponent(searchParams.get('description') || ''),
            author_name: decodeURIComponent(searchParams.get('author_name') || ''),
            reading_time: parseInt(searchParams.get('reading_time') || '0'),
            category: decodeURIComponent(searchParams.get('category') || ''),
            published_at: searchParams.get('published_at') || new Date().toISOString(),
        };
        setArticle(articleData);
    }, [searchParams]);

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Bannière d'aperçu */}
            <div className="bg-indigo-600 text-white px-4 py-2 text-center">
                Mode aperçu - Les modifications ne sont pas enregistrées
                <button
                    onClick={() => window.close()}
                    className="ml-4 px-3 py-1 bg-white text-indigo-600 rounded-md text-sm hover:bg-indigo-50"
                >
                    Fermer l'aperçu
                </button>
            </div>

            {/* Hero Section avec image */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={article.image_url || '/placeholder-image.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
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
            </main>

            {/* Footer avec métadonnées */}
            <footer className="bg-gray-50 border-t border-gray-200 mt-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                            <span>Publié le {format(new Date(article.published_at), 'dd MMMM yyyy', { locale: fr })}</span>
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