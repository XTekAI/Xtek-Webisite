import type { Metadata } from 'next';
import LegalDocument, { A, P, UL, type LegalSection } from '../../../components/LegalDocument';
import JsonLd from '../../../components/JsonLd';
import { LEGAL, LEGAL_PATHS } from '../../../content/legal';
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from '../../../lib/seo';

// Spanish translation of /sms-terms. Keep both versions in step: the English one controls if they differ.
// The keywords (STOP, HELP, START...) stay in English: they are the ones the messaging platform recognizes.

const PATH = LEGAL_PATHS.es.sms;
const TITLE = 'Términos de SMS y política de mensajes | Xtek AI';
const DESCRIPTION =
    'Términos de los mensajes de texto de Xtek AI: cómo das tu consentimiento, tipos y frecuencia de mensajes, tarifas, cómo darte de baja con STOP, cómo pedir ayuda con HELP y cómo protegemos tu información móvil.';

const base = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
export const metadata: Metadata = {
    ...base,
    alternates: { canonical: PATH, languages: { en: LEGAL_PATHS.en.sms, es: PATH } },
    openGraph: { ...base.openGraph, locale: 'es_US' },
};

const sections: LegalSection[] = [
    {
        id: 'programa',
        title: 'Descripción del programa',
        body: (
            <>
                <P>
                    {LEGAL.name} envía mensajes de texto (SMS/MMS) a personas que aceptaron recibirlos (el &ldquo;Programa de Mensajes&rdquo;). Los mensajes los envía
                    Xtek AI, con un sistema automatizado y una plataforma de mensajería de terceros, al número de celular que nos diste en nuestro sitio. Hay dos tipos:
                </P>
                <UL>
                    <li>
                        <strong>Mensajes de servicio</strong> (también por correo): solo lo que necesitamos para atender tu solicitud y tus citas, como respuestas a tu
                        consulta o solicitud de cotización y seguimientos sobre ella; programación de citas, confirmaciones, recordatorios, y cambios o cancelaciones; y
                        novedades sobre servicios y proyectos que tengas con nosotros.
                    </li>
                    <li>
                        <strong>Mensajes de marketing</strong> (opcionales): ofertas, promociones y novedades sobre nuestros servicios de automatización con IA, marketing y
                        web.
                    </li>
                </UL>
                <P>No usamos el Programa de Mensajes para enviar mensajes sobre préstamos, deudas, apuestas, contenido para adultos u otro contenido prohibido, y no enviamos mensajes a números que no dieron su consentimiento.</P>
            </>
        ),
    },
    {
        id: 'consentimiento',
        title: 'Cómo te inscribes y tu consentimiento',
        body: (
            <>
                <P>
                    Te inscribes al marcar las casillas de uno de nuestros formularios (el formulario de contacto de la página principal, el formulario de auditoría gratis
                    de nuestras landing pages en landing.xtekai.com/free-audit y landing.xtekai.com/auditoria-gratis, o el formulario de solicitud de Next Horizon) y
                    enviarlo con tu número de celular. Ninguna casilla viene marcada.
                </P>
                <UL>
                    <li>
                        <strong>Mensajes de servicio: obligatorios para enviar un formulario.</strong> Aceptas recibir mensajes de servicio por texto y correo sobre tu
                        solicitud y tus citas. Son obligatorios porque con ellos te respondemos y administramos tus citas. Puedes dejar de recibir mensajes de texto en
                        cualquier momento respondiendo STOP.
                    </li>
                    <li>
                        <strong>Mensajes de marketing: opcionales.</strong> Los mensajes de texto de marketing y los correos de marketing tienen cada uno su propia casilla.
                        Dejarlas sin marcar no afecta tu solicitud ni tus servicios, y <strong>el consentimiento para marketing no es condición para ninguna compra</strong>.
                    </li>
                    <li>También puedes dar tu consentimiento de palabra o por escrito durante una conversación con nosotros, y lo registraremos.</li>
                    <li>Confirmas que eres el titular o usuario autorizado del número y que tienes al menos 18 años.</li>
                    <li>Podemos enviarte un mensaje que confirme tu inscripción y cómo darte de baja.</li>
                </UL>
                <P>Guardamos un registro de cada consentimiento (el texto que aceptaste, la fecha y hora, la página que usaste y datos técnicos como tu navegador y dirección IP) para poder demostrarlo si se nos pide.</P>
            </>
        ),
    },
    {
        id: 'frecuencia-costos',
        title: 'Frecuencia de mensajes y costos',
        body: (
            <>
                <P>
                    <strong>La frecuencia de los mensajes varía</strong> según tu solicitud o proyecto. Xtek AI no cobra por los mensajes, pero{' '}
                    <strong>pueden aplicarse tarifas de mensajes y datos</strong> según tu plan móvil. Consulta a tu operador para más detalles.
                </P>
            </>
        ),
    },
    {
        id: 'baja',
        title: 'Cómo darte de baja (STOP)',
        body: (
            <>
                <P>
                    Puedes cancelar en cualquier momento respondiendo <strong>STOP</strong> a cualquier mensaje. También puedes responder END, CANCEL, UNSUBSCRIBE o
                    QUIT, o escribirnos a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llamar al <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. Responder
                    STOP termina todos los mensajes de texto de Xtek AI, tanto de servicio como de marketing. Después de tu baja te enviaremos un último mensaje para
                    confirmarla y dejaremos de escribirte, salvo cuando la ley permita responder a algo que tú pediste. Para volver a inscribirte, envía de nuevo el
                    formulario o responde START.
                </P>
            </>
        ),
    },
    {
        id: 'ayuda',
        title: 'Ayuda y soporte (HELP)',
        body: (
            <>
                <P>
                    Responde <strong>HELP</strong> a cualquier mensaje para obtener ayuda, o escríbenos a <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> o llama al{' '}
                    <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>.
                </P>
            </>
        ),
    },
    {
        id: 'operadores',
        title: 'Operadores y entrega',
        body: (
            <>
                <P>
                    El Programa de Mensajes está disponible con los operadores móviles participantes de EE. UU. y para números de EE. UU. Los operadores y Xtek AI no son
                    responsables de mensajes retrasados o no entregados. La entrega depende de tu dispositivo, cobertura y operador, y no podemos garantizarla.
                </P>
            </>
        ),
    },
    {
        id: 'privacidad',
        title: 'Privacidad e información móvil',
        body: (
            <>
                <P>
                    Tratamos tu número de celular y los datos de tus mensajes como se describe en nuestra <A href={LEGAL_PATHS.es.privacy}>Política de Privacidad</A>.
                </P>
                <UL>
                    <li><strong>No se compartirá información móvil con terceros ni afiliados para fines de marketing o promocionales.</strong></li>
                    <li>Los datos de consentimiento (opt-in) de mensajes de texto y el consentimiento mismo no se compartirán con ningún tercero para su propio uso.</li>
                    <li>
                        Sí compartimos información, incluido tu número y tu estado de inscripción o baja, con proveedores de servicios que nos ayudan a entregar los
                        mensajes, como nuestro proveedor de la plataforma de mensajería y los operadores móviles, solo para operar el Programa de Mensajes y con obligaciones
                        de confidencialidad.
                    </li>
                </UL>
            </>
        ),
    },
    {
        id: 'cambio-de-numero',
        title: 'Números cambiados o reasignados',
        body: (
            <>
                <P>
                    Si cambias o dejas tu número de celular, avísanos para dejar de escribir al número anterior. Podemos usar herramientas que revisan si un número fue
                    reasignado, para no escribirle a alguien que no dio su consentimiento.
                </P>
            </>
        ),
    },
    {
        id: 'cambios',
        title: 'Cambios a estos términos',
        body: (
            <>
                <P>
                    Podemos actualizar estos Términos de SMS. La versión más reciente siempre está en esta página con su fecha. Estos términos forman parte de nuestros{' '}
                    <A href={LEGAL_PATHS.es.terms}>Términos y Condiciones</A> y deben leerse junto con ellos; si se contradicen en lo relativo a mensajes de texto,
                    prevalecen estos Términos de SMS.
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
                    Xtek AI · <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A> · <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>. Somos un negocio en línea sin
                    oficina abierta al público, así que contáctanos por medios electrónicos o por teléfono.
                </P>
            </>
        ),
    },
];

