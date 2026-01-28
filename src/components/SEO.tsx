import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO = ({
    title = "Yavuli | The Student Marketplace",
    description = "Yavuli is the smart, centralized marketplace for everything in your college life. Buy and sell textbooks, gear, and essentials within your campus community.",
    keywords = "student marketplace, college buy sell, textbooks, college life, campus gear, Yavuli",
    image = "/og-image.jpg",
    url = "https://yavuli.netlify.app"
}: SEOProps) => {
    const siteTitle = title.includes("Yavuli") ? title : `${title} | Yavuli`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
