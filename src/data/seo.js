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

export function getSeoTags(pathname) {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const page = pages[path];
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
        { tag: 'meta', attrs: { property: 'og:image:alt', content: `Móveis sob medida da ${business.name}` } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}${business.socialImagePath}` } },
    ];

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
                            image: `${siteUrl}${business.socialImagePath}`,
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
                            '@type': 'WebPage',
                            '@id': `${url}#pagina`,
                            url,
                            name: title,
                            description,
                            inLanguage: 'pt-BR',
                            isPartOf: { '@id': `${siteUrl}/#site` },
                            about: { '@id': `${siteUrl}/#empresa` },
                        },
                    ],
                }).replace(/</g, '\\u003c'),
            },
        );
    }

    return tags;
}

export function renderSeoHead(pathname) {
    const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return getSeoTags(pathname).map(({ tag, attrs, children = '' }) => {
        const attributes = Object.entries(attrs).map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join('');
        const opening = `<${tag} data-site-seo${attributes}>`;
        return ['meta', 'link'].includes(tag) ? opening : `${opening}${tag === 'script' ? children : escapeHtml(children)}</${tag}>`;
    }).join('\n    ');
}
