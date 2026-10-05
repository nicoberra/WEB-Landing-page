import { esc, rich, sectionHeader, icons } from '../helpers.mjs';

export default function faq(config) {
  const f = config.faq;
  const items = f.items
    .map(
      (item) => `<details class="faq__item">
        <summary><span>${esc(item.q)}</span>${icons.plus}</summary>
        <div class="faq__answer"><p>${rich(item.a)}</p></div>
      </details>`
    )
    .join('\n      ');
  return `<section class="section faq" id="${esc(f.id)}" aria-labelledby="${esc(f.id)}-titulo">
  <div class="container faq__grid">
    ${sectionHeader(f)}
    <div class="faq__list">
      ${items}
    </div>
  </div>
</section>`;
}
