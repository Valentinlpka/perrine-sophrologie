'use client';

import { supabase } from '@/lib/supabase';
import { Article } from '@/types/article'; // Importez le type Article
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);  // Spécifiez le type ici

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching articles:', error);
        else setArticles(data || []);  // Assurez-vous que data est un tableau
    }

    async function deleteArticle(id: number) {  // Spécifiez le type de id
        if (confirm('Are you sure you want to delete this article?')) {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);

            if (error) console.error('Error deleting article:', error);
            else fetchArticles();
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Manage Articles</h1>
            <Link href="/admin/articles/new" className="bg-blue-500 text-white px-4 py-2 rounded">
                New Article
            </Link>
            <ul className="mt-4">
                {articles.map((article) => (
                    <li key={article.id} className="border-b py-2">
                        {article.title}
                        <Link href={`/admin/articles/edit/${article.id}`} className="ml-4 text-blue-500">
                            Edit
                        </Link>
                        <button onClick={() => deleteArticle(article.id)} className="ml-4 text-red-500">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}