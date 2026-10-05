import { esc, rich, sectionHeader, whatsappUrl, mailtoUrl, icons } from '../helpers.mjs';

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
  return `<form class="contact-form" novalidate data-contact-form data-mode="${esc(f.mode)}" data-target="${esc(target)}">
      <h3>${esc(f.title)}</h3>
      <div class="field">
        <label for="cf-nombre">Nombre</label>
        <input id="cf-nombre" name="nombre" type="text" autocomplete="name" required minlength="2" aria-describedby="cf-nombre-error">
        <p class="field__error" id="cf-nombre-error" data-error-for="cf-nombre"></p>
      </div>
      <div class="field">
        <label for="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="cf-email-error">
        <p class="field__error" id="cf-email-error" data-error-for="cf-email"></p>
      </div>
      <div class="field">
        <label for="cf-tipo">Tipo de proyecto <span class="field__optional">(opcional)</span></label>
        <select id="cf-tipo" name="tipo"><option value="">Elegí una opción</option>${options}</select>
      </div>
      <div class="field">
        <label for="cf-mensaje">Mensaje</label>
        <textarea id="cf-mensaje" name="mensaje" rows="4" required minlength="15" aria-describedby="cf-mensaje-hint cf-mensaje-error"></textarea>
        <p class="field__hint" id="cf-mensaje-hint">Contame qué necesitás y, si la tenés, una fecha aproximada.</p>
        <p class="field__error" id="cf-mensaje-error" data-error-for="cf-mensaje"></p>
      </div>
      <button class="button button--block" type="submit">${esc(f.submitLabel)}</button>
      <p class="form-note">${esc(modeNote)}</p>
      <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div>
    </form>`;
}

export default function contact(config) {
  const c = config.contact;
  const wa = whatsappUrl(c);
  return `<section class="section contact" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-titulo">
  <div class="container contact__grid">
    <div class="contact__panel">
      ${sectionHeader(c)}
      <ul class="channels" role="list">
        <li class="channel">
          <span class="channel__icon">${icons.chat}</span>
          <div class="channel__body">
            <p class="channel__label">WhatsApp</p>
            <p class="channel__value">${esc(c.whatsapp.display)}</p>
          </div>
          <a class="button button--invert button--small" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">Abrir chat<span class="visually-hidden"> de WhatsApp (se abre en una pestaña nueva)</span></a>
        </li>
        <li class="channel">
          <span class="channel__icon">${icons.mail}</span>
          <div class="channel__body">
            <p class="channel__label">Email</p>
            <p class="channel__value"><a href="${esc(mailtoUrl(c))}">${esc(c.email)}</a></p>
          </div>
          <button class="button button--invert button--small" type="button" data-copy="${esc(c.email)}">${icons.copy}<span data-copy-label>Copiar</span></button>
        </li>
      </ul>
      ${c.responseNote ? `<p class="contact__note">${rich(c.responseNote)}</p>` : ''}
    </div>
    ${form(config)}
  </div>
</section>`;
}
