// app/mentions-légales/page.tsx
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Conditions Générales de Vente | Perrine Dupriez Sophrologie",
    description: "Consultez les conditions générales de vente des services de sophrologie proposés par Perrine Dupriez."
};

type Article = {
    title: string;
    content: React.ReactNode;
};

export default function TermsPage() {
    const articles: Article[] = [
        {
            title: "PRESENTATION DES PARTIES",
            content: (
                <>
                    <p className="mb-4">
                        Le présent contrat de prestations de services (ci-après dénommé le « Contrat ») régit les relations contractuelles entre :
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>le client (ci-après dénommé le « client »), qui est un consommateur ;</li>
                        <li>Le sophrologue : Mme PERRINE DUPRIEZ, exerçant à l&apos;adresse suivante : 556 rue Arthur Brunet à DENAIN (59220),
                            immatriculé à l&apos;URSSAF NORD PAS DE CALAIS sous le numéro de SIRET 92806232200013, agissant à titre individuel.</li>
                    </ul>
                    <p>Les présentes conditions générales de vente sont conclues entre le sophrologue et toute personne souhaitant prendre rendez-vous avec lui.</p>
                    <p>Le client déclare accepter sans réserve l&apos;intégralité des présentes conditions générales de vente et déclare avoir la capacité de conclure un contrat avec le Sophrologue.</p>
                </>
            )
        },
        {
            title: "DECLARATIONS PREALABLES DES PARTIES",
            content: (
                <div className="mb-4">
                    <p className="mb-2">Le client déclare et garantit au sophrologue :</p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>être majeur et doté de la capacité juridique à conclure le présent contrat,</li>
                        <li>ne pas être affecté, à sa connaissance, de maladies psychiatriques ou, si tel est le cas, être suivi par un médecin
                            titulaire d&apos;un diplôme d&apos;Etat reconnu et inscrit à un tableau de l&apos;ordre des médecins en France.</li>
                    </ul>
                    <p className="mb-2">
                        Le client déclare être informé de la nature des prestations effectuées par le sophrologue et reconnait que ce dernier
                        a été à son entière disposition pour l&apos;informer de tout ce qui était important en fonction de ses besoins.
                    </p>
                    <p>
                        Le sophrologue déclare et garantit au client être habilité à fournir les prestations de services en qualité de
                        Sophrologue depuis le 1er mai 2024
                    </p>
                </div>
            )
        },
        {
            title: "NATURE DU CONTRAT ET DESCRIPTIF DES PRESTATIONS",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Le présent contrat constitue un contrat de prestations de services relatif à la sophrologie,
                        et en ce sens, ce contrat relève du Code de la Consommation.
                    </p>
                    <p className="mb-2">
                        Les différents exercices et les différentes techniques proposées et pratiquées n&apos;ont aucune visée médicale
                        et ne sont pas assimilables aux actes réservés aux professions de santé réglementées par le Code de la Santé Publique.
                    </p>
                    <p className="mb-2">
                        Elles sont considérées comme complémentaires et ne se substituent en aucun cas à un avis médical.
                    </p>
                    <p className="mb-2">
                        Elles s&apos;inscrivent dans une démarche complémentaire et personnelle de travail sur soi et de développement personnel.
                    </p>
                    <p className="mb-4">
                        Le client est informé et accepte que les prestations réalisées ne tendent à l&apos;établissement d&apos;aucun diagnostic
                        et ne permettent pas de traiter une quelconque maladie.
                    </p>
                    <p className="mb-2">
                        Le sophrologue rappelle que la sophrologie est une discipline spécifique du domaine des Sciences Humaines qui se caractérise
                        par le fait d&apos;être avant tout une méthode pratique.
                    </p>
                </div>
            )
        },
        {
            title: "CONCLUSION DU CONTRAT A DISTANCE OU HORS ETABLISSEMENT",
            content: (
                <div className="mb-4">
                    <p className="mb-4">
                        Le présent article s&apos;applique dans les cas où le présent contrat est conclu, non pas directement dans les locaux du prestataire
                        le jour de réalisation des prestations mais, à distance (par mail ou encore à partir du site internet du Prestataire ou par le biais
                        d&apos;un site de réservation en ligne) ou encore qu&apos;il s&apos;agît d&apos;un contrat dit « hors établissement ».
                    </p>
                    <h3 className="font-semibold mb-2">Droit de rétractation</h3>
                    <p className="mb-2">
                        Le prestataire rappelle au client qu&apos;il dispose d&apos;un délai de rétractation de 14 jours calendaires,
                        sans qu&apos;il ait à justifier de motif, ni à payer de frais ou pénalités.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold mb-2">Modèle de formulaire de rétractation</h4>
                        <p>Je vous notifie par la présente ma rétractation du contrat de prestation de service ________ que j&apos;ai signé le ______</p>
                        <p>Nom du Client ________</p>
                        <p>Adresse du Client ________</p>
                        <p>Email ________ (uniquement en cas de notification du présent formulaire sur papier)</p>
                        <p>Date ________ </p>
                    </div>
                </div>
            )
        },
        {
            title: "CONDITIONS DE REALISATION DES PRESTATIONS",
            content: (
                <div className="mb-4">
                    <p className="mb-2">Le prestataire réalisera les prestations de services, en accord avec le client et, selon le cas, soit :</p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>dans ses locaux professionnels ;</li>
                        <li>hors établissement du sophrologue : par exemple au domicile du client, lors d&apos;ateliers collectifs de sophrologie,
                            lors d&apos;ateliers d&apos;intervention et/ou de formation.</li>
                    </ul>
                    <p className="mb-2">
                        Le client s&apos;engage à collaborer de manière active avec le sophrologue et à lui fournir les informations nécessaires
                        à la bonne réalisation des prestations.
                    </p>
                </div>
            )
        },
        {
            title: "CODE DEONTOLOGIQUE",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Perrine DUPRIEZ garde le secret professionnel sur toutes les informations concernant le Client. Elle s&apos;engage à ne
                        dévoiler aucune information qui pourrait lui être communiquée au cours des séances.
                    </p>
                    <p className="mb-2">
                        Perrine DUPRIEZ est membre actif de la Chambre Syndicale de la Sophrologie et respecte de ce fait le code de déontologie
                        des sophrologues.
                    </p>
                </div>
            )
        },
        {
            title: "RESERVATION & ANNULATION",
            content: (
                <div className="mb-4">
                    <p className="mb-2">Le client peut prendre rendez-vous par téléphone ou par mail.</p>
                    <p className="mb-2">
                        Un SMS de rappel sera envoyé par le sophrologue 24 heures avant la date de rendez-vous défini, étant précisé que tout
                        rendez-vous annulé ou reporté dans un délai inférieur à 24 heures sera facturé.
                    </p>
                </div>
            )
        },
        {
            title: "PRIX ET REGLEMENT",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Les prix des prestations sont fixés par le prestataire. Ces prix peuvent varier selon le type et la durée des prestations réalisées.
                    </p>
                    <p className="mb-2">Le paiement se fera le jour de la prestation en cabinet par les moyens suivants :</p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Espèces ;</li>
                        <li>Chèque bancaire à l&apos;ordre de Perrine DUPRIEZ.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "DUREE",
            content: (
                <p className="mb-4">
                    Le présent contrat entre en vigueur à compter de sa signature pour une durée correspondant à la durée des prestations.
                </p>
            )
        },
        {
            title: "CONFIDENTIALITE",
            content: (
                <p className="mb-4">
                    Les parties reconnaissent le caractère confidentiel de toutes informations et données échangées entre elles pour l&apos;exécution
                    du contrat et s&apos;engagent à les conserver confidentielles.
                </p>
            )
        },
        {
            title: "RESPONSABILITE",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Conformément aux dispositions légales en vigueur, le prestataire est responsable de plein droit à l&apos;égard du client
                        de la bonne exécution des obligations résultant du contrat conclu à distance.
                    </p>
                    <p className="mb-2">
                        Le client est seul responsable des choix qu&apos;il fait et des informations qu&apos;il donne au sophrologue.
                    </p>
                </div>
            )
        },
        {
            title: "ASSURANCE",
            content: (
                <p className="mb-4">
                    Le sophrologue est titulaire d&apos;une police d&apos;assurance en matière de responsabilité civile professionnelle,
                    afin de couvrir les dommages directs, matériels ou immatériels, qu&apos;il pourrait causer dans le cadre du présent contrat.
                </p>
            )
        },
        {
            title: "FORCE MAJEURE",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Chacune des parties ne pourra être tenue pour responsable de tout retard ou manquement dû à la survenance d&apos;un cas
                        de force majeure habituellement reconnu par la jurisprudence des cours et tribunaux français.
                    </p>
                </div>
            )
        },
        {
            title: "DONNEES PERSONNELLES",
            content: (
                <div className="mb-4">
                    <p className="mb-2">
                        Dans le cadre de la réalisation des prestations de services prévues au présent contrat, le sophrologue a accès à des
                        données à caractère personnel du client.
                    </p>
                    <p>
                        Cette politique de traitement des données à caractère personnel est disponible sur le site internet du sophrologue.
                    </p>
                </div>
            )
        },
        {
            title: "DROIT APPLICABLE & JURIDICTIONS COMPETENTES",
            content: (
                <div className="mb-4">
                    <p className="mb-2">Le présent contrat est régi par le droit français.</p>
                    <p className="mb-2">
                        En application des articles L 611-1 et suivants du Code de la Consommation, le client a le droit de recourir gratuitement
                        à un médiateur de la consommation.
                    </p>
                    <p>
                        CNPM-MEDIATION DE LA CONSOMMATION - 27 avenue de la Libération - 42400 Saint Chamond
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Conditions Générales de Vente</h1>

            {articles.map((article, index) => (
                <article key={index} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        ARTICLE {index + 1} : {article.title}
                    </h2>
                    {article.content}
                </article>
            ))}


        </div>
    );
}