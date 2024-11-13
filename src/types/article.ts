export interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  author_name: string;
  reading_time?: number;
  category?: string;
}
