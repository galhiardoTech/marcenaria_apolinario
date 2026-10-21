import { business } from './business.js';

export const siteUrl = business.siteUrl;
export const indexablePaths = ['/', '/servicos'];

const pages = {
    '/': {
        title: `${business.name} | Marcenaria em São Paulo`,
        description: 'Móveis planejados sob medida em São Paulo com a Apolinário Móveis Planejados. Cozinhas, quartos, salas e banheiros na Chácara Belenzinho. Peça seu orçamento.',
    },
    '/servicos': {
        title: `Serviços de Marcenaria em São Paulo | ${business.name}`,
        description: 'Conheça as soluções da Apolinário Móveis Planejados: cozinhas, quartos, salas e banheiros sob medida em São Paulo. Solicite um orçamento para seu projeto.',
    },
};

const serviceCategories = [
    ['cozinhas', 'Cozinhas planejadas sob medida'],
    ['quartos', 'Quartos e closets sob medida'],
    ['salas', 'Móveis planejados para salas'],
    ['banheiros', 'Gabinetes e móveis para banheiros'],
];

export function getSeoTags(pathname, { googleSiteVerification = '' } = {}) {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const page = Object.hasOwn(pages, path) ? pages[path] : undefined;
    const title = page?.title ?? `Página não encontrada | ${business.name}`;
    const description = page?.description ?? `Acesse a página inicial da ${business.name} e conheça nossos móveis planejados.`;
    const url = `${siteUrl}${path}`;
    const tags = [
        { tag: 'title', attrs: {}, children: title },
        { tag: 'meta', attrs: { name: 'description', content: description } },
        { tag: 'meta', attrs: { name: 'robots', content: page ? 'index, follow, max-image-preview:large' : 'noindex, follow' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: business.name } },
        { tag: 'meta', attrs: { property: 'og:title', content: title } },
        { tag: 'meta', attrs: { property: 'og:description', content: description } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}${business.socialImagePath}` } },
        { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/jpeg' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: String(business.socialImageWidth) } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: String(business.socialImageHeight) } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: business.socialImageAlt } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}${business.socialImagePath}` } },
        { tag: 'meta', attrs: { name: 'twitter:image:alt', content: business.socialImageAlt } },
    ];

    const verification = googleSiteVerification.trim();
    if (verification) {
        if (!/^[a-zA-Z0-9_-]+$/.test(verification)) {
            throw new Error('VITE_GOOGLE_SITE_VERIFICATION deve conter somente o token de content da tag do Search Console.');
        }
        tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: verification } });
    }

    if (path === '/') {
        tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'image', href: business.heroImagePath, fetchpriority: 'high' } });
    }

    if (page) {
        tags.push(
            { tag: 'link', attrs: { rel: 'canonical', href: url } },
            { tag: 'meta', attrs: { property: 'og:url', content: url } },
            {
                tag: 'script',
                attrs: { type: 'application/ld+json' },
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'LocalBusiness',
                            '@id': `${siteUrl}/#empresa`,
                            name: business.name,
                            alternateName: business.alternateNames,
                            url: `${siteUrl}/`,
                            description: 'Marcenaria e móveis planejados sob medida para cozinhas, quartos, salas e banheiros em São Paulo.',
                            telephone: business.telephone,
                            logo: `${siteUrl}${business.logoPath}`,
                            image: { '@id': `${siteUrl}/#imagem-principal` },
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: business.address.streetAddress,
                                addressLocality: business.address.addressLocality,
                                addressRegion: business.address.addressRegion,
                                postalCode: business.address.postalCode,
                                addressCountry: business.address.addressCountry,
                            },
                            hasMap: business.mapsUrl,
                            sameAs: [business.instagramUrl, business.mapsUrl],
                            hasOfferCatalog: { '@id': `${siteUrl}/servicos#catalogo` },
                        },
                        {
                            '@type': 'WebSite',
                            '@id': `${siteUrl}/#site`,
                            url: `${siteUrl}/`,
                            name: business.name,
                            alternateName: business.alternateNames,
                            inLanguage: 'pt-BR',
                            publisher: { '@id': `${siteUrl}/#empresa` },
                        },
                        {
                            '@type': path === '/servicos' ? 'CollectionPage' : 'WebPage',
                            '@id': `${url}#pagina`,
                            url,
                            name: title,
                            description,
                            inLanguage: 'pt-BR',
                            isPartOf: { '@id': `${siteUrl}/#site` },
                            about: { '@id': `${siteUrl}/#empresa` },
                            ...(path === '/' ? {
                                primaryImageOfPage: { '@id': `${siteUrl}/#imagem-principal` },
                                mainEntity: { '@id': `${siteUrl}/#empresa` },
                            } : {
                                mainEntity: { '@id': `${siteUrl}/servicos#catalogo` },
                                breadcrumb: { '@id': `${url}#navegacao` },
                            }),
                        },
                        {
                            '@type': 'ImageObject',
                            '@id': `${siteUrl}/#imagem-principal`,
                            url: `${siteUrl}${business.socialImagePath}`,
                            contentUrl: `${siteUrl}${business.socialImagePath}`,
                            width: business.socialImageWidth,
                            height: business.socialImageHeight,
                            caption: business.socialImageAlt,
                        },
                        {
                            '@type': 'OfferCatalog',
                            '@id': `${siteUrl}/servicos#catalogo`,
                            name: 'Serviços de marcenaria e móveis planejados',
                            url: `${siteUrl}/servicos`,
                            itemListElement: serviceCategories.map(([slug, name]) => ({
                                '@type': 'Service',
                                '@id': `${siteUrl}/servicos#${slug}`,
                                name,
                                serviceType: name,
                                url: `${siteUrl}/servicos`,
                                provider: { '@id': `${siteUrl}/#empresa` },
                            })),
                        },
                        ...(path === '/servicos' ? [{
                            '@type': 'BreadcrumbList',
                            '@id': `${url}#navegacao`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
                                { '@type': 'ListItem', position: 2, name: 'Serviços', item: url },
                            ],
                        }] : []),
                    ],
                }).replace(/</g, '\\u003c'),
            },
        );
    }

    return tags;
}

export function renderSeoHead(pathname, options) {
    const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return getSeoTags(pathname, options).map(({ tag, attrs, children = '' }) => {
        const attributes = Object.entries(attrs).map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join('');
        const opening = `<${tag} data-site-seo${attributes}>`;
        return ['meta', 'link'].includes(tag) ? opening : `${opening}${tag === 'script' ? children : escapeHtml(children)}</${tag}>`;
    }).join('\n    ');
}
