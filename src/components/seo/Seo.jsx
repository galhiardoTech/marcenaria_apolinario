import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoTags } from '../../data/seo';

export default function Seo() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.head.querySelectorAll('[data-site-seo]').forEach(node => node.remove());

        for (const { tag, attrs, children } of getSeoTags(pathname)) {
            const node = document.createElement(tag);
            node.setAttribute('data-site-seo', '');
            for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
            if (children) node.textContent = children;
            document.head.appendChild(node);
        }
    }, [pathname]);

    return null;
}
