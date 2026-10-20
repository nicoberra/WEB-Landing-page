import { esc, rich, sectionHeader } from '../helpers.mjs';

/** Experiencia, formación y (opcional) especialidades. Solo datos reales y verificables. */
export default function credentials(config) {
  const c = config.credentials;
  const specialties = (c.specialties || [])
    .map((item, i) => `<li class="specialty" data-reveal style="--reveal-delay:${i % 4}">${esc(item)}</li>`)
    .join('\n          ');
  const experience = (c.experience || [])
    .map(
      (item, i) => `<li class="experience__item" data-reveal style="--reveal-delay:${i}">
            <h4>${esc(item.title)}</h4>
            ${item.place ? `<p class="experience__place">${esc(item.place)}</p>` : ''}
            ${item.detail ? `<p class="experience__detail">${rich(item.detail)}</p>` : ''}
          </li>`
    )
    .join('\n          ');
  const education = (c.education || [])
    .map(
      (item, i) => `<li class="education__item" data-reveal style="--reveal-delay:${i % 4}">
            <span class="education__title">${esc(item.title)}${item.status ? ` <span class="education__status">${esc(item.status)}</span>` : ''}</span>
            ${item.detail ? `<span class="education__detail">${esc(item.detail)}</span>` : ''}
          </li>`
    )
    .join('\n          ');
  const columns = [
    specialties && `<div>
        <h3 class="credentials__subtitle" data-reveal>${esc(c.specialtiesTitle || 'Especialidades')}</h3>
        <ul class="specialties" role="list">
          ${specialties}
        </ul>
      </div>`,
    experience && `<div>
        <h3 class="credentials__subtitle" data-reveal>${esc(c.experienceTitle || 'Experiencia')}</h3>
        <ul class="experience" role="list">
          ${experience}
        </ul>
      </div>`,
    education && `<div>
        <h3 class="credentials__subtitle" data-reveal>${esc(c.educationTitle || 'Formación')}</h3>
        <ul class="education" role="list">
          ${education}
        </ul>
      </div>`,
  ].filter(Boolean);
  return `<section class="section credentials" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-titulo">
  <div class="container">
    ${sectionHeader(c)}
    <div class="credentials__grid">
      ${columns.join('\n      ')}
    </div>
  </div>
</section>`;
}
