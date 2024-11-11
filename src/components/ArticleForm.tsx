// components/ArticleForm.tsx

import { supabase } from '@/lib/supabase';
import { Switch } from '@headlessui/react';
import { DocumentDuplicateIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ArticleFormProps {
    article?: Article | null;
}

interface Article {
    id?: number;
    title: string;
    content: string;
    image_url?: string;
    is_active: boolean;
    published_at?: string;
    slug: string;
    description: string;
    author_name: string;
    reading_time?: number;
    category?: string;
}

const QUILL_MODULES = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
    ],
};

export default function ArticleForm({ article }: ArticleFormProps) {
    const [titre, setTitre] = useState(article?.title || '');
    const [contenu, setContenu] = useState(article?.content || '');
    const [description, setDescription] = useState(article?.description || '');
    const [imageUrl, setImageUrl] = useState(article?.image_url || '');
    const [auteur, setAuteur] = useState(article?.author_name || '');
    const [categorie, setCategorie] = useState(article?.category || '');
    const [estActif, setEstActif] = useState(article?.is_active || false);
    const [slug, setSlug] = useState(article?.slug || '');
    const router = useRouter();

    const calculerTempsLecture = (texte: string): number => {
        const motsParMinute = 200;
        const nombreDeMots = texte.trim().split(/\s+/).length;
        return Math.ceil(nombreDeMots / motsParMinute);
    };

    const genererSlug = (texte: string) => {
        return texte
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .substring(0, 100);
    };

    useEffect(() => {
        if (!article?.slug) {
            setSlug(genererSlug(titre));
        }
    }, [titre, article?.slug]);

    const ouvrirApercu = () => {
        const tempsLecture = calculerTempsLecture(contenu.replace(/<[^>]*>/g, ''));
        const params = new URLSearchParams({
            title: encodeURIComponent(titre),
            content: encodeURIComponent(contenu),
            image_url: encodeURIComponent(imageUrl),
            description: encodeURIComponent(description),
            author_name: encodeURIComponent(auteur),
            category: encodeURIComponent(categorie),
            reading_time: tempsLecture.toString(),
            published_at: new Date().toISOString()
        });

        window.open(`/admin/articles/preview?${params.toString()}`, '_blank');
    };

    const dupliquerArticle = async () => {
        if (article?.id) {
            const nouveauTitre = `${titre} (Copie)`;
            const nouveauSlug = genererSlug(nouveauTitre);
            const tempsLecture = calculerTempsLecture(contenu.replace(/<[^>]*>/g, ''));

            const donneesDupliquees = {
                title: nouveauTitre,
                content: contenu,
                image_url: imageUrl,
                is_active: false,
                published_at: null,
                slug: nouveauSlug,
                description: description,
                author_name: auteur,
                category: categorie,
                reading_time: tempsLecture
            };

            const { error } = await supabase
                .from('articles')
                .insert([donneesDupliquees]);

            if (error) {
                alert('Erreur lors de la duplication: ' + error.message);
            } else {
                router.push('/admin/articles');
            }
        }
    };

    const supprimerArticle = async () => {
        if (article?.id && confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', article.id);

            if (error) {
                alert('Erreur lors de la suppression: ' + error.message);
            } else {
                router.push('/admin/articles');
            }
        }
    };

    const soumettreFormulaire = async (e: React.FormEvent) => {
        e.preventDefault();

        const tempsLecture = calculerTempsLecture(contenu.replace(/<[^>]*>/g, ''));

        const donneesArticle = {
            title: titre,
            content: contenu,
            image_url: imageUrl,
            is_active: estActif,
            published_at: estActif ? new Date().toISOString() : null,
            slug: slug,
            description: description,
            author_name: auteur,
            category: categorie,
            reading_time: tempsLecture
        };

        if (article?.id) {
            const { error } = await supabase
                .from('articles')
                .update(donneesArticle)
                .eq('id', article.id);
            if (error) {
                alert('Erreur lors de la mise à jour: ' + error.message);
            } else {
                router.push(`/articles/${slug}`);
            }
        } else {
            const { error } = await supabase.from('articles').insert([donneesArticle]);
            if (error) {
                alert('Erreur lors de la création: ' + error.message);
            } else {
                router.push(`/articles/${slug}`);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={soumettreFormulaire} className="space-y-6">
                <div>
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                        Titre
                    </label>
                    <input
                        type="text"
                        id="titre"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description courte
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={3}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="auteur" className="block text-sm font-medium text-gray-700">
                            Auteur
                        </label>
                        <input
                            type="text"
                            id="auteur"
                            value={auteur}
                            onChange={(e) => setAuteur(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
                            Catégorie
                        </label>
                        <input
                            type="text"
                            id="categorie"
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                        Slug URL
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(genererSlug(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        URL de l'image
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
                        Contenu
                    </label>
                    <div className="mt-1">
                        <ReactQuill
                            theme="snow"
                            value={contenu}
                            onChange={setContenu}
                            modules={QUILL_MODULES}
                            className="h-96"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Switch
                        checked={estActif}
                        onChange={setEstActif}
                        className={`${estActif ? 'bg-indigo-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${estActif ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                    <span className="text-sm font-medium text-gray-700">
                        {estActif ? 'Actif' : 'Inactif'}
                    </span>
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {article?.id ? 'Mettre à jour' : 'Créer'} l'article
                    </button>
                    <div className="space-x-2">
                        <button
                            type="button"
                            onClick={ouvrirApercu}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Aperçu
                        </button>
                        {article?.id && (
                            <>
                                <button
                                    type="button"
                                    onClick={dupliquerArticle}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                                    Dupliquer
                                </button>
                                <button
                                    type="button"
                                    onClick={supprimerArticle}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
            {article?.id && (
                <div className="mt-4 text-sm text-gray-500">
                    Dernière mise à jour: {format(new Date(article.published_at || Date.now()), 'PPpp', { locale: fr })}
                </div>
            )}
        </div>
    );
}