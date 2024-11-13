import Image from 'next/image';

const DeontologyPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            <Image
                                src="/chambre-sophrologie.jpg"
                                alt="Logo Sophrologie"
                                fill
                                priority
                                className="object-contain"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Code de Déontologie des Sophrologues
                    </h1>

                    <p className="text-gray-600 mb-8 text-center italic">
                        Le présent code de déontologie est le socle commun des sophrologues adhérents de la Chambre Syndicale de
                        la Sophrologie.
                    </p>
                    <p className="text-gray-600 mb-12 text-center italic">
                        Il définit leurs engagements envers le public, leurs clients et la profession. Ce code de déontologie garantit
                        l'éthique professionnelle des sophrologues.
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                num: 1,
                                text: "Les sophrologues s'engagent à affirmer l'égalité entre les personnes et à en respecter l'originalité et la dignité."
                            },
                            {
                                num: 2,
                                text: "Les sophrologues s'engagent à interdire toute propagande ou prosélytisme religieux ou idéologique au sein de leurs cabinets ou lieux d'intervention. Ils s'engagent à lutter contre toutes les dérives sectaires dont ils seraient témoins."
                            },
                            {
                                num: 3,
                                text: "Les sophrologues s'engagent à respecter et à protéger l'intégrité physique et psychique des personnes sous leur responsabilité."
                            },
                            {
                                num: 4,
                                text: "Les sophrologues s'engagent à respecter la confidentialité des informations collectées durant leurs accompagnements individuels ou de groupes."
                            },
                            {
                                num: 5,
                                text: "Les sophrologues s'engagent à respecter et à faire respecter la législation en vigueur."
                            },
                            {
                                num: 6,
                                text: "Les sophrologues s'engagent à actualiser régulièrement leurs savoirs et leurs compétences afin de répondre aux attentes du public et aux évolutions de la sophrologie."
                            },
                            {
                                num: 7,
                                text: "Les sophrologues s'engagent à diffuser des offres claires et compréhensibles par le public. Ces offres doivent définir les modalités d'accompagnement, les objectifs visés et les limites de la sophrologie."
                            },
                            {
                                num: 8,
                                text: "Les sophrologues s'engagent à ne pas diffuser d'informations pouvant induire le public ou les médias en erreur ou nuisant à l'image de la profession."
                            },
                            {
                                num: 9,
                                text: "Les sophrologues s'engagent à user de leur droit de rectification auprès des médias afin de contribuer au sérieux des informations communiquées au public sur la sophrologie."
                            },
                            {
                                num: 10,
                                text: "Les sophrologues s'engagent à respecter les concepts et principes généraux de la sophrologie. Ils s'engagent également à ne pas dénaturer ou amalgamer la sophrologie avec d'autres techniques sans que leurs clients en soient avertis."
                            },
                            {
                                num: 11,
                                text: "Les sophrologues s'engagent à respecter les limites de leurs compétences et à orienter leurs clients vers un autre professionnel lorsque ceux-ci nécessitent un traitement ou une aide thérapeutique ne relevant pas de leurs compétences."
                            },
                            {
                                num: 12,
                                text: "Les sophrologues s'engagent à ne pas se substituer aux professionnels de santé, à ne pas prodiguer de diagnostic, de prescriptions médicales et à ne pas interférer avec des traitements médicaux en cours."
                            },
                            {
                                num: 13,
                                text: "Les sophrologues s'engagent à conserver leur éthique professionnelle lorsqu'ils interviennent sous l'autorité d'une entreprise ou d'un organisme."
                            },
                            {
                                num: 14,
                                text: "Les sophrologues s'engagent, dans la mesure du possible, à proposer un confrère à leurs clients lorsqu'ils seront dans l'impossibilité de fournir leurs services."
                            },
                            {
                                num: 15,
                                text: "Les sophrologues s'engagent à entretenir des relations confraternelles de respect et de courtoisie, d'honnêteté et de bonne foi avec les autres sophrologues."
                            },
                            {
                                num: 16,
                                text: "Tout sophrologue qui ne respecterait pas le présent code pourrait se voir exclu de la Chambre Syndicale de Sophrologie."
                            }
                        ].map((article) => (
                            <div key={article.num} className="group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    Article {article.num}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {article.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p>Version du 22 avril 2021</p>
                        <a
                            href="https://www.chambre-syndicale-sophrologie.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            www.chambre-syndicale-sophrologie.fr
                        </a>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default DeontologyPage;