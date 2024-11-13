import { generateMetadata as baseGenerateMetadata } from '@/lib/metadata';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import ArticleContent from './components/ArticleContent';

interface ArticleMetadataProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata(
    { params }: ArticleMetadataProps
): Promise<Metadata> {
    if (!params.slug) {
        return baseGenerateMetadata({
            title: 'Article invalide',
            description: 'URL d\'article invalide',
            robots: 'noindex, nofollow'
        });
    }

    try {
        const { data: article, error } = await supabase
            .from('articles')
            .select('*')
            .eq('slug', params.slug)
            .single();

        if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
        }

        if (!article) {
            return baseGenerateMetadata({
                title: 'Article non trouvé',
                description: 'Cet article n\'existe pas ou a été supprimé.',
                robots: 'noindex, nofollow'
            });
        }

        return baseGenerateMetadata({
            title: article.title,
            description: article.description,
            image: article.image_url,
            type: 'article',
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées:', error);
        return baseGenerateMetadata({
            title: 'Erreur',
            description: 'Une erreur est survenue lors du chargement de l\'article.',
            robots: 'noindex, nofollow'
        });
    }
}

export default async function BlogArticlePage({ params }: ArticleMetadataProps) {
    const { } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', params.slug)
        .single();

    return <ArticleContent slug={params.slug} />;
}