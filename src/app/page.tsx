// app/page.tsx
import HomeContent from '@/components/HomeContent';
import { generateMetadata } from '@/lib/metadata';
import { Metadata } from 'next';


// Métadonnées de la page d'accueil
export const metadata: Metadata = generateMetadata({
  title: 'Accueil',
  description: 'Découvrez la sophrologie avec Perrine Dupriez. Séances individuelles et collectives pour gérer le stress, améliorer le sommeil et retrouver le bien-être.',
});

// Page d'accueil côté serveur
export default function HomePage() {
  return <HomeContent />;
}