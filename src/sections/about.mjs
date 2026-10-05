import { esc, rich, sectionHeader } from '../helpers.mjs';

export default function about(config) {
  const a = config.about;
  const highlights = a.highlights
    .map((item) => `<div class="about__item"><dt>${esc(item.title)}</dt><dd>${rich(item.text)}</dd></div>`)
    .join('\n      ');
  return `<section class="section about" id="${esc(a.id)}" aria-labelledby="${esc(a.id)}-titulo">
  <div class="container about__grid">
    <div class="about__text">
      ${sectionHeader(a)}
      ${a.paragraphs.map((p) => `<p>${rich(p)}</p>`).join('\n      ')}
    </div>
    <dl class="about__list">
      ${highlights}
    </dl>
  </div>
</section>`;
}
