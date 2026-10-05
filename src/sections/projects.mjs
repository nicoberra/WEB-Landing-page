import { esc, rich, slug, media, sectionHeader, linkAttrs, icons } from '../helpers.mjs';

export default function projects(config) {
  const p = config.projects;
  const categories = [...new Set(p.items.map((item) => item.category).filter(Boolean))];
  const filters =
    categories.length > 1
      ? `<div class="filters" role="group" aria-label="${esc(p.filterLabel)}" data-filters hidden>
      <button type="button" class="chip" aria-pressed="true" data-filter="*">${esc(p.allLabel)}</button>
      ${categories.map((c) => `<button type="button" class="chip" aria-pressed="false" data-filter="${esc(slug(c))}">${esc(c)}</button>`).join('\n      ')}
    </div>`
      : '';
  const cards = p.items
    .map(
      (item) => `<li class="project" data-category="${esc(slug(item.category))}">
        <article>
          <div class="project__media">
            ${media({ image: item.image, label: 'FOTO DEL PROYECTO', hint: 'Horizontal 4:3 · 1600 × 1200 px', ratio: '4/3', alt: `Imagen del proyecto ${item.title}` })}
            ${config.demo ? '<span class="project__badge">Muestra</span>' : ''}
          </div>
          <p class="project__category">${esc(item.category)}</p>
          <h3>${esc(item.title)}</h3>
          <p>${rich(item.description)}</p>
          ${item.link ? `<a class="text-link" ${linkAttrs(item.link.href)}>${esc(item.link.label)}${icons.arrow}</a>` : ''}
        </article>
      </li>`
    )
    .join('\n      ');
  return `<section class="section projects" id="${esc(p.id)}" aria-labelledby="${esc(p.id)}-titulo">
  <div class="container">
    ${sectionHeader(p)}
    ${config.demo && p.demoNote ? `<p class="demo-note">${esc(p.demoNote)}</p>` : ''}
    ${filters}
    <ul class="projects__grid" role="list" data-projects>
      ${cards}
    </ul>
    <p class="visually-hidden" aria-live="polite" data-filter-status></p>
  </div>
</section>`;
}
