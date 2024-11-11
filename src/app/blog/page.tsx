// app/blog/page.tsx
'use client';

import { AdjustmentsHorizontalIcon, ClockIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface Article {
    id: number;
    title: string;
    description: string;
    image_url: string;
    author_name: string;
    category: string;
    reading_time: number;
    published_at: string;
    slug: string;
}

interface Category {
    name: string;
    count: number;
}

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const articlesPerPage = 9;

    const supabase = createClientComponentClient();



    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            let query = supabase
                .from('articles')
                .select('*', { count: 'exact' })
                .eq('is_active', true)
                .order('published_at', { ascending: false });

            if (selectedCategory) {
                query = query.eq('category', selectedCategory);
            }

            if (searchQuery) {
                query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
            }

            // Pagination
            const start = (currentPage - 1) * articlesPerPage;
            const end = start + articlesPerPage - 1;
            query = query.range(start, end);

            const { data: articles, count } = await query;

            if (articles && count) {
                setArticles(articles);
                setTotalPages(Math.ceil(count / articlesPerPage));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des articles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetch = debounce(fetchArticles, 300);

    const fetchCategories = useCallback(async () => {

        const { data: articles } = await supabase
            .from('articles')
            .select('category')
            .eq('is_active', true);

        if (articles) {
            const categoryCount = articles.reduce((acc: { [key: string]: number }, article) => {
                if (article.category) {
                    acc[article.category] = (acc[article.category] || 0) + 1;
                }
                return acc;
            }, {});

            const formattedCategories = Object.entries(categoryCount).map(([name, count]) => ({
                name,
                count
            }));

            setCategories(formattedCategories);
        }

        // ... votre code existant
    }, []); // pas de dépendances si la fonction ne dépend de rien d'externe

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    useEffect(() => {
        debouncedFetch();
        return () => debouncedFetch.cancel();
    }, [selectedCategory, searchQuery, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* En-tête du blog */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Notre Blog
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                            Découvrez nos derniers articles, conseils et actualités
                        </p>
                    </div>
                </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-lg">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
                            placeholder="Rechercher un article..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-300 focus:border-orange-300 rounded-md"
                        >
                            <option value="">Toutes les catégories</option>
                            {categories.map((category) => (
                                <option key={category.name} value={category.name}>
                                    {category.name} ({category.count})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Liste des articles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg" />
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-500">Aucun article trouvé</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.slug}`}
                                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <Image
                                        src={article.image_url || '/images/placeholder.jpg'}
                                        alt={article.title}
                                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 text-sm font-medium bg-white rounded-full text-orange-300">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-300 transition-colors duration-300">
                                        {article.title}
                                    </h2>
                                    <p className="mt-3 text-gray-600 line-clamp-2">
                                        {article.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <UserIcon className="h-4 w-4 mr-1" />
                                            {article.author_name}
                                        </div>
                                        <div className="flex items-center">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {article.reading_time} min
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {format(new Date(article.published_at), 'dd MMMM yyyy', { locale: fr })}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Précédent
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === i + 1
                                        ? 'z-10 bg-indigo-50 border-orange-300 text-orange-300'
                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Suivant
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}