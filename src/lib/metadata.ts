interface MetadataParams {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  robots?: string;
}

export function generateMetadata({
  title,
  description,
  image = "/images/default-og.jpg",
  type = "website",
  robots = "index, follow",
}: MetadataParams) {
  const baseUrl = "https://perrine-sophrologie.vercel.app";

  return {
    title: title
      ? `${title} | Perrine Dupriez - Sophrologie`
      : "Perrine Dupriez - Sophrologie",
    description,
    robots,
    openGraph: {
      title: title
        ? `${title} | Perrine Dupriez - Sophrologie`
        : "Perrine Dupriez - Sophrologie",
      description,
      url: baseUrl,
      siteName: "Perrine Dupriez - Sophrologie",
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fr_FR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} | Perrine Dupriez - Sophrologie`
        : "Perrine Dupriez - Sophrologie",
      description,
      images: [`${baseUrl}${image}`],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}
