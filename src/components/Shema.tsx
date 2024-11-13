export default function Schema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Perrine Dupriez - Sophrologie",
        "image": "https://perrine-sophrologie.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.7b48428f.png&w=96&q=75",
        "description": "Cabinet de sophrologie à Denain",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "556 Rue Arthur Brunet",
            "addressLocality": "Denain",
            "postalCode": "Code 59282",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "XX.XXXXX",
            "longitude": "XX.XXXXX"
        },
        "url": "https://perrine-sophrologie.vercel.app/",
        "telephone": "0698811858",
        "priceRange": "€€",
        "openingHours": "Mo-Fr 09:00-19:00"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}