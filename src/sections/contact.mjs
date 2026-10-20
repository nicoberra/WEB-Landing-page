import { esc, rich, sectionHeader, whatsappUrl, mailtoUrl, linkAttrs, icons } from '../helpers.mjs';

function form(config) {
  const f = config.contact.form;
  if (!f.enabled) return '';
  const options = f.projectTypes.map((t) => `<option>${esc(t)}</option>`).join('');
  const modeNote = {
    demo: 'Formulario de demostración: valida los datos, pero no envía ni guarda nada.',
    whatsapp: 'Al enviar se abre WhatsApp con tu mensaje listo. No guardamos tus datos.',
    email: 'Al enviar se abre tu programa de correo con el mensaje listo. No guardamos tus datos.',
  }[f.mode];
  const target = f.mode === 'whatsapp' ? config.contact.whatsapp.number : config.contact.email;
  return `<form class="contact-form" novalidate data-contact-form data-reveal data-mode="${esc(f.mode)}" data-target="${esc(target)}" data-type-label="${esc(f.typeLabel || 'Tipo de proyecto')}">
      <h3>${esc(f.title)}</h3>
      <div class="field">
        <label for="cf-nombre">Nombre</label>
        <input id="cf-nombre" name="nombre" type="text" autocomplete="name" required minlength="2" aria-describedby="cf-nombre-error">
        <p class="field__error" id="cf-nombre-error" data-error-for="cf-nombre"></p>
      </div>
      ${
        // Con WhatsApp la respuesta llega al mismo chat: no hace falta pedir el email.
        f.mode === 'whatsapp'
          ? ''
          : `<div class="field">
        <label for="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="cf-email-error">
        <p class="field__error" id="cf-email-error" data-error-for="cf-email"></p>
      </div>`
      }
      <div class="field">
        <label for="cf-tipo">${esc(f.typeLabel || 'Tipo de proyecto')} <span class="field__optional">(opcional)</span></label>
        <select id="cf-tipo" name="tipo"><option value="">Elegí una opción</option>${options}</select>
      </div>
      <div class="field">
        <label for="cf-mensaje">Mensaje</label>
        <textarea id="cf-mensaje" name="mensaje" rows="4" required minlength="15" aria-describedby="cf-mensaje-hint cf-mensaje-error"></textarea>
        <p class="field__hint" id="cf-mensaje-hint">${esc(f.messageHint || 'Contame qué necesitás y, si la tenés, una fecha aproximada.')}</p>
        <p class="field__error" id="cf-mensaje-error" data-error-for="cf-mensaje"></p>
      </div>
      <button class="button button--block" type="submit">${esc(f.submitLabel)}</button>
      <p class="form-note">${esc(modeNote)}</p>
      <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div>
    </form>`;
}

const newTab = '<span class="visually-hidden"> (se abre en una pestaña nueva)</span>';

export default function contact(config) {
  const c = config.contact;
  const channels = [
    `<li class="channel">
          <span class="channel__icon">${icons.chat}</span>
          <div class="channel__body">
            <p class="channel__label">WhatsApp</p>
            <p class="channel__value">${esc(c.whatsapp.display)}</p>
          </div>
          <a class="button button--invert button--small" ${linkAttrs(whatsappUrl(c))}>Abrir chat${newTab}</a>
        </li>`,
    config.instagramUrl && config.instagram?.handle
      ? `<li class="channel">
          <span class="channel__icon">${icons.insta}</span>
          <div class="channel__body">
            <p class="channel__label">Instagram</p>
            <p class="channel__value">${esc(config.instagram.handle)}</p>
          </div>
          <a class="button button--invert button--small" ${linkAttrs(config.instagramUrl)}>Ver perfil${newTab}</a>
        </li>`
      : '',
    c.email
      ? `<li class="channel">
          <span class="channel__icon">${icons.mail}</span>
          <div class="channel__body">
            <p class="channel__label">Email</p>
            <p class="channel__value"><a href="${esc(mailtoUrl(c))}">${esc(c.email)}</a></p>
          </div>
          <button class="button button--invert button--small" type="button" data-copy="${esc(c.email)}">${icons.copy}<span data-copy-label>Copiar</span></button>
        </li>`
      : '',
  ].filter(Boolean);
  return `<section class="section contact" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-titulo">
  <div class="container contact__grid">
    <div class="contact__panel" data-reveal>
      ${sectionHeader(c)}
      <ul class="channels" role="list">
        ${channels.join('\n        ')}
      </ul>
      ${c.responseNote ? `<p class="contact__note">${rich(c.responseNote)}</p>` : ''}
    </div>
    ${form(config)}
  </div>
</section>`;
}
