'use client';

import { supabase } from '@/lib/supabase';
import { Article } from '@/types/article';
import { ArrowLeftOnRectangleIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = Cookies.get('admin_auth');
        if (!isAuthenticated) {
            router.push('/admin/login');
            return;
        }
        fetchArticles();
    }, [router]);

    const fetchArticles = async () => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('published_at', { ascending: false });

            if (error) throw error;
            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteArticle = async (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            try {
                const { error } = await supabase
                    .from('articles')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchArticles();
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleLogout = () => {
        Cookies.remove('admin_auth');
        router.push('/admin/login');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header avec bouton de déconnexion */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Administration
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Articles</h2>
                    <Link
                        href="/admin/articles/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Nouvel Article
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {articles.map((article) => (
                            <li key={article.id} className="hover:bg-gray-50">
                                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">
                                            {article.title}
                                        </h3>
                                        <div className="mt-1 flex items-center">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {article.is_active ? 'Actif' : 'Inactif'}
                                            </span>
                                            {article.category && (
                                                <span className="ml-2 text-sm text-gray-500">
                                                    {article.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Link
                                            href={`/blog/${article.slug}`}
                                            target="_blank"
                                            className="text-gray-400 hover:text-gray-500"
                                            title="Voir l'article"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={`/admin/articles/edit/${article.id}`}
                                            className="text-orange-300 hover:text-orange-400"
                                            title="Modifier"
                                        >
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => deleteArticle(article.id)}
                                            className="text-red-400 hover:text-red-500"
                                            title="Supprimer"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {articles.length === 0 && (
                            <li className="px-4 py-8 text-center text-gray-500">
                                Aucun article pour le moment.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}