import { esc, rich, sectionHeader } from '../helpers.mjs';

export default function services(config) {
  const s = config.services;
  const items = s.items
    .map(
      (item, i) => `<li class="service" style="--swatch:${i % 4}">
        <div class="service__swatch" aria-hidden="true"><span>Tinta ${100 - (i % 4) * 22}%</span></div>
        <div class="service__body">
          <h3>${esc(item.title)}</h3>
          <p>${rich(item.description)}</p>
          ${item.includes?.length ? `<p class="service__label">Incluye</p><ul class="service__includes">${item.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
          ${item.idealFor ? `<p class="service__ideal"><span class="service__label">Ideal para</span> ${rich(item.idealFor)}</p>` : ''}
        </div>
      </li>`
    )
    .join('\n      ');
  return `<section class="section services" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-titulo">
  <div class="container">
    ${sectionHeader(s)}
    <ul class="services__grid" role="list">
      ${items}
    </ul>
  </div>
</section>`;
}
