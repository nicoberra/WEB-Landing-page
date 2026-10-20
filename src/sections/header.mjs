import { esc, icons, linkAttrs, resolveHref } from '../helpers.mjs';
import { logo } from './logo.mjs';

export default function header(config) {
  const links = config.nav
    .map((item) => `<li><a href="#${esc(item.id)}">${esc(item.label)}</a></li>`)
    .join('\n        ');
  const portal = config.portal?.url
    ? `<a class="site-nav__portal" ${linkAttrs(config.portal.url)}>${icons.user}${esc(config.portal.label)}</a>`
    : '';
  return `<div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="#inicio" aria-label="${esc(config.person.name)}, ir al inicio">
      ${logo(config)}
      <span class="brand__name">${esc(config.person.name)}</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" data-menu-toggle>
      ${icons.menu}<span class="menu-toggle__label">Menú</span>
    </button>
    <nav class="site-nav" id="menu-principal" aria-label="Principal" data-menu>
      <ul>
        ${links}
      </ul>
      <div class="site-nav__actions">
        ${portal}
        <a class="button button--small" ${linkAttrs(resolveHref(config.navCta.href, config))}>${esc(config.navCta.label)}</a>
      </div>
    </nav>
  </div>
</header>`;
}
