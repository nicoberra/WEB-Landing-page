# Qué tiene que tener un CRM · investigación para NB.studio

*Investigación web del 20/11/2026: páginas oficiales de Kommo y Clientify, texto de la Ley 25.326, comparativas, Capterra, Trustpilot y documentación de Meta y Mercado Pago. Lo que no se pudo confirmar está marcado al final. No es asesoramiento legal.*

## 1. Funciones, agrupadas

### A. Contactos y fichas
- **Ficha de cliente**: nombre, teléfono, mail, origen y notas en un solo lugar (hoy está repartido entre WhatsApp, mail y planillas).
- **Historial completo**: mensajes, notas, compras y presupuestos; si cambia el vendedor no se pierde nada.
- **Campos personalizados del rubro** (talle, patente, tipo de dieta): lo que un CRM genérico hace a medias.
- **Etiquetas y segmentos** ("compró hace más de 90 días") para seguimientos y campañas.
- **Empresas con varios contactos** (si vende a otros negocios).
- **Detección y fusión de duplicados** (mismo cliente por WhatsApp y por la web).
- **Origen del contacto** (Instagram, Google, referido): qué publicidad trae ventas.

### B. Embudo de ventas
- **Tablero por etapas** (nuevo → contactado → presupuesto → ganado/perdido) que se arrastra. Es lo más elogiado de Pipedrive.
- **Varios embudos** (mayorista/minorista, ventas/postventa).
- **Valor y probabilidad** de cada oportunidad, previsión del mes.
- **Motivos de pérdida** (precio, demora, stock).
- **Alertas de oportunidades estancadas.**

### C. Consultas y conversaciones
- **Bandeja unificada**: WhatsApp, Instagram, Facebook, mail y chat web en una pantalla, atada a la ficha. En Argentina WhatsApp es el canal principal.
- **WhatsApp por la API oficial de Meta**, no con extensiones no oficiales (pueden suspender el número).
- **Varios usuarios en un mismo número** y **asignación automática de chats**.
- **Respuestas rápidas y plantillas.**
- **Chatbot o respuesta fuera de horario** que toma los datos.
- **Formularios web conectados** (une el CRM con las landings).
- **Difusiones por WhatsApp** con plantillas aprobadas (tienen costo por mensaje).

### D. Tareas y recordatorios
- Tareas con fecha, responsable y prioridad; agenda de llamadas, visitas y turnos.
- **Reservas o turnos online** con enlace propio.
- Avisos al celular o por mail ("hoy tenés 5 seguimientos").

### E. Automatizaciones
- Seguimiento automático si el cliente no responde en X días.
- Reglas por etapa (al ganar: pedir el pago, mandar las gracias).
- Recordatorios al cliente: turno, pago vencido, recompra.
- Recuperación de carritos abandonados (si hay tienda).

### F. Presupuestos y facturación
- Presupuesto en PDF o enlace desde la ficha, con estado (enviado, visto, aceptado, vencido) y aceptación online.
- **Factura electrónica de ARCA**: ningún CRM global de la comparativa lo hace de forma nativa (se conecta Facturante, Xubio, etc.). Hueco local claro.
- **Cuenta corriente y cobranzas.**

### G. Pagos (Mercado Pago)
- Link de pago desde el presupuesto y envío por WhatsApp.
- **Confirmación automática del pago** (webhooks con firma `x-signature`): la venta pasa sola a "pagada".
- Los CRM globales lo resuelven con Zapier o configuración manual; uno a medida lo trae de fábrica.
- Cobros recurrentes (cuotas, abonos).

### H. Catálogo y productos
- Catálogo con precios, variantes y stock básico.
- Listas de precios mayorista/minorista, fáciles de actualizar (inflación).
- Integración con la tienda online o Mercado Libre: los pedidos entran a la ficha.

### I. Reportes
- Tablero: consultas nuevas, ventas del mes, tasa de cierre.
- Ventas por canal y por vendedor; embudo de conversión; retorno de la publicidad.
- **Tiempo de respuesta**: según un estudio publicado en Harvard Business Review, contactar en la primera hora da casi 7 veces más chances de calificar al cliente.
- Los reportes flojos son la queja número uno de Pipedrive.

