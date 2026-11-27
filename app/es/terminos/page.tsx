import type { Metadata } from 'next';
import LegalDocument, { A, P, UL, type LegalSection } from '../../../components/LegalDocument';
import JsonLd from '../../../components/JsonLd';
import { LEGAL, LEGAL_PATHS } from '../../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../../lib/seo';

// Spanish translation of /terms. Keep both versions in step: the English one controls if they differ.

const PATH = LEGAL_PATHS.es.terms;
const TITLE = 'Términos y Condiciones | Xtek AI';
const DESCRIPTION =
    'Los términos para usar el sitio de Xtek AI y nuestros servicios de automatización con IA, marketing y web: proyectos, pagos, propiedad intelectual, uso de IA, responsabilidad y ley aplicable.';

const base = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
export const metadata: Metadata = {
    ...base,
    alternates: { canonical: PATH, languages: { en: LEGAL_PATHS.en.terms, es: PATH } },
    openGraph: { ...base.openGraph, locale: 'es_US' },
};

const sections: LegalSection[] = [
    {
        id: 'acuerdo',
        title: 'Aceptación de estos términos',
        body: (
            <>
                <P>
                    Estos Términos y Condiciones (&ldquo;Términos&rdquo;) son un acuerdo legal entre tú y {LEGAL.name} (&ldquo;Xtek AI&rdquo;, &ldquo;nosotros&rdquo;),
                    una empresa de los Estados Unidos. Se aplican al uso de <strong>xtekai.com</strong> y de nuestras landing pages (el &ldquo;Sitio&rdquo;) y, junto con
                    cualquier propuesta, orden de trabajo o formulario de pedido que firmemos contigo (una &ldquo;Propuesta&rdquo;), a los servicios que prestamos (los
                    &ldquo;Servicios&rdquo;).
                </P>
                <P>
                    Al usar el Sitio, enviar un formulario o aceptar una Propuesta, aceptas estos Términos y nuestra{' '}
                    <A href={LEGAL_PATHS.es.privacy}>Política de Privacidad</A>. Si no estás de acuerdo, no uses el Sitio ni los Servicios. Si una Propuesta contradice
                    estos Términos, la Propuesta prevalece para ese proyecto.
                </P>
            </>
        ),
    },
    {
        id: 'quien-puede-usar',
        title: 'Quién puede usar el Sitio y los Servicios',
        body: (
            <>
                <P>
                    Nuestro Sitio y nuestros Servicios están dirigidos a negocios y adultos en los Estados Unidos. Debes tener al menos 18 años y, si actúas en nombre de
                    un negocio, tener autoridad para obligarlo a cumplir estos Términos.
                </P>
            </>
        ),
    },
    {
        id: 'uso-del-sitio',
        title: 'Uso del Sitio',
        body: (
            <>
                <P>Te comprometes a no:</P>
                <UL>
                    <li>usar el Sitio de forma ilegal o de manera que infrinja los derechos de alguien;</li>
                    <li>intentar acceder sin autorización al Sitio, a nuestros sistemas o a datos de otros usuarios, ni interferir con su seguridad o funcionamiento;</li>
                    <li>extraer (scraping), copiar o revender el contenido del Sitio, ni usar bots o medios automatizados para enviar formularios o sobrecargar el Sitio;</li>
                    <li>enviar información falsa, engañosa o de terceros sin permiso, ni código malicioso;</li>
                    <li>usar el asistente de IA para obtener o compartir información sensible, para acosar, o para intentar manipularlo hacia un comportamiento inseguro.</li>
                </UL>
                <P>
                    Podemos suspender o bloquear el acceso que razonablemente creamos que viola estos Términos. El contenido del Sitio, incluidos los artículos del blog,
                    es solo información general y no es asesoría legal, financiera, fiscal, médica ni de otro tipo profesional.
                </P>
            </>
        ),
    },
    {
        id: 'servicios',
        title: 'Nuestros Servicios y proyectos',
        body: (
            <>
                <P>
                    Ofrecemos automatización con IA, agentes y chatbots de IA, automatización de procesos y tareas administrativas, marketing digital y optimización para
                    motores de respuesta (AEO), diseño y desarrollo web, creación de contenido y la plataforma Next Horizon. El alcance, los entregables, los plazos, los
                    precios y los criterios de aceptación de cada proyecto se establecen en una Propuesta.
                </P>
                <UL>
                    <li><strong>Auditoría gratis.</strong> La llamada inicial y la auditoría que ofrecemos en nuestras landing pages son gratis y no te obligan a comprar nada. Antes de la llamada revisamos la presencia pública en línea de tu negocio y después te compartimos lo que encontramos.</li>
                    <li>Los Servicios se prestan según los hallazgos de la auditoría estratégica inicial y el alcance acordado en la Propuesta. El trabajo fuera de ese alcance es una solicitud de cambio que cotizaremos por separado.</li>
                    <li>Los plazos de implementación son estimados. Dependen de la complejidad de tu negocio y de que nos des a tiempo los datos, accesos y aprobaciones.</li>
                    <li>Podemos usar subcontratistas y herramientas de terceros para prestar los Servicios, y seguimos siendo responsables de su trabajo en nuestro proyecto.</li>
                    <li>Las reuniones se hacen por videollamada, salvo que acordemos otra cosa.</li>
                </UL>
                <P>Pedir que te contactemos por un formulario no es una oferta de compra ni de venta; no existe un proyecto hasta que tú y Xtek AI acepten una Propuesta.</P>
            </>
        ),
    },
    {
        id: 'pagos',
        title: 'Precios, facturas y pagos',
        body: (
            <>
                <P>
                    Los precios, el calendario de facturación y los gastos se indican en la Propuesta. Salvo que diga otra cosa: los precios son en dólares
                    estadounidenses y no incluyen impuestos (que pagas tú, excepto los impuestos sobre nuestros ingresos); las facturas vencen a los 15 días de su fecha; y
                    lo ya pagado no es reembolsable, salvo que lo acordemos por escrito o la ley lo exija. Si una factura está vencida, podemos pausar los Servicios hasta
                    que se pague y cobrar intereses de 1.5% mensual o la tasa máxima que permita la ley, lo que sea menor.
                </P>
                <P>Las suscripciones o cargos por uso de terceros (por ejemplo, costos de modelos de IA, teléfono, alojamiento o publicidad) se te cobran al costo, salvo que la Propuesta los incluya.</P>
            </>
        ),
    },
    {
        id: 'tus-responsabilidades',
        title: 'Tus responsabilidades y tus datos',
        body: (
            <>
                <UL>
                    <li>Darnos información correcta y, a tiempo, los accesos, decisiones y comentarios que razonablemente necesitemos.</li>
                    <li>Asegurarte de tener los derechos y, cuando haga falta, los consentimientos y avisos necesarios para darnos los datos, cuentas y contenido que nos proporcionas, y para que los tratemos por ti.</li>
                    <li>Revisar nuestros entregables y los resultados de la IA antes de usarlos o publicarlos, y guardar tus propias copias de seguridad.</li>
                    <li>Cumplir los términos de las plataformas de terceros con las que nos pidas trabajar (por ejemplo, plataformas de publicidad y redes sociales).</li>
                </UL>
                <P>
                    <strong>Información personal.</strong> Cuando tratamos información personal en tu nombre, actuamos como tu proveedor de servicios según las leyes de
                    privacidad aplicables de EE. UU. La trataremos solo para prestar los Servicios y según tus instrucciones, y firmaremos un anexo de tratamiento de datos
                    si lo pides. Nuestro propio uso de la información personal se describe en nuestra <A href={LEGAL_PATHS.es.privacy}>Política de Privacidad</A>.
                </P>
            </>
        ),
    },
    {
        id: 'propiedad-intelectual',
        title: 'Propiedad intelectual',
        body: (
            <>
                <UL>
                    <li><strong>Tus materiales.</strong> Sigues siendo dueño de los datos, contenido, logos y materiales que nos das (&ldquo;Materiales del Cliente&rdquo;) y nos das una licencia limitada para usarlos solo para prestar los Servicios.</li>
                    <li><strong>Nuestros materiales.</strong> Salvo que la Propuesta diga otra cosa, Xtek AI conserva la propiedad de los agentes de automatización, flujos de trabajo, código, prompts, plantillas, métodos y conocimientos que creamos o que ya teníamos, incluido todo lo reutilizable entre clientes.</li>
                    <li><strong>Licencia para ti.</strong> Una vez que pagues un entregable, recibes una licencia no exclusiva e intransferible para usarlo en las operaciones internas de tu negocio, salvo que la Propuesta te ceda la propiedad (por ejemplo, el diseño y los textos de una página web a la medida).</li>
                    <li><strong>Contenido del Sitio.</strong> El Sitio, sus textos, diseño, gráficos y el nombre y logo de Xtek AI son nuestros o de quienes nos dan licencia. Puedes ver y compartir páginas para uso personal o interno de tu negocio, pero no copiarlas ni reutilizarlas comercialmente sin permiso por escrito. Los nombres y logos de terceros pertenecen a sus dueños.</li>
                    <li><strong>Sugerencias.</strong> Si nos envías sugerencias, podemos usarlas sin ninguna obligación contigo.</li>
                </UL>
            </>
        ),
    },
    {
        id: 'ia',
        title: 'Resultados generados por IA',
        body: (
            <>
                <P>
                    Nuestros Servicios y el Sitio usan inteligencia artificial, incluidos modelos de terceros. Los resultados de la IA pueden ser inexactos, incompletos,
                    sesgados o parecidos a otros resultados, y pueden no estar protegidos por derechos de autor. Tomamos medidas razonables para revisar los entregables,
                    pero tú eres responsable de verificar los resultados de la IA antes de usarlos para decisiones, trámites, comunicaciones con clientes o actividades
                    reguladas. Los resultados de la IA no son asesoría profesional. Cuando la ley lo exija, informa a las personas que están interactuando con un sistema
                    de IA.
                </P>
            </>
        ),
    },
    {
        id: 'resultados',
        title: 'Resultados, casos de éxito y reseñas',
        body: (
            <>
                <P>
                    Los casos de éxito, estadísticas, testimonios y reseñas del Sitio (incluidas las reseñas copiadas de nuestro perfil de Google Business) describen las
                    experiencias de clientes específicos. Los resultados dependen de muchos factores, no son típicos ni están garantizados, y los resultados pasados no
                    garantizan resultados futuros. No garantizamos ningún nivel de ingresos, posicionamiento, tráfico, conversión, ahorro, ni ubicación en buscadores o en
                    respuestas de IA.
                </P>
            </>
        ),
    },
    {
        id: 'mensajes',
        title: 'Mensajes de texto y correos',
        body: (
            <>
                <P>
                    <strong>Mensajes de servicio (obligatorios).</strong> Para enviar uno de nuestros formularios debes aceptar recibir mensajes de servicio de Xtek AI
                    por texto (SMS) y correo, incluidos mensajes automatizados, limitados a lo que necesitamos para atender tu solicitud y tus citas: respuestas a tu
                    solicitud y seguimientos sobre ella, programación de citas, confirmaciones, recordatorios, y cambios o cancelaciones. Así es como respondemos y
                    administramos las citas.
                </P>
                <P>
                    <strong>Mensajes de marketing (opcionales).</strong> Con casillas separadas y sin marcar, también puedes elegir recibir mensajes de texto y/o correos
                    de marketing (ofertas, promociones, novedades). El consentimiento para marketing es opcional y no es condición para ninguna compra.
                </P>
                <P>
                    Los mensajes de texto se rigen por nuestros <A href={LEGAL_PATHS.es.sms}>Términos de SMS</A>: la frecuencia varía, pueden aplicarse tarifas de
                    mensajes y datos, y puedes responder STOP para dejar de recibir mensajes de texto o HELP para obtener ayuda. Responder STOP termina todos nuestros
                    mensajes de texto, y después te contactaremos por correo o teléfono. Los correos de marketing incluyen un enlace para darte de baja, y atendemos las
                    bajas rápidamente.
                </P>
            </>
        ),
    },
    {
        id: 'terceros',
        title: 'Servicios y enlaces de terceros',
        body: (
            <>
                <P>
                    El Sitio y los Servicios pueden conectarse a productos de terceros o depender de ellos, como Google, Meta, LinkedIn, ElevenLabs y proveedores de
                    alojamiento y de IA. No los controlamos y sus términos se aplican a tu uso de ellos. No somos responsables de su disponibilidad, contenido o cambios,
                    aunque trabajaremos razonablemente contigo para ajustar los Servicios si un cambio los afecta.
                </P>
            </>
        ),
    },
    {
        id: 'confidencialidad',
        title: 'Confidencialidad',
        body: (
            <>
                <P>
                    Cada parte mantendrá confidencial la información no pública del negocio de la otra, la usará solo para el proyecto y la protegerá con cuidado
                    razonable, salvo la información que sea pública, ya conocida, desarrollada de forma independiente, o que deba revelarse por ley. Esta obligación
                    continúa tres años después de terminado el proyecto y, para secretos comerciales e información personal, mientras sigan siendo confidenciales o
                    protegidos.
                </P>
            </>
        ),
    },
    {
        id: 'exenciones',
        title: 'Exención de garantías',
        body: (
            <>
                <P>
                    EL SITIO Y LOS SERVICIOS SE OFRECEN &ldquo;TAL CUAL&rdquo; Y &ldquo;SEGÚN DISPONIBILIDAD&rdquo;. EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, XTEK AI
                    RENUNCIA A TODAS LAS GARANTÍAS, EXPRESAS O IMPLÍCITAS, INCLUIDAS LAS DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR, NO INFRACCIÓN, Y CUALQUIER
                    GARANTÍA DE QUE EL SITIO O LOS SERVICIOS SERÁN ININTERRUMPIDOS, SIN ERRORES O SEGUROS, O DE QUE LOS RESULTADOS DE LA IA SERÁN EXACTOS. Nada en estos
                    Términos limita una garantía que te demos en una Propuesta.
                </P>
            </>
        ),
    },
    {
        id: 'responsabilidad',
        title: 'Limitación de responsabilidad',
        body: (
            <>
                <P>
                    EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, XTEK AI NO SERÁ RESPONSABLE DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES, EJEMPLARES O
                    PUNITIVOS, NI DE LA PÉRDIDA DE GANANCIAS, INGRESOS, DATOS O PRESTIGIO, QUE SURJAN DEL SITIO, LOS SERVICIOS O ESTOS TÉRMINOS O SE RELACIONEN CON
                    ELLOS, AUN SI SE ADVIRTIÓ DE ESA POSIBILIDAD. NUESTRA RESPONSABILIDAD TOTAL POR TODAS LAS RECLAMACIONES RELACIONADAS CON UN PROYECTO NO SUPERARÁ LO QUE
                    NOS PAGASTE POR ESE PROYECTO EN LOS 12 MESES ANTERIORES AL HECHO QUE ORIGINÓ LA RECLAMACIÓN; POR EL USO DEL SITIO GRATUITO, NO SUPERARÁ US$100.
                </P>
                <P>
                    Estos límites no se aplican a la responsabilidad que la ley no permite limitar, como fraude, conducta dolosa o negligencia grave. Algunas
                    jurisdicciones no permiten ciertos límites, así que partes de esta sección pueden no aplicarse a ti.
                </P>
            </>
        ),
    },
    {
        id: 'indemnizacion',
        title: 'Indemnización',
        body: (
            <>
                <P>
                    Si usas los Servicios para un negocio, defenderás e indemnizarás a Xtek AI frente a reclamaciones de terceros, pérdidas y costos razonables
                    (incluidos honorarios de abogados) que surjan de los Materiales del Cliente que nos des, de tu incumplimiento de estos Términos o de la ley, o del uso
                    de entregables o resultados de la IA en violación de la ley o de derechos de terceros. Te avisaremos pronto de la reclamación y cooperaremos
                    razonablemente.
                </P>
            </>
        ),
    },
    {
        id: 'vigencia',
        title: 'Vigencia y terminación',
        body: (
            <>
                <P>
                    Estos Términos se aplican mientras uses el Sitio o haya un proyecto activo. Cualquiera de las partes puede terminar un proyecto según lo indique la
                    Propuesta o, si no dice nada, con 30 días de aviso por escrito; cualquiera puede terminarlo de inmediato por un incumplimiento importante de la otra
                    que no se corrija después de 10 días de aviso. Al terminar, pagarás los Servicios prestados y los costos no cancelables generados hasta la fecha de
                    terminación, y te devolveremos o borraremos los Materiales del Cliente según lo pidas razonablemente, sujeto a obligaciones legales de conservación.
                    Las secciones que por su naturaleza deban seguir vigentes (incluidos pagos, propiedad intelectual, confidencialidad, exenciones, responsabilidad,
                    indemnización y ley aplicable) seguirán vigentes.
                </P>
            </>
        ),
    },
    {
        id: 'ley-aplicable',
        title: 'Ley aplicable y disputas',
        body: (
            <>
                <P>
                    Estos Términos se rigen por las leyes del Estado de {LEGAL.governingState}, sin tomar en cuenta sus normas de conflicto de leyes. Antes de presentar
                    una reclamación, cada parte intentará de buena fe resolver la disputa de manera informal durante al menos 30 días después de un aviso por escrito. Si
                    no se logra, los tribunales estatales y federales ubicados en {LEGAL.governingState} tienen jurisdicción exclusiva, y cada parte acepta someterse a
                    ellos. Nada impide que cualquiera de las partes pida medidas cautelares urgentes para proteger información confidencial o propiedad intelectual. Los
                    consumidores conservan los derechos que les da la ley de su estado y que no se pueden renunciar.
                </P>
            </>
        ),
    },
    {
        id: 'generales',
        title: 'Disposiciones generales',
        body: (
            <>
                <UL>
                    <li><strong>Acuerdo completo.</strong> Estos Términos, la Política de Privacidad, los Términos de SMS y cualquier Propuesta forman el acuerdo completo sobre su tema y reemplazan conversaciones anteriores.</li>
                    <li><strong>Cambios.</strong> Podemos actualizar estos Términos publicando la nueva versión con una nueva fecha; los cambios no afectan una Propuesta firmada salvo que ambas partes lo acuerden. Seguir usando el Sitio después de un cambio significa que lo aceptas.</li>
                    <li><strong>Divisibilidad y renuncia.</strong> Si una disposición no es exigible, el resto sigue vigente; no exigir una disposición no es renunciar a ella.</li>
                    <li><strong>Cesión.</strong> No puedes ceder estos Términos sin nuestro consentimiento por escrito; nosotros podemos cederlos en una fusión o venta del negocio.</li>
                    <li><strong>Fuerza mayor.</strong> Ninguna parte es responsable por retrasos fuera de su control razonable, como caídas de internet, de la nube o de proveedores de IA, desastres naturales o actos de gobierno.</li>
                    <li><strong>Comunicaciones electrónicas.</strong> Aceptas que podamos comunicarnos contigo y darte avisos por medios electrónicos, y que las firmas electrónicas son válidas.</li>
                    <li><strong>Relación.</strong> Somos contratistas independientes; nada crea una sociedad, relación laboral ni de agencia.</li>
                </UL>
            </>
        ),
    },
    {
        id: 'contacto',
        title: 'Contáctanos',
        body: (
            <>
                <P>
                    ¿Preguntas sobre estos Términos? Escribe a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llama al{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. Somos un negocio en línea sin oficina abierta al público, así que contáctanos por medios
                    electrónicos o por teléfono.
                </P>
            </>
        ),
    },
];

export default function TerminosPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('Términos y Condiciones', DESCRIPTION, PATH, LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Inicio', path: '/' },
                        { name: 'Términos y Condiciones', path: PATH },
                    ]),
                ]}
            />
            <LegalDocument
                lang="es"
                title="Términos y Condiciones"
                translation={{ href: LEGAL_PATHS.en.terms, label: 'Read in English' }}
                intro={
                    <>
                        <P>
                            Estos términos explican las reglas para usar el sitio de Xtek AI y lo básico de cómo trabajamos con clientes: cómo empieza un proyecto, cómo nos
                            pagan, de quién es cada cosa, cómo usamos la IA y qué pasa si algo sale mal. Léelos junto con nuestra{' '}
                            <A href={LEGAL_PATHS.es.privacy}>Política de Privacidad</A>.
                        </P>
                        <P>
                            Esta traducción se ofrece para tu comodidad. Si hay alguna diferencia con la <A href={LEGAL_PATHS.en.terms}>versión en inglés</A>, prevalece la
                            versión en inglés.
                        </P>
                    </>
                }
                sections={sections}
                otherPage={{ href: LEGAL_PATHS.es.privacy, label: 'Leer nuestra Política de Privacidad' }}
            />
        </>
    );
}
