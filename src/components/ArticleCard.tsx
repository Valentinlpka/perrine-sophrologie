import { Article } from '@/types/article';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            {article.image && (
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600">
                    {article.content.substring(0, 100)}...
                </p>
            </div>
        </div>
    );
}