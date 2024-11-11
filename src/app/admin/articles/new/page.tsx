'use client';

import ArticleForm from '@/components/ArticleForm';

export default function NewArticlePage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">New Article</h1>
            <ArticleForm />
        </div>
    );
}