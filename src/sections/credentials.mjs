import { esc, sectionHeader } from '../helpers.mjs';

/** Especialidades y formación. Mostrá solo datos reales y verificables. */
export default function credentials(config) {
  const c = config.credentials;
  const specialties = (c.specialties || [])
    .map((item, i) => `<li class="specialty" data-reveal style="--reveal-delay:${i % 4}">${esc(item)}</li>`)
    .join('\n          ');
  const education = (c.education || [])
    .map(
      (item, i) => `<li class="education__item" data-reveal style="--reveal-delay:${i % 4}">
            <span class="education__title">${esc(item.title)}</span>
            ${item.detail ? `<span class="education__detail">${esc(item.detail)}</span>` : ''}
          </li>`
    )
    .join('\n          ');
  return `<section class="section credentials" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-titulo">
  <div class="container">
    ${sectionHeader(c)}
    <div class="credentials__grid">
      <div>
        <h3 class="credentials__subtitle" data-reveal>${esc(c.specialtiesTitle)}</h3>
        <ul class="specialties" role="list">
          ${specialties}
        </ul>
      </div>
      <div>
        <h3 class="credentials__subtitle" data-reveal>${esc(c.educationTitle)}</h3>
        <ol class="education">
          ${education}
        </ol>
      </div>
    </div>
  </div>
</section>`;
}
