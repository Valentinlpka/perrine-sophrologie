
const seanceTypes = [
    {
        name: "Séance découverte individuelle",
        duration: "1 H",
        specificities: "Permets de découvrir la sophrologie avec un thème général. Cette séance découverte est un premier pas vers la sophrologie afin de vous faire votre propre avis sur la pratique.",
        price: "40 €",
        modalities: "A distance en visio, en présentiel",
        bgColor: "bg-white"
    },
    {
        name: "1 ère séance classique individuelle",
        duration: "1 H - 1 H 20",
        specificities: "Première séance d'échange pour faire connaissance, pour comprendre la problématique de départ et permettre l'élaboration d'un protocole. (entre 8 et 10 séances)",
        price: "60 €",
        modalities: "A distance en visio, en présentiel (*)",
        bgColor: "bg-gray-100"
    },

    {
        name: "Séance classique individuelle",
        duration: "1 H",
        specificities: "Séance après la première séance classique individuelle qui suit le protocole et l'objectif préalablement établi.",
        price: "60 €",
        modalities: "A distance en visio, en présentiel",
        bgColor: "bg-orange-100"
    },
    {
        name: "Séance de groupe en entreprise, collectivités, école, collège et universités",
        duration: "A déterminer",
        specificities: "Intervention en entreprise selon la problématique souhaitée par l'interlocuteur.",
        price: "Sur devis",
        modalities: "En présentiel",
        bgColor: "bg-orange-200"
    },
    {
        name: "Séance de groupe",
        duration: "1 H - 1 H 20",
        specificities: "Séance collective entre amis",
        price: "Sur devis (Minimum 12 personnes)",
        modalities: "En présentiel",
        bgColor: "bg-kaki"
    }
];

const SeanceTypesResponsive = () => {
    return (
        <div className="container mx-auto px-4 pb-10">
            <div className="flex flex-col gap-4">
                <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 font-bold text-center  rounded-lg">
                    <div>Nom de la séance</div>
                    <div>Durée</div>
                    <div>Spécificités</div>
                    <div>Prix</div>
                    <div>Modalités</div>
                </div>
                {seanceTypes.map((seance, index) => (
                    <div key={index} className={`flex flex-col md:grid md:grid-cols-5 gap-4 md:items-center md:justify-center md:text-center ${seance.bgColor} p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg`}>
                        <div className="font-medium text-lg md:text-base">{seance.name}</div>
                        <div className="md:text-center">
                            <span className="font-medium md:hidden">Durée : </span>
                            {seance.duration}
                        </div>
                        <div className=" md:text-base">
                            <span className="font-medium md:hidden">Spécificités : </span>
                            {seance.specificities}
                        </div>
                        <div className="md:text-center">
                            <span className="font-medium md:hidden">Prix : </span>
                            {seance.price}
                        </div>
                        <div>
                            <span className="font-medium md:hidden">Modalités : </span>
                            {seance.modalities}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeanceTypesResponsive;