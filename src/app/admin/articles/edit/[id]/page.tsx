'use client';

import ArticleForm from '@/components/ArticleForm';
import { supabase } from '@/lib/supabase';
import { Article } from '@/types/article';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
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
                const { image } = data as Article;
                if (image) {
                    const { data: { publicUrl } } = await supabase.storage.from('images').getPublicUrl(image);
                    setPreviewImage(publicUrl);
                }
                setArticle(data as Article);
            }
        }

        fetchArticle();
    }, [params.id, router]);

    if (!article) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Editer l&apos;article</h1>
            <ArticleForm article={article} previewImage={previewImage} />
        </div>
    );
}