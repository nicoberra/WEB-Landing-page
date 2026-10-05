import { esc, rich, sectionHeader } from '../helpers.mjs';

export default function processSection(config) {
  const p = config.process;
  const steps = p.steps
    .map(
      (step, i) => `<li class="step">
        <span class="step__number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(step.title)}</h3>
        <p>${rich(step.text)}</p>
      </li>`
    )
    .join('\n      ');
  return `<section class="section process" id="${esc(p.id)}" aria-labelledby="${esc(p.id)}-titulo">
  <div class="container">
    ${sectionHeader(p)}
    <ol class="process__steps">
      ${steps}
    </ol>
  </div>
</section>`;
}
