import { generateMetadata } from '@/lib/metadata';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import BlogContent from './BlogContent';

// Métadonnées
export const metadata: Metadata = generateMetadata({
    title: 'Blog',
    description: 'Articles et conseils sur la sophrologie, le bien-être et la gestion du stress.'
});

// Chargement initial des données côté serveur
async function getInitialData() {
    const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });

    const { data: categories } = await supabase
        .from('articles')
        .select('category')
        .eq('is_active', true);

    // Calculer le nombre d'articles par catégorie
    const categoryCount = categories?.reduce((acc: { [key: string]: number }, article) => {
        if (article.category) {
            acc[article.category] = (acc[article.category] || 0) + 1;
        }
        return acc;
    }, {});

    const formattedCategories = Object.entries(categoryCount || {}).map(([name, count]) => ({
        name,
        count
    }));

    return {
        articles: articles || [],
        categories: formattedCategories
    };
}

// Page principale
export default async function BlogPage() {
    const initialData = await getInitialData();

    return <BlogContent initialData={initialData} />;
}