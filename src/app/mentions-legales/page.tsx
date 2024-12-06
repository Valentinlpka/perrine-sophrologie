// app/mentions-legales/page.tsx
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Mentions Légales | Perrine Dupriez Sophrologie",
    description: "Mentions légales du site de Perrine Dupriez, sophrologue à Denain."
};

type Section = {
    title: string;
    content: React.ReactNode;
};

export default function MentionsLegales() {
    const sections: Section[] = [
        {
            title: "Éditeur du site",
            content: (
                <div className="mb-4">
                    <p>Le présent site est édité par :</p>
                    <p>Perrine DUPRIEZ</p>
                    <p>556 rue Arthur Brunet</p>
                    <p>59220 DENAIN</p>
                    <p>SIRET : 92806232200013</p>
                    <p>Email : perrine.dupriez.pro@gmail.com</p>
                    <p>Téléphone : 06.98.81.18.58</p>
                </div>
            )
        },
        {
            title: "Directeur de la publication",
            content: (
                <p className="mb-4">
                    Le directeur de la publication est Madame Perrine DUPRIEZ, en qualité de propriétaire du site.
                </p>
            )
        },
        {
            title: "Hébergement",
            content: (
                <div className="mb-4">
                    <p>Le site est hébergé par :</p>
                    <p>Vercel Inc.</p>
                    <p>440 N Barranca Ave #4133</p>
                    <p>Covina, CA 91723</p>
                    <p>États-Unis</p>
                    <p>https://vercel.com</p>
                </div>
            )
        },
        {
            title: "Propriété intellectuelle",
            content: (
                <div className="mb-4">
                    <p>L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                    <p className="mt-2">La reproduction de tout ou partie de ce site sur quelque support que ce soit est formellement interdite sauf autorisation expresse de Perrine DUPRIEZ.</p>
                </div>
            )
        },
        {
            title: "Protection des données personnelles",
            content: (
                <div className="mb-4">
                    <p>Les informations recueillies via le formulaire de contact sont destinées à Perrine DUPRIEZ et sont utilisées pour :</p>
                    <ul className="list-disc pl-6 mt-2 mb-2">
                        <li>Répondre à vos demandes de contact</li>
                        <li>Gérer les demandes de rendez-vous</li>
                    </ul>
                    <p>Ces données sont conservées pendant 3 ans à compter de notre dernier contact.</p>
                    <p className="mt-2">Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition, de limitation du traitement, d&apos;effacement et de portabilité de vos données. Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez contacter Perrine DUPRIEZ par email : perrine.dupriez.pro@gmail.com</p>
                </div>
            )
        },
        {
            title: "Liens hypertextes",
            content: (
                <div className="mb-4">
                    <p>Le site contient des liens hypertextes vers d&apos;autres sites (notamment vers la plateforme de réservation) et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d&apos;autres sites vers celui-ci.</p>
                    <p className="mt-2">La navigation sur d&apos;autres sites se fait aux risques et périls de l&apos;internaute.</p>
                </div>
            )
        },
        {
            title: "Cookies",
            content: (
                <div className="mb-4">
                    <p>Le site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage n&apos;est utilisé.</p>
                    <p className="mt-2">Vous pouvez désactiver l&apos;utilisation de cookies en sélectionnant les paramètres appropriés de votre navigateur.</p>
                </div>
            )
        },
        {
            title: "Modification des mentions légales",
            content: (
                <p className="mb-4">
                    L&apos;éditeur se réserve le droit de modifier ces mentions légales à tout moment. L&apos;utilisateur s&apos;engage à les consulter régulièrement.
                </p>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Mentions Légales</h1>

            {sections.map((section, index) => (
                <section key={index} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {section.title}
                    </h2>
                    {section.content}
                </section>
            ))}


        </div>
    );
}