import { esc, rich, media, sectionHeader, linkAttrs, whatsappWith, icons } from '../helpers.mjs';

/** Recetarios u otros productos digitales con enlace de compra o pedido por WhatsApp. */
export default function products(config) {
  const p = config.products;
  const cards = p.items
    .map((item, i) => {
      const href = item.href || whatsappWith(config.contact, `Hola! Quiero el recetario "${item.title}".`);
      return `<li class="product" data-reveal style="--reveal-delay:${i % 3}">
        <article data-tilt>
          ${media({ image: item.image, label: 'FOTO DEL RECETARIO', hint: 'Tapa vertical 3:4 · 1200 × 1600 px', ratio: '3/4', alt: `Tapa del recetario ${item.title}` })}
          <div class="product__body">
            ${item.format ? `<p class="product__format">${esc(item.format)}</p>` : ''}
            <h3>${esc(item.title)}</h3>
            <p>${rich(item.description)}</p>
            <div class="product__footer">
              ${item.price ? `<p class="product__price">${esc(item.price)}</p>` : ''}
              <a class="button button--small" ${linkAttrs(href)}>${esc(item.ctaLabel || 'Comprar')}${icons.arrow}<span class="visually-hidden">: ${esc(item.title)}</span></a>
            </div>
          </div>
        </article>
      </li>`;
    })
    .join('\n      ');
  return `<section class="section products" id="${esc(p.id)}" aria-labelledby="${esc(p.id)}-titulo">
  <div class="container">
    ${sectionHeader(p)}
    ${config.demo && p.demoNote ? `<p class="demo-note">${esc(p.demoNote)}</p>` : ''}
    <ul class="products__grid" role="list">
      ${cards}
    </ul>
  </div>
</section>`;
}
