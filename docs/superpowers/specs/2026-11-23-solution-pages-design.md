# Páginas de solución + botones consistentes (diseño)

Fecha: 2026-11-23 · Pedido por Lisandro tras revisar las páginas de industria.

## Problema
Las tarjetas de "What we automate" en cada industria enlazaban a uno de los 6 servicios principales aunque el título hablara de otra cosa ("Rebooking and loyalty" abría Admin Audit, "Aftercare and reviews" abría Digital Marketing). Los servicios principales son resúmenes amplios; falta una página que explique cada automatización concreta.

## Solución
Nueva sección `/solutions` con una página por automatización concreta. Cada tarjeta de industria abre la página que corresponde exactamente a su título. Cuando la tarjeta sí es un servicio principal (sitio web, contenido para redes, SEO local) abre ese servicio.

| Slug | Página | Servicio principal "padre" | La usan |
|---|---|---|---|
| `ai-receptionist` | AI Receptionist for Calls, Texts & DMs | AI Agents & Chatbots | tatuajes, barberías, talleres, plomería, dental, eye care |
| `online-booking-reminders` | Online Booking, Deposits & Reminders | Web Design & Development | tatuajes, barberías |
| `follow-up-reminders` | Follow-Up, Recall & Service Reminders | Executive AI: Admin Automation | tatuajes (aftercare), talleres, limpieza, paving, plomería, dental, eye care |
| `reviews-reputation` | Review Requests & Reputation | Digital Marketing & AEO | barberías, dental |
| `loyalty-rebooking` | Loyalty Programs & Rebooking (MyLoyalink) | Digital Products (MyLoyalink) | barberías |
| `lead-response-follow-up` | Instant Lead Response & Proposal Follow-Up | AI Agents & Chatbots | construcción |
| `quotes-estimates` | Instant Quotes & Estimate Intake | AI Agents & Chatbots | limpieza, paving |
| `scheduling-status-updates` | Scheduling, Dispatch & Status Updates | Executive AI: Admin Automation | talleres, limpieza, construcción, paving, plomería, eye care |
| `digital-intake-forms` | Digital Intake & Onboarding Forms | Web Design & Development | dental |

Tarjetas que van a servicios principales: sitio web → Web Design & Development; contenido para redes → Content Creation; SEO local / visibilidad → Digital Marketing & AEO.

Cada página de solución: hero + botón → qué resuelve (intro) → qué incluye → cómo funciona (pasos) → con qué herramientas se conecta → industrias que la usan (calculado desde `content/industries.ts`) → servicio principal relacionado (y MyLoyalink cuando aplica) → FAQ → formulario. Índice `/solutions`. Sitemap, llms.txt y schema `Service` + `FAQPage`.

## Botones
Nuevo componente `CtaButton` con el mismo efecto del botón principal del hero (`MagnetizeButton`: partículas + hover a malva + escala) y la variante secundaria del hero. Se usa en los CTA de páginas de zona, industria, solución, servicios e índices. "#contact" hace scroll al formulario de la misma página.

## Reglas
Mismo estilo liquid glass y hover coral; sin cifras inventadas; sin nombres de clientes; sin prometer HIPAA. Los títulos de las tarjetas se ajustan para que digan exactamente lo que abre la página.