### J. Equipo y permisos
- Roles (dueño, vendedor, administración); cada vendedor ve sus clientes y no puede exportar la base.
- Registro de actividad (quién cambió o borró qué). Metas y comisiones.

### K. Celular
- Que funcione cómodo desde el celular (app web instalable) y avise de consultas nuevas.

### L. Integraciones
- WhatsApp e Instagram oficiales, Gmail, Google Calendar, Mercado Pago, facturador de ARCA, tienda online, formularios de Meta y Google Ads, Zapier/Make/API.

### M. Importar y exportar
- Importar desde Excel, Google Sheets y contactos del celular.
- Exportar todo cuando quiera (los datos son del negocio). Copias de seguridad automáticas (en Kommo, solo plan Empresarial).

### N. Seguridad y privacidad (Ley 25.326)
- **Consentimiento** (art. 5): casilla en los formularios y registro de cuándo lo dio.
- **Informar** (art. 6): política de privacidad enlazada.
- **Datos sensibles** (art. 7): salud y otros, protección especial (clave para NutriSigo, estética).
- **Seguridad y confidencialidad** (arts. 9 y 10): login seguro, permisos, cifrado, copias y registro de accesos (medidas recomendadas en la Res. AAIP 47/2018).
- **Transferencia internacional** (art. 12): saber en qué país está el servidor.
- **Acceso en 10 días corridos** (art. 14) y **rectificación o borrado en 5 días hábiles** (art. 16): botón "exportar o borrar este cliente".
- **Baja de marketing** (art. 27): estado "no contactar".
- **Inscripción de la base** en la AAIP (art. 21): no está claro si aplica a toda base de clientes de una pyme; consultarlo con un abogado.

### O. Inteligencia artificial
- Respuestas sugeridas, resumen del chat, aviso de consultas sin responder, agentes que califican y agendan, mensajes de voz. Cuidar no mandar datos sensibles a terceros sin control.

## 2. Paquetes sugeridos

### Básico · "Que no se pierda ninguna consulta"
Fichas con historial, etiquetas y origen · un embudo visual · tareas y recordatorios · botón para abrir el WhatsApp desde la ficha · formulario web conectado · búsqueda, importar de Excel y exportar · cómodo en el celular · login y 2 o 3 roles · tablero simple · consentimiento, privacidad y borrar/exportar cliente · copias de seguridad.

### Intermedio · "Vendé más y trabajá menos"
Todo lo anterior + bandeja unificada con WhatsApp oficial e Instagram, varios usuarios y asignación · respuestas rápidas · varios embudos y motivos de pérdida · automatizaciones de seguimiento · catálogo y listas de precios · presupuestos con estado · **link de Mercado Pago con confirmación automática** · reportes por canal, vendedor y tiempo de respuesta · permisos y registro de actividad · agenda o turnos.

### Premium · "Tu negocio en un solo panel"
Todo lo anterior + agente de IA que responde, califica y agenda · difusiones por WhatsApp · turnos online · facturador de ARCA y cuenta corriente · integración con tienda o Mercado Libre y recupero de carritos · cobros recurrentes · portal o app para el cliente final (como NutriSigo) · origen desde Meta y Google Ads con retorno · metas y comisiones · auditoría completa y cifrado para datos sensibles.

## 3. Qué valoran y de qué se quejan las pymes
**Valoran:** que sea fácil y visual, WhatsApp integrado, automatizaciones que ahorran tiempo, empezar gratis o barato.

**Se quejan de:** precios que se disparan al crecer (HubSpot) y cobro por usuario (Kommo) · cobro en dólares con recargos de tarjeta · permanencia mínima (Kommo: 6 meses) · soporte lento para cuentas chicas · funciones bloqueadas en planes caros · reportes pobres · interfaces abrumadoras (Zoho, Bitrix24) · no conocen ARCA ni el contexto argentino · el equipo no lo usa (baja adopción).

