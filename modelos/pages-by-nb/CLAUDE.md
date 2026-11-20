# NB.studio · contexto para la sesión de la compu de Nicolás

Esta sesión se ocupa **solo de NB.studio** (la web de Nicolás para vender páginas web).
**No toques otras carpetas de `modelos/`** (son páginas de clientes: Dani, Jesica, etc.),
ni `src/`, `scripts/` o `api/`, salvo que Nicolás lo pida explícitamente.

## Reglas
- Español, simple y corto. Nicolás no es programador.
- Después de cada cambio: `npm run build -- --modelo pages-by-nb`,
  `npm run check -- --modelo pages-by-nb`, capturas en celular (390 px) y compu (1440 px),
  y recién ahí commit y push. Publicar todos los cambios salvo que diga que no.
- Celular primero: botones de 44 px o más, nada que se salga de la pantalla, el botón de
  WhatsApp no tapa textos. Efectos de mouse solo dentro de `@media (hover: hover) and
  (pointer: fine)`.
- Fotos nuevas: WebP calidad 95 en `assets/`.
- Nunca guardar claves ni contraseñas. No iniciar sesión en redes con sus cuentas.

## La marca
- Estilo colorido y juguetón. Azul `#2B44FF` (principal), azul noche `#0F1440`, amarillo
  `#FFD23F`, rosa `#FF8FC7`, verde `#5EE6B0`, crema `#FFF8EE`.
- Letras de la web: Bricolage Grotesque (títulos), Plus Jakarta Sans (textos), Gochi Hand
  (detalles a mano).
- **Logo:** "NB" en **Shrikhand**, punto verde y "studio" en **Yellowtail** inclinado −10°.
  En fondo claro "studio" va azul; en fondo oscuro, amarillo y NB blanco.
  Logos para redes (1080×1080) en `logo-redes/`.
- WhatsApp: 11 3175-1517 (`5491131751517`).

## La página (`config.mjs` tiene todos los textos)
- Portada "Webs que [venden / enamoran / se recuerdan / suman clientes]", con Virtual Shop
  en una ventana de compu y Suple Market y San Ou en **iPhones** que bajan solos
  (`hero.shots` en config; `phone: true` = iPhone).
- Productos: **Landing page, Web e-commerce y CRM**, con el "¿Qué necesitás hoy?".
- Portfolio (`works`): NutriSigo, Suple Market, San Ou, Virtual Shop Baires, Jesica Cuevas,
  DN Estética, digitalbysofia, Jesica v1. Capturas en `assets/web-*.webp` (compu),
  `cel-*.webp` (celu) y `celfull-*.webp` (celu, página entera).
- Secciones: incluye, cómo trabajo (4 pasos), preguntas y cierre con confeti.
- Carrusel de Instagram (9 placas) en `instagram/`; se regenera con
  `node modelos/pages-by-nb/instagram/carrusel.mjs`.
- Bio de Instagram propuesta: "💻 Páginas web que venden / 🛍️ Tiendas online · Landing
  pages · CRM / 📱 Rápidas en el celu y 100% a medida / 👇 Pedí tu propuesta".

## Pendiente
- Precios de cada producto (hoy "Consultá el precio": `products.items[].price`).
- Links de Instagram y Facebook cuando existan.
- Dominio propio y proyecto en Vercel (variable `MODELO` = `pages-by-nb`); al publicar,
  `demo: false` y `site.url` con el dominio.

## Canva
Con el conector de Canva conectado, hacé placas y publicaciones con esta marca (colores,
letras y logo de arriba). Formatos: post 1080×1350, historia 1080×1920, perfil 1080×1080.