export default function TerminosSmsPage() {
    return (
        <>
            <JsonLd
                data={[
                    webPageJsonLd('Términos de SMS y política de mensajes', DESCRIPTION, PATH, LEGAL.lastUpdatedIso),
                    breadcrumbJsonLd([
                        { name: 'Inicio', path: '/' },
                        { name: 'Términos de SMS', path: PATH },
                    ]),
                ]}
            />
            <LegalDocument
                lang="es"
                title="Términos de SMS y política de mensajes"
                translation={{ href: LEGAL_PATHS.en.sms, label: 'Read in English' }}
                intro={
                    <>
                        <P>
                            Estos términos explican el programa de mensajes de texto de Xtek AI: qué mensajes puedes recibir, con qué frecuencia, cuánto cuestan, cómo
                            detenerlos con <strong>STOP</strong> y cómo pedir ayuda con <strong>HELP</strong>. Enviamos dos tipos de mensajes: <strong>mensajes de
                            servicio</strong> sobre tu solicitud y tus citas (los aceptas al enviar un formulario) y <strong>mensajes de marketing</strong> (opcionales, con
                            su propia casilla).
                        </P>
                        <P>
                            <strong>Nombre del programa:</strong> Xtek AI Messaging · <strong>Remitente:</strong> Xtek AI · <strong>Soporte:</strong>{' '}
                            <A href={`mailto:${LEGAL.email}`}>{LEGAL.email}</A>, <A href={LEGAL.phoneHref}>{LEGAL.phoneDisplay}</A>
                        </P>
                        <P>
                            Esta traducción se ofrece para tu comodidad. Si hay alguna diferencia con la <A href={LEGAL_PATHS.en.sms}>versión en inglés</A>, prevalece la
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
