import { esc, rich, sectionHeader } from '../helpers.mjs';

export default function services(config) {
  const s = config.services;
  const items = s.items
    .map(
      (item, i) => `<li class="service" data-reveal style="--reveal-delay:${i % 4}">
        <h3>${esc(item.title)}</h3>
        <p class="service__description">${rich(item.description)}</p>
        ${item.includes?.length ? `<ul class="service__includes">${item.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${item.idealFor ? `<p class="service__ideal">${rich(item.idealFor)}</p>` : ''}
      </li>`
    )
    .join('\n      ');
  return `<section class="section services" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-titulo">
  <div class="container">
    ${sectionHeader(s)}
    <ul class="services__grid${s.items.length % 3 === 0 ? ' services__grid--thirds' : ''}" role="list">
      ${items}
    </ul>
  </div>
</section>`;
}
