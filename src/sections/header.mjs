import { esc, icons, linkAttrs } from '../helpers.mjs';
import { logo } from './logo.mjs';

export default function header(config) {
  const links = config.nav
    .map((item) => `<li><a href="#${esc(item.id)}">${esc(item.label)}</a></li>`)
    .join('\n        ');
  return `<header class="site-header" data-header>
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
      <a class="button button--small" ${linkAttrs(config.navCta.href)}>${esc(config.navCta.label)}</a>
    </nav>
  </div>
</header>`;
}
