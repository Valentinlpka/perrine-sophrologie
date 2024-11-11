// app/admin/articles/page.tsx
'use client';

import { supabase } from '@/lib/supabase';
import { Article } from '@/types/article';
import {
    ArrowPathIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortField, setSortField] = useState<'title' | 'published_at' | 'category'>('published_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    useEffect(() => {
        fetchArticles();
    }, [sortField, sortDirection, selectedStatus]);

    async function fetchArticles() {
        setIsLoading(true);
        try {
            let query = supabase
                .from('articles')
                .select('*')
                .order(sortField, { ascending: sortDirection === 'asc' });

            if (selectedStatus !== 'all') {
                query = query.eq('is_active', selectedStatus === 'active');
            }

            const { data, error } = await query;

            if (error) throw error;

            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteArticle(id: number) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

        setIsDeleting(id);
        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setIsDeleting(null);
        }
    }

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSort = (field: typeof sortField) => {
        if (field === sortField) {
            setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestion des Articles
                    </h1>
                    <Link
                        href="/admin/articles/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Nouvel Article
                    </Link>
                </div>

                {/* Filtres et recherche */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full md:w-auto">
                            <div className="relative">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
                                className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-300 focus:border-orange-300 rounded-md"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="active">Actifs</option>
                                <option value="inactive">Inactifs</option>
                            </select>
                            <button
                                onClick={() => fetchArticles()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
                            >
                                <ArrowPathIcon className="h-5 w-5 mr-2" />
                                Actualiser
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table des articles */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('title')}
                                    >
                                        <div className="flex items-center">
                                            Titre
                                            {sortField === 'title' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUpIcon className="h-4 w-4 ml-1" /> :
                                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('category')}
                                    >
                                        <div className="flex items-center">
                                            Catégorie
                                            {sortField === 'category' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUpIcon className="h-4 w-4 ml-1" /> :
                                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('published_at')}
                                    >
                                        <div className="flex items-center">
                                            Date de publication
                                            {sortField === 'published_at' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUpIcon className="h-4 w-4 ml-1" /> :
                                                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            <div className="flex justify-center">
                                                <ArrowPathIcon className="h-6 w-6 text-gray-400 animate-spin" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredArticles.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            Aucun article trouvé
                                        </td>
                                    </tr>
                                ) : (
                                    filteredArticles.map((article) => (
                                        <tr key={article.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{article.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {article.created_at
                                                        ? format(new Date(article.created_at), 'dd MMMM yyyy', { locale: fr })
                                                        : 'Non publié'
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${article.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {article.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={`/blog/${article.slug}`}
                                                        target="_blank"
                                                        className="text-gray-400 hover:text-gray-500"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/articles/edit/${article.id}`}
                                                        className="text-orange-300 hover:text-orange-400"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteArticle(article.id)}
                                                        disabled={isDeleting === article.id}
                                                        className="text-red-400 hover:text-red-500 disabled:opacity-50"
                                                    >
                                                        {isDeleting === article.id ? (
                                                            <ArrowPathIcon className="h-5 w-5 animate-spin" />
                                                        ) : (
                                                            <TrashIcon className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}