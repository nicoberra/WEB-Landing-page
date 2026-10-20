import { esc } from '../helpers.mjs';

/** Cinta de palabras en movimiento continuo (se detiene con "reducir movimiento"). */
export default function marquee(config) {
  const items = config.marquee?.items || [];
  if (!items.length) return '';
  const row = items.map((item) => `<span>${esc(item)}</span><span class="marquee__dot" aria-hidden="true">✦</span>`).join('');
  return `<div class="marquee" role="presentation">
  <p class="visually-hidden">${items.map(esc).join(', ')}</p>
  <div class="marquee__track" aria-hidden="true">
    <div class="marquee__row">${row}</div>
    <div class="marquee__row">${row}</div>
  </div>
</div>`;
}
