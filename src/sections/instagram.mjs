import { esc, rich, media, linkAttrs, icons } from '../helpers.mjs';

/** Invitación a seguir el perfil, con espacios para fotos de publicaciones. */
export default function instagram(config) {
  const ig = config.instagram;
  const url = config.instagramUrl;
  const tiles = Array.from({ length: ig.tiles || 4 }, (_, i) => {
    const image = ig.images?.[i];
    return `<li class="ig__tile" data-reveal style="--reveal-delay:${i}">
        <a ${linkAttrs(url)} tabindex="-1" aria-hidden="true">${media({ image, label: 'FOTO DE INSTAGRAM', hint: 'Cuadrada 1:1 · 1080 × 1080 px', ratio: '1/1', alt: 'Publicación de Instagram' })}</a>
      </li>`;
  }).join('\n      ');
  return `<section class="section ig" id="${esc(ig.id)}" aria-labelledby="${esc(ig.id)}-titulo">
  <div class="container">
    <div class="ig__head" data-reveal>
      <div>
        <p class="eyebrow">${esc(ig.eyebrow)}</p>
        <h2 id="${esc(ig.id)}-titulo"><a class="ig__handle" ${linkAttrs(url)}>${esc(ig.handle)}</a></h2>
        <p class="ig__title">${rich(ig.title)}</p>
      </div>
      <a class="button button--ghost" ${linkAttrs(url)}>${icons.insta}${esc(ig.ctaLabel)}<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a>
    </div>
    <ul class="ig__grid" role="list">
      ${tiles}
    </ul>
  </div>
</section>`;
}
