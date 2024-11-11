import { Article } from '@/types/article';
import Link from 'next/link';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
    articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                    <ArticleCard article={article} />
                </Link>
            ))}
        </div>
    );
}