## 4. Precios de mercado (USD por usuario por mes, noviembre 2026, solo referencia)
| CRM | Entrada | Intermedio | Alto | Condiciones |
|---|---|---|---|---|
| Kommo | 20 | 30 | 45 (Pro) | Mínimo 6 meses, solo USD |
| Pipedrive | 14 anual / 24 mensual | 39 / 49 | 59–99 | Sin plan gratis; las fuentes no coinciden |
| HubSpot | Gratis; Starter 9 / 15 | Professional (+ USD 1.500 de implementación) | Enterprise | Saltos grandes por contactos |
| Zoho | Gratis hasta 3 usuarios; 14 anual | 23 | 40–52 | Pago anual |
| Salesforce | 25 | 100 | 195+ | Prueba de 30 días |
| Clientify | 39 anual / 65 mensual por asiento | — | — | Incluye WhatsApp y presupuestos |
| Bitrix24 | 61 para 5 usuarios (total) | 124 para 50 | 249 para 100 | Plan gratis |

Extras que se olvidan: mensajes de plantilla de WhatsApp (Meta cobra por mensaje; desde abril de 2026 factura en pesos en Argentina), configuración inicial (alrededor de USD 150–300 según una comparativa local), créditos de IA, complementos y Zapier.

Ejemplo: 3 usuarios en Kommo Avanzado = USD 90 por mes, en un pago de USD 540 por 6 meses, más los mensajes de WhatsApp.

## 5. Cómo diferenciar el CRM de NB.studio
1. **Precio en pesos, sin cobro por usuario y sin permanencia** (implementación + abono fijo).
2. **Hecho para el WhatsApp argentino**: API oficial y plantillas del rubro.
3. **Mercado Pago integrado**: presupuesto → link → pago confirmado → venta cerrada.
4. **Pensado para ARCA**: facturador local y cuenta corriente.
5. **Solo lo que el rubro necesita**: menos botones, más uso.
6. **Migración incluida** desde Excel y contactos.
7. **Soporte humano por WhatsApp** en horario argentino.
8. **Los datos son del cliente**: exportación total y copias incluidas.
9. **Ley 25.326 desde el diseño**: consentimiento, borrado y exportación, "no contactar", permisos.
10. **Unido a la landing y la tienda** de NB.studio.
11. **Portal o app para el cliente final** (como NutriSigo).
12. **Indicadores para el dueño**: tiempo de respuesta, consultas sin contestar, ventas por canal.
13. **IA útil sin créditos por usuario.**
14. **Paquetes con nombres de beneficio**, no "Básico / Pro / Enterprise".

## Lo que no se pudo confirmar
- Porcentajes de fracaso de CRM (49–69%) y la "regla de los 5 minutos" (vienen de blogs, sin estudio original).
- Tarifas oficiales por mensaje de WhatsApp en Argentina 2026.
- Si toda base de clientes de una pyme debe inscribirse en la AAIP y si la Res. 47/2018 sigue sin cambios.
- Precio actual de HubSpot Professional, valores exactos de Pipedrive y fecha de los precios de Clientify.
- Qué CRM resuelve bien hoy los cobros recurrentes con Mercado Pago.

## Fuentes principales
- Kommo, planes: https://www.kommo.com/es/precios/comparar-planes/
- Clientify, precios: https://clientify.com/precios
- Comparativa CRM pymes Argentina 2026: https://developargentina.com/blog/crm-para-pymes-argentina-comparativa-2026
- Ley 25.326: https://www.argentina.gob.ar/normativa/nacional/64790/texto
- AAIP, Resolución 47/2018: https://www.argentina.gob.ar/normativa/nacional/resolución-47-2018-312662/texto
- Mercado Pago, webhooks: https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/resources/notifications/webhooks
- Meta, precios de WhatsApp: https://developers.facebook.com/docs/whatsapp/pricing
- Reseñas: Capterra (Pipedrive, HubSpot, Kommo), Trustpilot (HubSpot)
- Salesforce, precios: https://www.salesforce.com/sales/pricing/
