import { esc, rich, linkAttrs, icons } from '../helpers.mjs';
import { logo } from './logo.mjs';

export default function footer(config) {
  const social = config.social.filter((s) => s.url);
  const links = [...config.nav.map((n) => ({ label: n.label, href: `#${n.id}` })), ...(config.footer.links || [])];
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <a class="brand" href="#inicio" aria-label="${esc(config.person.name)}, volver al inicio">${logo(config)}<span class="brand__name">${esc(config.person.name)}</span></a>
      <p>${rich(config.footer.note)}</p>
    </div>
    <nav aria-label="Secciones">
      <p class="site-footer__title">Secciones</p>
      <ul>${links.map((l) => `<li><a ${linkAttrs(l.href)}>${esc(l.label)}</a></li>`).join('')}</ul>
    </nav>
    ${
      social.length
        ? `<nav aria-label="Redes sociales">
      <p class="site-footer__title">Redes</p>
      <ul>${social.map((s) => `<li><a ${linkAttrs(s.url)}>${esc(s.label)}${icons.arrow}<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a></li>`).join('')}</ul>
    </nav>`
        : ''
    }
  </div>
  <div class="container site-footer__bottom">
    <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(config.person.name)}</p>
    ${config.demo ? `<p class="demo-badge">${esc(config.footer.demoNotice)}</p>` : ''}
  </div>
</footer>`;
}
