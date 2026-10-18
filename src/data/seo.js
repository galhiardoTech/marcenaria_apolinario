export const siteUrl = 'https://www.apolinariointeriores.com.br';
export const indexablePaths = ['/', '/servicos'];

const pages = {
    '/': {
        title: 'Marcenaria em São Paulo | Apolinário Interiores',
        description: 'Móveis planejados e marcenaria sob medida na Chácara Belenzinho, São Paulo. Cozinhas, quartos, salas e banheiros. Solicite seu orçamento à Apolinário.',
    },
    '/servicos': {
        title: 'Móveis Planejados em São Paulo | Marcenaria Apolinário',
        description: 'Conheça nossas soluções de móveis planejados para cozinhas, quartos, salas e banheiros em São Paulo. Projetos sob medida da Marcenaria Apolinário.',
    },
};

export function getSeoTags(pathname) {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const page = pages[path];
    const title = page?.title ?? 'Página não encontrada | Marcenaria Apolinário';
    const description = page?.description ?? 'Acesse a página inicial da Marcenaria Apolinário e conheça nossos móveis planejados.';
    const url = `${siteUrl}${path}`;
    const tags = [
        { tag: 'title', attrs: {}, children: title },
        { tag: 'meta', attrs: { name: 'description', content: description } },
        { tag: 'meta', attrs: { name: 'robots', content: page ? 'index, follow, max-image-preview:large' : 'noindex, follow' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Marcenaria Apolinário' } },
        { tag: 'meta', attrs: { property: 'og:title', content: title } },
        { tag: 'meta', attrs: { property: 'og:description', content: description } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/images/moveis-planejados-apolinario.jpeg` } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Móveis planejados da Marcenaria Apolinário' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/images/moveis-planejados-apolinario.jpeg` } },
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
                            name: 'Marcenaria Apolinário',
                            alternateName: 'Apolinário Interiores',
                            url: `${siteUrl}/`,
                            description: 'Marcenaria e móveis planejados sob medida para cozinhas, quartos, salas e banheiros em São Paulo.',
                            telephone: '+55-11-97108-2868',
                            image: `${siteUrl}/images/moveis-planejados-apolinario.jpeg`,
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Rua Lessig, 589 - Chácara Belenzinho',
                                addressLocality: 'São Paulo',
                                addressRegion: 'SP',
                                postalCode: '03276-000',
                                addressCountry: 'BR',
                            },
                            sameAs: ['https://www.instagram.com/apolinariomoveisplanejado/'],
                        },
                        {
                            '@type': 'WebSite',
                            '@id': `${siteUrl}/#site`,
                            url: `${siteUrl}/`,
                            name: 'Marcenaria Apolinário',
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
