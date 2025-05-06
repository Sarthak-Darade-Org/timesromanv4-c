import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterImage?: string;
  canonical?: string;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Times Roman - AI-Powered News',
  description = 'Next-generation AI-powered news platform',
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterSite = '@timesroman',
  twitterImage,
  canonical,
  articleMeta
}) => {
  const siteName = 'Times Roman';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const effectiveUrl = ogUrl || canonical || currentUrl;
  const timestamp = Date.now();

  // WhatsApp requires these specific properties
  const effectiveOgImage = ogImage || 'https://i.ibb.co/.../default-article-image.jpg';
  const effectiveOgTitle = ogTitle || title;
  const effectiveOgDescription = ogDescription || description;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${canonical}?v=${timestamp}`} />}

      {/* Open Graph (Facebook/WhatsApp) */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={effectiveOgTitle} />
      <meta property="og:description" content={effectiveOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${effectiveUrl}?v=${timestamp}`} />
      <meta property="og:image" content={effectiveOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={effectiveOgTitle} />
      <meta name="twitter:description" content={effectiveOgDescription} />
      <meta name="twitter:image" content={twitterImage || effectiveOgImage} />

      {/* Article Specific */}
      {articleMeta && ogType === 'article' && (
        <>
          <meta property="article:published_time" content={articleMeta.publishedTime || new Date().toISOString()} />
          <meta property="article:modified_time" content={articleMeta.modifiedTime || new Date().toISOString()} />
          {articleMeta.author && <meta property="article:author" content={articleMeta.author} />}
          {articleMeta.section && <meta property="article:section" content={articleMeta.section} />}
          {articleMeta.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
};
