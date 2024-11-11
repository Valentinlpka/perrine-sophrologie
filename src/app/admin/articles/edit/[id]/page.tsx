'use client';

import ArticleForm from '@/components/ArticleForm';
import { supabase } from '@/lib/supabase';
import { Article } from '@/types/article'; // Importez le type Article
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchArticle() {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching article:', error);
                router.push('/admin/articles');
            } else {
                setArticle(data as Article);  // Cast data to Article type
            }
        }
        fetchArticle();
    }, [params.id, router]);

    if (!article) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Editer l&apos;article</h1>
            <ArticleForm article={article} />
        </div>
    );
}