import type { Metadata } from 'next';
import LegalDocument, { A, H3, P, Table, UL, type LegalSection } from '../../../components/LegalDocument';
import CookieSettingsButton from '../../../components/CookieSettingsButton';
import JsonLd from '../../../components/JsonLd';
import { LEGAL, LEGAL_PATHS } from '../../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../../lib/seo';

// Spanish translation of /privacy. Keep both versions in step: the English one controls if they differ.

const PATH = LEGAL_PATHS.es.privacy;
const TITLE = 'Política de Privacidad (CCPA y leyes de privacidad de EE. UU.) | Xtek AI';
const DESCRIPTION =
    'Cómo Xtek AI recopila, usa, comparte y protege la información personal, y los derechos de privacidad que tienes según la CCPA/CPRA y otras leyes estatales de EE. UU.';

const base = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
export const metadata: Metadata = {
    ...base,
    alternates: { canonical: PATH, languages: { en: LEGAL_PATHS.en.privacy, es: PATH } },
    openGraph: { ...base.openGraph, locale: 'es_US' },
};

const sections: LegalSection[] = [
    {
        id: 'quienes-somos',
        title: 'Quiénes somos y qué cubre esta política',
        body: (
            <>
                <P>
                    {LEGAL.name} (&ldquo;Xtek AI&rdquo;, &ldquo;nosotros&rdquo;) es una agencia de implementación de inteligencia artificial y marketing digital de los
                    Estados Unidos. Somos el &ldquo;negocio&rdquo; (responsable) de la información personal descrita en esta política. Operamos en línea: no tenemos una
                    oficina abierta al público y nuestras reuniones con clientes se hacen por videollamada.
                </P>
                <P>
                    Esta política se aplica a la información personal que recopilamos a través de <strong>xtekai.com</strong> y sus subsitios (incluidas nuestras páginas
                    de aterrizaje o landing pages), nuestros formularios de contacto, cotización y boletín, nuestro asistente de IA de voz y chat, nuestros correos y
                    llamadas con prospectos, y nuestras interacciones en Google, Facebook, Instagram y LinkedIn.
                </P>
                <P>
                    <strong>Trabajo para clientes.</strong> Cuando creamos o manejamos automatizaciones para un cliente, a menudo tratamos información personal de los
                    clientes o empleados de ese cliente. En ese caso actuamos como <strong>proveedor de servicios</strong> del cliente, seguimos sus instrucciones y
                    tratamos esa información según nuestro contrato por escrito con él. Si tu información la tiene uno de nuestros clientes, contacta primero a ese cliente.
                </P>
                <P>
                    <strong>Contacto:</strong> <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> · <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>.
                </P>
            </>
        ),
    },
    {
        id: 'informacion-que-recopilamos',
        title: 'Información personal que recopilamos',
        body: (
            <>
                <P>
                    Esta es la información personal que recopilamos en los últimos 12 meses y que seguimos recopilando, con su categoría según la ley de California (CCPA):
                </P>
                <Table
                    head={['Qué recopilamos', 'Ejemplos', 'De dónde viene', 'Categoría CCPA']}
                    rows={[
                        [
                            'Datos de contacto',
                            'Nombre, nombre del negocio u organización, correo electrónico, número de teléfono, sector o industria (solicitudes de Next Horizon).',
                            'Tú, cuando llenas un formulario de contacto, cotización o boletín, o cuando nos escribes o llamas.',
                            'Identificadores; registros de clientes (Cal. Civ. Code § 1798.80(e)); información profesional (nombre del negocio)',
                        ],
                        [
                            'Tus mensajes y solicitudes',
                            'La descripción de tu proyecto, tus preguntas, tus preferencias de reunión y el contenido de los correos y llamadas con nosotros.',
                            'Tú.',
                            'Información comercial; información de audio y electrónica (contenido de llamadas y correos)',
                        ],
                        [
                            'Registros de mensajes de texto (SMS)',
                            'Tu número de celular, si diste tu consentimiento o te diste de baja y cuándo, el texto que aceptaste, la página y los datos del dispositivo desde donde lo diste, y el contenido y estado de entrega de los mensajes que intercambiamos.',
                            'Tú y nuestro proveedor de la plataforma de mensajería.',
                            'Identificadores; información comercial; información electrónica',
                        ],
                        [
                            'Conversaciones con el asistente de IA',
                            'Tu voz y/o tus mensajes escritos, y la transcripción resultante, cuando usas nuestro asistente de IA de voz o chat.',
                            'Tú, a través del asistente de nuestro sitio.',
                            'Información de audio y electrónica',
                        ],
                        [
                            'Datos del dispositivo y de uso',
                            'Dirección IP, tipo de navegador y dispositivo, páginas vistas, página de referencia, ubicación aproximada según tu dirección IP, fecha y hora, y el anuncio o enlace que te trajo al sitio (etiquetas de campaña como los parámetros UTM y el identificador de clic de Facebook), que guardamos junto con cualquier formulario que envíes.',
                            'Automáticamente desde tu navegador. Los registros del servidor se crean siempre; las herramientas de analítica y publicidad se aplican como se explica en la sección de cookies.',
                            'Actividad en internet u otra red; datos de geolocalización (solo aproximada)',
                        ],
                        [
                            'Identificadores en línea',
                            'Identificadores de cookies de Google Analytics y del Meta Pixel.',
                            'Tu navegador, salvo que te excluyas.',
                            'Identificadores; actividad en internet u otra red',
                        ],
                        [
                            'Información de clientes y del negocio',
                            'Documentos del negocio, accesos a cuentas, facturas y datos de procesos que nos das para prestar los servicios.',
                            'Tú, durante un proyecto.',
                            'Información comercial; información profesional',
                        ],
                        [
                            'Conversaciones de Instagram',
                            'Los mensajes y comentarios que envías a nuestra cuenta de Instagram y nuestras respuestas, algunas escritas por un agente de IA (ver «Asistentes de IA»), y los datos de contacto que compartes ahí.',
                            'Tú, a través de Instagram (Meta).',
                            'Identificadores; información comercial; información electrónica',
                        ],
                        [
                            'Información pública de tu negocio',
                            'El perfil público de Google Business de tu negocio, su página web, sus reseñas y sus redes sociales, que revisamos para preparar la auditoría gratis que pides y nuestras propuestas.',
                            'Fuentes públicas.',
                            'Información comercial; información profesional',
                        ],
                        [
                            'Interacciones en perfiles públicos',
                            'Reseñas, mensajes o comentarios que publicas en nuestras páginas de Google Business Profile, Facebook, Instagram o LinkedIn.',
                            'Tú y la plataforma.',
                            'Identificadores; información electrónica',
                        ],
                    ]}
                />
                <P>
                    <strong>Información personal sensible.</strong> No pedimos ni pretendemos recopilar información personal sensible (como datos de salud, números de
                    Seguro Social u otros documentos de identidad, credenciales de cuentas financieras, geolocalización precisa, datos biométricos, o información sobre
                    raza, religión, orientación sexual o situación migratoria). Por favor no la envíes por nuestros formularios ni al asistente de IA. Xtek AI no es una
                    entidad cubierta por HIPAA y nuestro sitio no está pensado para información médica protegida.
                </P>
                <P>Nunca estás obligado a darnos información personal, pero sin ella tal vez no podamos responder a tu solicitud.</P>
            </>
        ),
    },
    {
        id: 'como-la-usamos',
        title: 'Cómo usamos la información personal',
        body: (
            <>
                <P>Usamos la información anterior para estos fines de negocio:</P>
                <UL>
                    <li>responder a tu consulta, agendar reuniones y preparar propuestas;</li>
                    <li>prestar, administrar, dar soporte y cobrar nuestros servicios, y guardar registros para fines fiscales, contables y legales;</li>
                    <li>enviar nuestro boletín y otro marketing sobre nuestros servicios (puedes darte de baja cuando quieras);</li>
                    <li>entender cómo se usa el sitio y mejorarlo (Google Analytics);</li>
                    <li>medir nuestra publicidad en Facebook e Instagram y mostrar nuestros anuncios a personas que visitaron nuestro sitio (retargeting) con el Meta Pixel, salvo que te excluyas;</li>
                    <li>si enviaste un formulario, incluir tu correo electrónico (nunca tu número de teléfono) en nuestras audiencias de anuncios de Facebook e Instagram, salvo que te excluyas;</li>
                    <li>preparar la auditoría gratis que pides, revisando la presencia pública en línea de tu negocio antes de nuestra llamada;</li>
                    <li>operar nuestros asistentes de IA (el asistente de voz y chat del sitio y el agente que responde los mensajes y comentarios de Instagram);</li>
                    <li>mantener seguros el sitio y nuestro negocio, prevenir fraude y abuso, y corregir errores;</li>
                    <li>cumplir la ley y establecer, ejercer o defender reclamaciones legales.</li>
                </UL>
                <P>
                    No tomamos decisiones sobre ti basadas únicamente en tratamiento automatizado que produzcan efectos legales o igualmente significativos, y no usamos
                    información personal para entrenar nuestros propios modelos de IA. No vendemos información personal a cambio de dinero.
                </P>
            </>
        ),
    },
    {
        id: 'cookies',
        title: 'Cookies, tecnologías similares y tus opciones de privacidad',
        body: (
            <>
                <P>
                    <strong>Aviso al momento de la recopilación.</strong> Cuando visitas nuestro sitio, nosotros y nuestros proveedores podemos recopilar datos del
                    dispositivo y de uso y colocar cookies de analítica (Google Analytics) y de medición publicitaria (Meta Pixel), para los fines descritos en esta
                    política y por el tiempo de duración de las cookies indicado abajo. Puedes excluirte cuando quieras.
                </P>
                <Table
                    head={['Nombre', 'Proveedor', 'Para qué sirve', 'Categoría', 'Duración típica']}
                    rows={[
                        [
                            <code key="c1">xtek-cookie-consent</code>,
                            'Xtek AI (guardado en el almacenamiento local de tu navegador)',
                            'Recuerda tus opciones de privacidad.',
                            'Estrictamente necesaria',
                            'Hasta que la cambies o borres los datos de tu navegador',
                        ],
                        [
                            <code key="c4">xtek_tracking, xtek_landing_path</code>,
                            'Xtek AI (guardado en el almacenamiento de sesión de tu navegador)',
                            'Guarda las etiquetas de campaña del enlace por el que llegaste (por ejemplo, los parámetros UTM y el identificador de clic de Facebook) para que se guarden con el formulario que envíes, y la landing page de la que vienes para que nuestras páginas legales te regresen a ella.',
                            'Funcional (propia)',
                            'Hasta que cierres la pestaña',
                        ],
                        [
                            <code key="c2">_ga, _ga_G-29BT1LZTS0</code>,
                            'Google Analytics 4 (Google LLC)',
                            'Distingue a los visitantes y mide cómo se usa el sitio.',
                            'Analítica',
                            'Hasta 2 años',
                        ],
                        [
                            <code key="c3">_fbp, _fbc</code>,
                            'Meta Pixel (Meta Platforms, Inc.)',
                            'Mide los resultados de nuestros anuncios en Facebook e Instagram y les atribuye las visitas.',
                            'Marketing / publicidad',
                            'Hasta 90 días',
                        ],
                    ]}
                />
                <H3>Otras solicitudes a terceros</H3>
                <P>
                    Para mostrar el sitio cargamos algunos recursos de terceros, que reciben tu dirección IP y los datos de tu navegador cuando este los solicita: scripts
                    de animación de cdnjs (Cloudflare) y unpkg, algunas fotografías de Unsplash y el widget del asistente de IA de ElevenLabs (que se carga cuando
                    interactúas con la página o después de unos segundos). Las tipografías se sirven desde nuestro propio dominio.
                </P>
                <H3>Cloudflare Turnstile</H3>
                <P>
                    Nuestros formularios están protegidos por Cloudflare Turnstile, que nos ayuda a evitar spam y abuso. Turnstile puede recopilar información sobre tu
                    dispositivo y navegador para verificar que eres una persona real. Cloudflare trata estos datos según su{' '}
                    <A href="https://www.cloudflare.com/turnstile-privacy-policy/">Anexo de Privacidad de Turnstile</A>.
                </P>
                <H3>Tus opciones de privacidad</H3>
                <UL>
                    <li>
                        Abre <CookieSettingsButton>Tus opciones de privacidad</CookieSettingsButton> (también enlazado en el pie de página) para excluirte de las cookies de
                        analítica y/o publicidad. Cuando te excluyes, dejamos de cargar esas herramientas y borramos sus cookies; puedes cambiar de opinión ahí cuando quieras.
                    </li>
                    <li>
                        <strong>Global Privacy Control (GPC).</strong> Si tu navegador o una extensión envía la señal GPC, la tratamos como una solicitud válida para no
                        vender ni compartir tu información personal y para excluirte de la publicidad dirigida, y no cargamos herramientas de analítica ni de publicidad en
                        ese navegador.
                    </li>
                    <li>También puedes bloquear o borrar cookies en la configuración de tu navegador, lo que puede afectar el funcionamiento de algunas páginas.</li>
                    <li>
                        Exclúyete de Google Analytics en todos los sitios con el{' '}
                        <A href="https://tools.google.com/dlpage/gaoptout">complemento de inhabilitación de Google Analytics</A> y administra los anuncios de Facebook e
                        Instagram en tus <A href="https://www.facebook.com/adpreferences">preferencias de anuncios de Meta</A>.
                    </li>
                </UL>
                <P>
                    <strong>Do Not Track.</strong> Las señales &ldquo;Do Not Track&rdquo; de los navegadores no son un estándar reconocido, así que no respondemos a ellas.
                    Sí respondemos a Global Privacy Control, como se explica arriba.
                </P>
            </>
        ),
    },
    {
        id: 'asistentes-ia',
        title: 'Asistentes de IA',
        body: (
            <>
                <P>
                    Nuestro sitio ofrece un asistente con inteligencia artificial (&ldquo;Start a call&rdquo;) proporcionado por ElevenLabs.{' '}
                    <strong>Estás hablando con una inteligencia artificial, no con una persona.</strong> Cuando lo usas, tu voz o tus mensajes se envían al proveedor
                    para que el asistente pueda entenderte y responderte, y la conversación <strong>puede ser grabada, transcrita y guardada</strong>. Lo usamos para
                    responder preguntas sobre nuestros servicios y ayudarte a contactarnos. Al usarlo aceptas esta grabación.
                </P>
                <UL>
                    <li>Usar el asistente es opcional; puedes contactarnos por formulario, correo o teléfono.</li>
                    <li>No compartas información sensible (de salud, cuentas financieras, documentos de identidad o contraseñas) con el asistente.</li>
                    <li>El asistente puede cometer errores. No da asesoría legal, médica ni financiera, y nada de lo que dice es una oferta vinculante.</li>
                    <li>Los datos de las conversaciones se tratan según nuestro contrato con el proveedor y esta política, y se guardan solo el tiempo indicado en &ldquo;Cuánto tiempo guardamos la información&rdquo;.</li>
                </UL>
                <P>
                    <strong>Instagram.</strong> Los mensajes y comentarios enviados a nuestra cuenta de Instagram pueden ser respondidos por un agente de IA. Puede
                    responder preguntas sobre nuestros servicios y ayudarte a agendar una llamada; una persona de nuestro equipo supervisa las conversaciones y puede
                    tomar el control en cualquier momento. Si compartes tus datos de contacto ahí, los guardamos junto con la conversación en nuestros registros de
                    clientes, como se describe en esta política.
                </P>
                <P>
                    <strong>Herramientas de IA que usamos internamente.</strong> Para responder y organizar las consultas más rápido, usamos servicios de IA de
                    proveedores como Anthropic, OpenAI y Google, que nos ayudan a redactar respuestas y correos y a resumir y organizar nuestros registros. Estos
                    proveedores tratan la información en nuestro nombre, como proveedores de servicios.
                </P>
            </>
        ),
    },
    {
        id: 'sms',
        title: 'Mensajes de texto y correos',
        body: (
            <>
                <P>
                    Enviamos dos tipos de mensajes, y nuestros formularios piden tu consentimiento para cada uno (para los mensajes de texto, consulta también nuestros{' '}
                    <A href={LEGAL_PATHS.es.sms}>Términos de SMS</A>):
                </P>
                <UL>
                    <li>
                        <strong>Mensajes de servicio (texto y correo)</strong>: solo los mensajes que necesitamos para atender tu solicitud y tus citas, como respuestas a
                        tu solicitud y seguimientos sobre ella, programación de citas, confirmaciones, recordatorios, y cambios o cancelaciones. Los aceptas al marcar la
                        casilla obligatoria de mensajes de servicio cuando envías un formulario, porque sin ellos no podemos responderte ni administrar tus citas.
                    </li>
                    <li>
                        <strong>Mensajes de marketing</strong>: ofertas, promociones y novedades sobre nuestros servicios. Son <strong>opcionales</strong>. Los mensajes de
                        texto de marketing y los correos de marketing tienen cada uno su propia casilla sin marcar, y el consentimiento nunca es condición para ninguna compra.
                    </li>
                </UL>
                <P>
                    Guardamos tu número de celular, un registro de cada consentimiento (el texto que aceptaste, la fecha y hora, la página que usaste, y tu navegador y
                    dirección IP) y los mensajes que intercambiamos contigo.
                </P>
                <UL>
                    <li>La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responde <strong>STOP</strong> para dejar de recibir mensajes de texto en cualquier momento y <strong>HELP</strong> para obtener ayuda; cada correo de marketing tiene un enlace para darte de baja.</li>
                    <li>Usamos una plataforma de mensajería de terceros y operadoras de telefonía móvil para entregar los mensajes de texto; ellas tratan tu número y el contenido de los mensajes en nuestro nombre.</li>
                    <li>
                        <strong>No se compartirá información móvil con terceros ni afiliados para fines de marketing o promocionales.</strong> Los datos de consentimiento
                        (opt-in) de mensajes de texto y el consentimiento mismo no se compartirán con ningún tercero para su propio uso.
                    </li>
                </UL>
            </>
        ),
    },
    {
        id: 'con-quien-compartimos',
        title: 'Con quién compartimos la información personal',
        body: (
            <>
                <P>En los últimos 12 meses divulgamos información personal para fines de negocio a:</P>
                <UL>
                    <li>
                        <strong>Proveedores de servicios</strong> que actúan según nuestras instrucciones: alojamiento web y entrega de contenido; herramientas de
                        automatización de procesos y de correo/CRM que reciben los formularios; herramientas de avisos internos del equipo; herramientas de agenda y
                        videollamadas; el proveedor del asistente de IA (ElevenLabs); proveedores de modelos de IA (como Anthropic, OpenAI y Google) que nos ayudan a
                        redactar respuestas y organizar registros; y proveedores de analítica (Google) y de medición publicitaria (Meta).
                    </li>
                    <li><strong>Asesores profesionales</strong> como contadores, abogados y aseguradoras, con deber de confidencialidad.</li>
                    <li><strong>Autoridades y otras partes</strong> cuando la ley lo exige o para proteger derechos, la seguridad y la protección.</li>
                    <li><strong>Un sucesor</strong> si participamos en una fusión, adquisición o venta de activos.</li>
                    <li><strong>Otros, cuando tú lo pides</strong>, por ejemplo si nos pides conectar con uno de tus proveedores.</li>
                </UL>
                <P>
                    <strong>Venta y compartición.</strong> No vendemos información personal a cambio de dinero. Las cookies de publicidad y analítica (el Meta Pixel y
                    Google Analytics) envían identificadores y actividad en internet a Meta y a Google, lo que algunas leyes estatales consideran una &ldquo;venta&rdquo;
                    o &ldquo;compartición&rdquo; para publicidad conductual entre contextos. Lo hacemos solo con los visitantes que no se han excluido. Puedes excluirte
                    cuando quieras en <CookieSettingsButton>Tus opciones de privacidad</CookieSettingsButton> o con una señal de Global Privacy Control. No vendemos ni
                    compartimos a sabiendas información personal de menores de 16 años.
                </P>
                <P>
                    <strong>Audiencias por correo en Meta (Custom Audiences).</strong> Si envías uno de nuestros formularios, podemos compartir{' '}
                    <strong>solo tu correo electrónico</strong>, en forma cifrada (hash), con Meta para mostrarte nuestros anuncios en Facebook e Instagram, mostrarlos a
                    personas parecidas a nuestros clientes, o evitar mostrártelos. Meta lo usa para encontrar cuentas que coincidan y borra los correos que no coinciden.
                    Nunca compartimos tu número de teléfono para esto. Algunas leyes estatales consideran esto una &ldquo;compartición&rdquo; para publicidad dirigida:
                    para excluirte, escribe a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> con el asunto &ldquo;No compartir&rdquo; y quitaremos tu correo de
                    nuestras audiencias y no lo incluiremos en las siguientes.
                </P>
                <P>
                    <strong>Información móvil.</strong> No se compartirá información móvil con terceros ni afiliados para fines de marketing o promocionales. Los datos de
                    consentimiento (opt-in) de mensajes de texto y el consentimiento mismo no se compartirán con ningún tercero para su propio uso. Consulta &ldquo;Mensajes
                    de texto y correos&rdquo; arriba.
                </P>
            </>
        ),
    },
    {
        id: 'donde-se-trata',
        title: 'Dónde se trata la información',
        body: (
            <>
                <P>
                    Xtek AI tiene su sede en los Estados Unidos y ofrece sus servicios a negocios en los Estados Unidos. Guardamos y tratamos la información personal en
                    los Estados Unidos. Actualmente no ofrecemos nuestros servicios a personas en el Espacio Económico Europeo, el Reino Unido ni Suiza. Si visitas
                    nuestro sitio desde fuera de los Estados Unidos, entiendes que tu información se transferirá y tratará en los Estados Unidos, donde las leyes de
                    protección de datos pueden ser distintas a las de tu país.
                </P>
            </>
        ),
    },
    {
        id: 'cuanto-tiempo',
        title: 'Cuánto tiempo guardamos la información',
        body: (
            <>
                <P>Guardamos la información personal solo el tiempo necesario para los fines anteriores, con estos criterios:</P>
                <UL>
                    <li><strong>Consultas y prospectos:</strong> hasta resolver tu solicitud y un tiempo razonable después para darte seguimiento; se borra si lo pides, salvo que la necesitemos por una razón legal.</li>
                    <li><strong>Clientes:</strong> durante el proyecto y después, por el periodo que exijan fines fiscales, contables, contractuales y de disputas.</li>
                    <li><strong>Boletín:</strong> hasta que te des de baja; después guardamos un registro mínimo de exclusión para no volver a escribirte.</li>
                    <li><strong>Datos de analítica y publicidad:</strong> por el periodo de retención configurado en esas herramientas; las cookies vencen como se indica arriba.</li>
                    <li><strong>Registros de consentimiento:</strong> el registro de tu consentimiento para mensajes de texto y correos se guarda al menos cuatro años después de tu última interacción o de tu baja, o más si la ley lo exige, para poder demostrar lo que aceptaste.</li>
                    <li><strong>Conversaciones con asistentes de IA y registros del servidor:</strong> el menor tiempo necesario para responder, mejorar la confiabilidad y mantener seguro el servicio.</li>
                </UL>
                <P>Cuando ya no necesitamos la información, la borramos o la anonimizamos.</P>
            </>
        ),
    },
    {
        id: 'como-la-protegemos',
        title: 'Cómo protegemos la información',
        body: (
            <>
                <P>
                    Usamos medidas administrativas, técnicas y físicas razonables según el riesgo, incluidas conexiones cifradas (HTTPS/TLS) entre tu navegador y
                    nuestro sitio, acceso limitado a quienes lo necesitan y proveedores con sus propios programas de seguridad. Ningún sistema es completamente seguro,
                    así que no podemos garantizar una seguridad absoluta. Si una filtración afecta tu información, te avisaremos a ti y a las autoridades según lo exija
                    la ley.
                </P>
            </>
        ),
    },
    {
        id: 'tus-derechos',
        title: 'Tus derechos de privacidad (California y otros estados de EE. UU.)',
        body: (
            <>
                <P>
                    Según dónde vivas, leyes como la Ley de Privacidad del Consumidor de California, modificada por la Ley de Derechos de Privacidad de California
                    (&ldquo;CCPA&rdquo;), y las leyes de privacidad de Colorado, Connecticut, Nueva Jersey, Oregón, Texas, Virginia y otros estados te dan derechos sobre
                    tu información personal. Respetamos estos derechos para los residentes de todos los estados que los otorgan.
                </P>
                <UL>
                    <li><strong>Conocer / acceder:</strong> las categorías y los datos específicos que tenemos sobre ti, las fuentes, los fines y las categorías de destinatarios (ver la tabla de arriba y &ldquo;Con quién compartimos la información personal&rdquo;);</li>
                    <li><strong>Borrar</strong> la información personal que recopilamos de ti, salvo excepciones legales;</li>
                    <li><strong>Corregir</strong> información personal inexacta;</li>
                    <li><strong>Portabilidad:</strong> recibir tu información en un formato portátil y fácil de usar;</li>
                    <li><strong>Excluirte de la venta, la compartición y la publicidad dirigida:</strong> usa <CookieSettingsButton>Tus opciones de privacidad</CookieSettingsButton> o una señal GPC, que tratamos como solicitud válida, y escríbenos para que tu correo no se incluya en nuestras audiencias de Meta (ver &ldquo;Con quién compartimos la información personal&rdquo;);</li>
                    <li><strong>Limitar el uso de información sensible:</strong> no aplica, porque no la recopilamos para hacer inferencias ni perfiles;</li>
                    <li><strong>Sin represalias:</strong> no te negaremos servicios, ni te cobraremos precios distintos, ni te daremos un servicio de calidad distinta por ejercer un derecho.</li>
                </UL>
                <P>
                    <strong>Cómo hacer una solicitud.</strong> Escribe a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llama al{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A> e indica qué derecho quieres ejercer. Confirmaremos que la recibimos en un plazo de 10 días
                    hábiles y responderemos en 45 días (podemos extenderlo una vez por otros 45 días y te diremos por qué). Para protegerte, verificamos la solicitud
                    comparando los datos que nos das con los que ya tenemos. Puedes usar un agente autorizado, que debe mostrar tu permiso por escrito; aun así podemos
                    verificar tu identidad directamente contigo.
                </P>
                <P>
                    <strong>Apelaciones.</strong> Si rechazamos tu solicitud y tu estado te da derecho a apelar, responde a nuestra decisión (o escríbenos con el asunto
                    &ldquo;Apelación&rdquo;) dentro de los 60 días siguientes y te responderemos en el plazo que exija tu estado. También puedes contactar al fiscal
                    general de tu estado.
                </P>
                <P>
                    <strong>&ldquo;Shine the Light&rdquo; de California y Nevada.</strong> Los residentes de California pueden preguntar una vez al año qué información
                    personal compartimos con terceros para su marketing directo (no lo hacemos). Los residentes de Nevada pueden enviar una solicitud de exclusión sobre
                    la venta de información personal; no la vendemos según la definición de la ley de Nevada.
                </P>
            </>
        ),
    },
    {
        id: 'marketing',
        title: 'Correos, llamadas y preferencias de marketing',
        body: (
            <>
                <P>
                    Enviamos correos de marketing solo a personas que se suscribieron o a quienes podemos contactar legalmente por motivos de negocio, de acuerdo con la
                    Ley CAN-SPAM. Cada correo de marketing incluye un enlace de baja que funciona y nuestros datos de contacto, y atendemos las bajas en un máximo de 10
                    días hábiles. También puedes pedirnos que dejemos de escribirte en <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A>.
                </P>
                <P>
                    Podemos llamarte sobre tu consulta al número que nos des; dinos si prefieres que no te llamemos y lo dejaremos de hacer y agregaremos tu número a
                    nuestra lista interna de no llamar. Enviamos <strong>mensajes de servicio</strong> por texto y correo (respuestas a tu solicitud y seguimientos sobre
                    ella, programación de citas, confirmaciones, recordatorios, y cambios o cancelaciones) porque los aceptaste al enviar un formulario. Enviamos mensajes
                    de texto y correos de <strong>marketing</strong> solo si marcaste las casillas opcionales y separadas para ellos o lo aceptaste de otra forma (ver
                    &ldquo;Mensajes de texto y correos&rdquo; y nuestros <A href={LEGAL_PATHS.es.sms}>Términos de SMS</A>), y nunca hacemos del consentimiento para
                    marketing una condición para comprar algo (Ley de Protección al Consumidor Telefónico, TCPA). Puedes darte de baja del marketing cuando quieras.
                </P>
            </>
        ),
    },
    {
        id: 'darse-de-baja',
        title: 'Cómo darte de baja de los correos y mensajes de texto',
        body: (
            <>
                <UL>
                    <li>
                        <strong>Correos.</strong> Cada correo que enviamos tiene al final un enlace para darte de baja, o puedes responder &ldquo;baja&rdquo;. El enlace
                        sigue funcionando al menos 30 días después de enviado el correo. Dejamos de enviarte correos de marketing y seguimientos automáticos de inmediato,
                        y siempre en un máximo de 10 días hábiles. Después solo te escribimos sobre una cita que agendaste o un proyecto que tengas con nosotros, o para
                        responderte si tú nos escribes.
                    </li>
                    <li>
                        <strong>Mensajes de texto.</strong> Responde <strong>STOP</strong> a cualquier mensaje (o END, CANCEL, UNSUBSCRIBE o QUIT) y dejamos de enviarte
                        todos los mensajes de texto, de servicio y de marketing, después de un último mensaje que lo confirma. Responde <strong>START</strong> para
                        volver a recibirlos y <strong>HELP</strong> para obtener ayuda. Consulta nuestros <A href={LEGAL_PATHS.es.sms}>Términos de SMS</A>.
                    </li>
                    <li>
                        <strong>Cualquier otra forma.</strong> Escribe a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llama al{' '}
                        <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A> y dinos qué mensajes quieres dejar de recibir.
                    </li>
                </UL>
                <P>Darte de baja es gratis, y nunca te pedimos nada más que tu correo o tu respuesta.</P>
            </>
        ),
    },
    {
        id: 'menores',
        title: 'Menores de edad',
        body: (
            <>
                <P>
                    Nuestro sitio y nuestros servicios están dirigidos a negocios y adultos. No están dirigidos a menores de 16 años y no recopilamos a sabiendas
                    información personal de ellos (de acuerdo con la Ley de Protección de la Privacidad Infantil en Internet, COPPA). Si crees que un menor nos dio
                    información, contáctanos y la borraremos.
                </P>
            </>
        ),
    },
    {
        id: 'sitios-de-terceros',
        title: 'Sitios y plataformas de terceros',
        body: (
            <>
                <P>
                    Nuestro sitio enlaza a servicios que no controlamos, como Google, Facebook, Instagram y LinkedIn. Sus prácticas de privacidad se rigen por sus
                    propias políticas, y te recomendamos leerlas. Las reseñas que mostramos en nuestro sitio están copiadas de nuestro perfil público de Google Business
                    con el nombre que muestra cada autor.
                </P>
            </>
        ),
    },
    {
        id: 'cambios',
        title: 'Cambios a esta política',
        body: (
            <>
                <P>
                    Podemos actualizar esta política cuando cambien nuestras prácticas o la ley. Publicaremos la nueva versión aquí con una nueva fecha y, si los cambios
                    son importantes, daremos un aviso adicional (por ejemplo, en el sitio o por correo).
                </P>
            </>
        ),
    },
    {
        id: 'contacto',
        title: 'Contáctanos',
        body: (
            <>
                <P>
                    ¿Preguntas, solicitudes o quejas sobre privacidad? Escribe a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llama al{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. Somos un negocio en línea sin oficina abierta al público, así que contáctanos por medios
                    electrónicos o por teléfono.
                </P>
            </>
        ),
    },
];

export default function PrivacidadPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('Política de Privacidad', DESCRIPTION, PATH, LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Inicio', path: '/' },
                        { name: 'Política de Privacidad', path: PATH },
                    ]),
                ]}
            />
            <LegalDocument
                lang="es"
                title="Política de Privacidad"
                translation={{ href: LEGAL_PATHS.en.privacy, label: 'Read in English' }}
                intro={
                    <>
                        <P>
                            Tu privacidad nos importa. Esta política explica, en lenguaje sencillo, qué información personal recopila Xtek AI, por qué la recopilamos, con
                            quién la compartimos, cuánto tiempo la guardamos y qué opciones y derechos tienes según la <strong>Ley de Privacidad del Consumidor de California
                            (CCPA/CPRA)</strong> y otras <strong>leyes estatales de privacidad de EE. UU.</strong>
                        </P>
                        <P>
                            Para cambiar tus opciones de cookies y publicidad, abre <CookieSettingsButton>Tus opciones de privacidad</CookieSettingsButton>. Para leer las
                            reglas de uso de nuestro sitio y servicios, consulta nuestros <A href={LEGAL_PATHS.es.terms}>Términos y Condiciones</A>.
                        </P>
                        <P>
                            Esta traducción se ofrece para tu comodidad. Si hay alguna diferencia con la <A href={LEGAL_PATHS.en.privacy}>versión en inglés</A>, prevalece
                            la versión en inglés.
                        </P>
                    </>
                }
                sections={sections}
                otherPage={{ href: LEGAL_PATHS.es.terms, label: 'Leer nuestros Términos y Condiciones' }}
            />
        </>
    );
}
