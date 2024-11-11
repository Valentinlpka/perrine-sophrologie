// components/ArticleForm.tsx
import { supabase } from '@/lib/supabase';
import { Switch } from '@headlessui/react';
import { DocumentDuplicateIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import TextField from './TextField';

const ReadOnlyField: React.FC<{
    label: string;
    value: string;
}> = ({ label, value }) => (
    <div className="relative">
        <label className="absolute -top-2 left-2 inline-block px-1 bg-white text-sm font-medium text-gray-600">
            {label}
        </label>
        <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed">
            {value}
        </div>
    </div>
);


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

const AUTEUR_FIXE = "Perrine Dupriez";

export default function ArticleForm({ article }: ArticleFormProps) {
    const [titre, setTitre] = useState(article?.title || '');
    const [contenu, setContenu] = useState(article?.content || '');
    const [description, setDescription] = useState(article?.description || '');
    const [imageUrl, setImageUrl] = useState(article?.image_url || '');
    const [categorie, setCategorie] = useState(article?.category || '');
    const [estActif, setEstActif] = useState(article?.is_active || false);
    const [slug, setSlug] = useState(article?.slug || '');
    const router = useRouter();

    useEffect(() => {
        if (!article?.id) {
            setSlug(genererSlug(titre));
        }
    }, [titre, article?.id]);

    const calculerTempsLecture = (texte: string): number => {
        const motsParMinute = 200;
        const nombreDeMots = texte.trim().split(/\s+/).length;
        return Math.ceil(nombreDeMots / motsParMinute);
    };

    const genererSlug = (texte: string): string => {
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
            author_name: AUTEUR_FIXE,
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
                author_name: AUTEUR_FIXE,
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

        const slugFinal = article?.id ? slug : genererSlug(titre); // Utiliser le slug existant en édition
        const tempsLecture = calculerTempsLecture(contenu.replace(/<[^>]*>/g, ''));

        const donneesArticle = {
            title: titre,
            content: contenu,
            image_url: imageUrl,
            is_active: estActif,
            published_at: estActif ? new Date().toISOString() : null,
            slug: slugFinal,
            description: description,
            author_name: AUTEUR_FIXE,
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
            <form onSubmit={soumettreFormulaire} className="space-y-8">
                {/* En-tête du formulaire */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        {article?.id ? "Modifier l'article" : 'Nouvel article'}
                    </h1>

                    <div className="space-y-6">
                        <TextField
                            label="Titre de l'article"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required
                            placeholder="Saisissez le titre de votre article"
                        />

                        <TextField
                            label="Description courte"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            required
                            placeholder="Une brève description qui donne envie de lire l'article"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                label="Catégorie"
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                                required
                                placeholder="Ex: Bien-être, Sophrologie..."
                            />

                            <ReadOnlyField
                                label="Slug URL"
                                value={slug}

                            />
                        </div>

                        <div className="relative">
                            <TextField
                                label="Image principale"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                type="url"
                                placeholder="URL de l'image de couverture"
                            />
                            {imageUrl && (
                                <div className="mt-2 h-32 w-full rounded-xl overflow-hidden border border-gray-200">
                                    <Image
                                        src={imageUrl}
                                        alt="Aperçu"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Éditeur de contenu */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <label className="block text-sm font-medium text-gray-600 mb-4">
                        Contenu de l'article
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={contenu}
                        onChange={setContenu}
                        modules={QUILL_MODULES}
                        className="h-96 mb-12 rounded-xl border border-gray-200"
                    />
                </div>

                {/* Barre d'actions fixe */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Switch
                                    checked={estActif}
                                    onChange={setEstActif}
                                    className={`${estActif ? 'bg-orange-300' : 'bg-gray-200'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2`}
                                >
                                    <span
                                        className={`${estActif ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                    />
                                </Switch>
                                <span className="text-sm font-medium text-gray-700">
                                    {estActif ? 'Article actif' : 'Article inactif'}
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                {article?.id && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={dupliquerArticle}
                                            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 transition-colors duration-200"
                                        >
                                            <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                                            Dupliquer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={supprimerArticle}
                                            className="inline-flex items-center px-4 py-2 border border-red-200 rounded-xl text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 transition-colors duration-200"
                                        >
                                            <TrashIcon className="h-4 w-4 mr-2" />
                                            Supprimer
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={ouvrirApercu}
                                    className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 transition-colors duration-200"
                                >
                                    <EyeIcon className="h-4 w-4 mr-2" />
                                    Aperçu
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transition-colors duration-200"
                                >
                                    {article?.id ? 'Enregistrer' : 'Publier'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {article?.id && (
                <div className="mt-4 text-sm text-gray-500">
                    Dernière mise à jour : {format(new Date(article.published_at || Date.now()), 'PPpp', { locale: fr })}
                </div>
            )}
        </div>
    );
}