// One page per service (/services/<slug>). Linked from the "Learn more" button on each card of the
// home page's services section. Copy is bilingual; the server renders English (the default language).
//
// Rules for this copy:
// - No prices.
// - No invented figures: savings are described in words, not numbers, until there is real data.
// - The client story is anonymous on purpose (every client gets a package adapted to them).

export type ServiceSlug =
    | 'smartflow-ai-growth-audit'
    | 'executive-ai-admin-automation'
    | 'ai-agents-chatbots'
    | 'digital-marketing-aeo'
    | 'web-design-development'
    | 'content-creation';

export interface ServiceCopy {
    /** Short service name, used in the badge, breadcrumbs and cards. */
    name: string;
    metaTitle: string;
    metaDescription: string;
    /** H1: the search the page should rank for. The last words are highlighted. */
    h1: string;
    h1Highlight: string;
    intro: string;
    savingsTitle: string;
    savings: { title: string; text: string }[];
    includesTitle: string;
    includes: { title: string; text: string }[];
    processTitle: string;
    process: { title: string; text: string }[];
    story: { label: string; title: string; challenge: string; solution: string; result: string };
    faqTitle: string;
    faqs: { q: string; a: string }[];
    ctaTitle: string;
    ctaText: string;
    cta: string;
}

export interface Service {
    slug: ServiceSlug;
    /** Which card of the home page (t.services.s1..s6) this page belongs to. */
    homeIndex: 1 | 2 | 3 | 4 | 5 | 6;
    /** schema.org serviceType. */
    serviceType: string;
    en: ServiceCopy;
    es: ServiceCopy;
}

const STORY_LABEL = { en: 'Client story', es: 'Historia de un cliente' };
const PROCESS_TITLE = { en: 'How we work', es: 'Cómo trabajamos' };
const INCLUDES_TITLE = { en: "What's included", es: 'Qué incluye' };
const SAVINGS_TITLE = { en: 'How it saves you time and money', es: 'Cómo te ahorra tiempo y dinero' };
const FAQ_TITLE = { en: 'Frequently asked questions', es: 'Preguntas frecuentes' };
const CTA = {
    en: { title: 'Every business is different', text: "We adapt each package to what your business needs. Book a free call and we'll tell you where to start.", cta: 'Book a free call' },
    es: { title: 'Cada negocio es distinto', text: 'Adaptamos cada paquete a lo que necesita tu negocio. Agenda una llamada gratuita y te decimos por dónde empezar.', cta: 'Agenda una llamada gratuita' },
};

const common = (lang: 'en' | 'es') => ({
    savingsTitle: SAVINGS_TITLE[lang],
    includesTitle: INCLUDES_TITLE[lang],
    processTitle: PROCESS_TITLE[lang],
    faqTitle: FAQ_TITLE[lang],
    ctaTitle: CTA[lang].title,
    ctaText: CTA[lang].text,
    cta: CTA[lang].cta,
});

export const services: Service[] = [
    {
        slug: 'smartflow-ai-growth-audit',
        homeIndex: 1,
        serviceType: 'Business process and growth audit',
        en: {
            ...common('en'),
            name: 'SmartFlow AI: Growth Audit',
            metaTitle: 'AI Growth Audit for Marketing & Sales | SmartFlow AI | Xtek AI',
            metaDescription: 'SmartFlow AI audits your marketing, sales funnel and customer journey to find where you lose leads and money, then shows what to automate first.',
            h1: 'AI growth audit for your marketing and',
            h1Highlight: 'sales process',
            intro: 'We find where your business loses leads, time and money, from the first ad to the final sale, and tell you exactly what to fix and automate first.',
            savings: [
                { title: 'Stop wasting ad budget', text: 'See which campaigns bring customers and which ones only spend money.' },
                { title: 'Recover lost leads', text: 'Find the steps where interested people drop off before they buy.' },
                { title: 'Know what to automate first', text: 'A clear priority list, so your time and money go where they pay back fastest.' },
            ],
            includes: [
                { title: 'Marketing & ads audit', text: 'We review your campaigns, channels and messages to see what really works.' },
                { title: 'Sales funnel optimization', text: 'We map every step from first contact to sale and remove the friction.' },
                { title: 'Service delivery analysis', text: 'We check how you deliver, so new customers become repeat customers.' },
                { title: 'Customer journey pain points', text: 'We spot the moments where customers get confused, wait or leave.' },
            ],
            process: [
                { title: 'Discovery call', text: 'We learn how your business sells today and what you want to grow.' },
                { title: 'Audit', text: 'We analyze your marketing, funnel, tools and customer journey.' },
                { title: 'Action plan', text: 'You get a prioritized plan: what to fix, what to automate and in which order.' },
                { title: 'Implementation (optional)', text: 'If you want, we build the automations and improvements for you.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A local service business that was losing customers before they booked',
                challenge: 'People asked about prices and availability, but many never booked, and nobody knew where they were getting lost.',
                solution: 'We mapped the whole journey from the first message to the appointment and found the slow steps: unanswered questions and a booking process that required a phone call.',
                result: 'With online booking and automatic answers in place, customers book on their own and the team stopped chasing leads by phone.',
            },
            faqs: [
                { q: 'What do I get at the end of the audit?', a: 'A clear report of where you are losing leads and money, and a prioritized action plan with what to fix and automate first.' },
                { q: 'Do I have to hire you to implement the plan?', a: 'No. The plan is yours. Many clients ask us to implement it, but you can also do it with your own team.' },
                { q: 'Does it work for small businesses?', a: 'Yes. We adapt the audit to the size of your business, from local shops to companies with several teams.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'SmartFlow AI: Auditoría de Crecimiento',
            metaTitle: 'Auditoría de Crecimiento con IA para Marketing y Ventas | SmartFlow AI',
            metaDescription: 'SmartFlow AI audita tu marketing, embudo de ventas y experiencia del cliente para encontrar dónde pierdes clientes y dinero, y qué automatizar primero.',
            h1: 'Auditoría de crecimiento con IA para tu marketing y',
            h1Highlight: 'proceso de ventas',
            intro: 'Encontramos dónde tu negocio pierde clientes, tiempo y dinero, desde el primer anuncio hasta la venta final, y te decimos qué corregir y automatizar primero.',
            savings: [
                { title: 'Deja de gastar en anuncios que no venden', text: 'Ve qué campañas traen clientes y cuáles solo gastan dinero.' },
                { title: 'Recupera clientes perdidos', text: 'Descubre en qué pasos se van las personas interesadas antes de comprar.' },
                { title: 'Sabe qué automatizar primero', text: 'Una lista clara de prioridades, para que tu tiempo y dinero rindan antes.' },
            ],
            includes: [
                { title: 'Auditoría de marketing y publicidad', text: 'Revisamos tus campañas, canales y mensajes para ver qué funciona de verdad.' },
                { title: 'Optimización del embudo de ventas', text: 'Trazamos cada paso del primer contacto a la venta y quitamos las trabas.' },
                { title: 'Análisis de entrega del servicio', text: 'Revisamos cómo entregas, para que los clientes nuevos vuelvan.' },
                { title: 'Puntos críticos del cliente', text: 'Detectamos dónde los clientes se confunden, esperan o se van.' },
            ],
            process: [
                { title: 'Llamada inicial', text: 'Conocemos cómo vende hoy tu negocio y qué quieres hacer crecer.' },
                { title: 'Auditoría', text: 'Analizamos tu marketing, embudo, herramientas y experiencia del cliente.' },
                { title: 'Plan de acción', text: 'Recibes un plan con prioridades: qué corregir, qué automatizar y en qué orden.' },
                { title: 'Implementación (opcional)', text: 'Si quieres, construimos nosotros las automatizaciones y mejoras.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un negocio local de servicios que perdía clientes antes de que agendaran',
                challenge: 'La gente preguntaba precios y disponibilidad, pero muchos nunca agendaban, y nadie sabía en qué paso se perdían.',
                solution: 'Trazamos todo el recorrido, del primer mensaje a la cita, y encontramos los pasos lentos: preguntas sin responder y una reserva que obligaba a llamar.',
                result: 'Con reservas en línea y respuestas automáticas, los clientes agendan solos y el equipo dejó de perseguir clientes por teléfono.',
            },
            faqs: [
                { q: '¿Qué recibo al final de la auditoría?', a: 'Un informe claro de dónde pierdes clientes y dinero, y un plan de acción con prioridades sobre qué corregir y automatizar primero.' },
                { q: '¿Tengo que contratarlos para aplicar el plan?', a: 'No. El plan es tuyo. Muchos clientes nos piden implementarlo, pero también puedes hacerlo con tu propio equipo.' },
                { q: '¿Sirve para negocios pequeños?', a: 'Sí. Adaptamos la auditoría al tamaño de tu negocio, desde comercios locales hasta empresas con varios equipos.' },
            ],
        },
    },
    {
        slug: 'executive-ai-admin-automation',
        homeIndex: 2,
        serviceType: 'Accounting and administrative automation',
        en: {
            ...common('en'),
            name: 'Executive AI: Admin Audit',
            metaTitle: 'AI Accounting & Admin Automation for Small Business | Executive AI',
            metaDescription: 'Executive AI automates invoicing, collections, inventory, paperwork and financial reports with AI, so your team stops doing admin work by hand.',
            h1: 'AI accounting and admin automation for',
            h1Highlight: 'your business',
            intro: 'Invoicing, collections, inventory, paperwork and reports on autopilot, so your team stops doing repetitive admin work by hand.',
            savings: [
                { title: 'Hours of admin work back', text: 'Invoices, reminders and reports go out on their own instead of being typed by hand.' },
                { title: 'Get paid on time', text: 'Automatic payment reminders mean fewer forgotten or late invoices.' },
                { title: 'Fewer costly mistakes', text: 'Less manual data entry means fewer errors in invoices, stock and numbers.' },
            ],
            includes: [
                { title: 'Automated invoicing & collections', text: 'Invoices and payment reminders sent automatically.' },
                { title: 'Inventory & supply control', text: 'Stock alerts and reorders before you run out.' },
                { title: 'Document workflow automation', text: 'Forms, approvals and files that move without paperwork.' },
                { title: 'AI financial reports', text: 'Your key numbers, summarized clearly and on time.' },
            ],
            process: [
                { title: 'Admin audit', text: 'We review how invoicing, inventory and paperwork work today.' },
                { title: 'Automation plan', text: 'We choose the tasks that free up the most time first.' },
                { title: 'Setup & integration', text: 'We connect the tools you already use and automate the work.' },
                { title: 'Support & improvements', text: 'We train your team and keep improving the system.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A small business buried in invoices and follow-ups',
                challenge: 'The owner spent evenings typing invoices, chasing payments and checking stock by hand.',
                solution: 'We automated invoices and payment reminders and set up simple alerts and reports for stock and sales.',
                result: 'Admin work now runs in the background, payments arrive with less chasing, and the owner checks the numbers in minutes.',
            },
            faqs: [
                { q: 'Does it work with my current accounting software?', a: 'In most cases, yes. We connect the tools you already use instead of making you change everything.' },
                { q: 'Is my financial data safe?', a: 'We work with secure, well-known platforms and only give each tool the access it needs.' },
                { q: 'Will my team need training?', a: 'We train your team step by step, and the automations are designed to be simple to use.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'Executive AI: Auditoría Administrativa',
            metaTitle: 'Automatización Contable y Administrativa con IA para Negocios | Executive AI',
            metaDescription: 'Executive AI automatiza facturación, cobros, inventario, papeleo y reportes financieros con IA, para que tu equipo deje de hacer trabajo administrativo a mano.',
            h1: 'Automatización contable y administrativa con IA para',
            h1Highlight: 'tu negocio',
            intro: 'Facturación, cobros, inventario, papeleo y reportes en piloto automático, para que tu equipo deje de hacer trabajo administrativo repetitivo a mano.',
            savings: [
                { title: 'Recupera horas de trabajo administrativo', text: 'Facturas, recordatorios y reportes salen solos en lugar de escribirse a mano.' },
                { title: 'Cobra a tiempo', text: 'Los recordatorios automáticos reducen las facturas olvidadas o atrasadas.' },
                { title: 'Menos errores costosos', text: 'Menos datos escritos a mano significa menos errores en facturas, inventario y números.' },
            ],
            includes: [
                { title: 'Facturación y cobros automatizados', text: 'Facturas y recordatorios de pago enviados automáticamente.' },
                { title: 'Control de inventarios y suministros', text: 'Alertas de stock y pedidos antes de que se acabe.' },
                { title: 'Automatización de documentos', text: 'Formularios, aprobaciones y archivos que avanzan sin papeleo.' },
                { title: 'Reportes financieros con IA', text: 'Tus números clave, resumidos con claridad y a tiempo.' },
            ],
            process: [
                { title: 'Auditoría administrativa', text: 'Revisamos cómo funcionan hoy la facturación, el inventario y el papeleo.' },
                { title: 'Plan de automatización', text: 'Elegimos primero las tareas que más tiempo liberan.' },
                { title: 'Configuración e integración', text: 'Conectamos las herramientas que ya usas y automatizamos el trabajo.' },
                { title: 'Soporte y mejoras', text: 'Capacitamos a tu equipo y seguimos mejorando el sistema.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un pequeño negocio enterrado en facturas y seguimientos',
                challenge: 'El dueño pasaba las noches escribiendo facturas, persiguiendo pagos y revisando el inventario a mano.',
                solution: 'Automatizamos las facturas y los recordatorios de pago, y montamos alertas y reportes sencillos de inventario y ventas.',
                result: 'El trabajo administrativo ahora corre en segundo plano, los pagos llegan con menos seguimiento y el dueño revisa sus números en minutos.',
            },
            faqs: [
                { q: '¿Funciona con mi software contable actual?', a: 'En la mayoría de los casos, sí. Conectamos las herramientas que ya usas en lugar de obligarte a cambiarlo todo.' },
                { q: '¿Mis datos financieros están seguros?', a: 'Trabajamos con plataformas seguras y reconocidas, y cada herramienta solo recibe el acceso que necesita.' },
                { q: '¿Mi equipo necesitará capacitación?', a: 'Capacitamos a tu equipo paso a paso, y las automatizaciones están pensadas para ser fáciles de usar.' },
            ],
        },
    },
    {
        slug: 'ai-agents-chatbots',
        homeIndex: 3,
        serviceType: 'AI chatbots and voice agents',
        en: {
            ...common('en'),
            name: 'AI Agents & Chatbots',
            metaTitle: 'AI Chatbots & Voice Agents for Business, 24/7 | Xtek AI',
            metaDescription: 'Custom AI chatbots and voice agents that answer customers 24/7, book appointments and learn your business, on your website, social media and phone.',
            h1: 'AI chatbots and voice agents that answer',
            h1Highlight: 'your customers 24/7',
            intro: 'Custom AI agents, by text and by voice, that learn how your business works and answer customers, book appointments and solve questions at any hour.',
            savings: [
                { title: 'Never miss a customer again', text: 'Questions get answered at night, on weekends and while your team is busy.' },
                { title: 'Less time on repeated questions', text: 'The agent handles hours, prices, availability and FAQs for you.' },
                { title: 'More bookings without more staff', text: 'Customers book on their own while they are still interested.' },
            ],
            includes: [
                { title: 'Custom conversational chatbots', text: 'Trained on your services, policies and tone of voice.' },
                { title: 'Automated voice agents', text: 'A voice that answers calls and questions on your website.' },
                { title: '24/7 support with memory', text: 'Agents that remember context and pick up where the customer left off.' },
                { title: 'Full database integration', text: 'Connected to your calendar, CRM and business data.' },
            ],
            process: [
                { title: 'Discovery', text: 'We learn your services and the questions customers ask most.' },
                { title: 'Training', text: 'We teach the agent your business, tone and rules.' },
                { title: 'Launch', text: 'We put it on your website, social media or phone line.' },
                { title: 'Tuning', text: 'We review real conversations and keep improving the answers.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A local studio answering the same questions all day',
                challenge: 'Customers asked the same questions by message and on social media, and every reply took the team away from their clients.',
                solution: 'We added an AI agent that answers frequent questions by text and by voice, on the website and on social media.',
                result: 'Customers get instant answers at any hour, and the team focuses on the people in front of them.',
            },
            faqs: [
                { q: 'Will the agent sound like a robot?', a: 'No. We train it with your tone of voice and your real answers so it sounds natural and on-brand.' },
                { q: 'Where can the agent work?', a: 'On your website, social media, messaging apps and phone line, depending on what you need.' },
                { q: 'What happens if it does not know an answer?', a: 'It hands the conversation to your team, so customers are never left without a reply.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'Agentes y Chatbots IA',
            metaTitle: 'Chatbots y Agentes de Voz con IA para Negocios, 24/7 | Xtek AI',
            metaDescription: 'Chatbots y agentes de voz con IA a medida que atienden a tus clientes 24/7, agendan citas y aprenden tu negocio, en tu web, redes sociales y teléfono.',
            h1: 'Chatbots y agentes de voz con IA que atienden',
            h1Highlight: 'a tus clientes 24/7',
            intro: 'Agentes de IA a medida, por texto y por voz, que aprenden cómo funciona tu negocio y responden clientes, agendan citas y resuelven dudas a cualquier hora.',
            savings: [
                { title: 'No vuelvas a perder un cliente', text: 'Las preguntas se responden de noche, en fin de semana y mientras tu equipo está ocupado.' },
                { title: 'Menos tiempo en preguntas repetidas', text: 'El agente responde horarios, precios, disponibilidad y preguntas frecuentes por ti.' },
                { title: 'Más citas sin más personal', text: 'Los clientes agendan solos mientras todavía están interesados.' },
            ],
            includes: [
                { title: 'Chatbots conversacionales a medida', text: 'Entrenados con tus servicios, políticas y tono de voz.' },
                { title: 'Agentes de voz automatizados', text: 'Una voz que atiende llamadas y preguntas en tu web.' },
                { title: 'Soporte 24/7 con memoria', text: 'Agentes que recuerdan el contexto y retoman donde quedó el cliente.' },
                { title: 'Integración con tus datos', text: 'Conectados a tu calendario, CRM y datos del negocio.' },
            ],
            process: [
                { title: 'Descubrimiento', text: 'Conocemos tus servicios y las preguntas que más hacen los clientes.' },
                { title: 'Entrenamiento', text: 'Le enseñamos al agente tu negocio, tu tono y tus reglas.' },
                { title: 'Lanzamiento', text: 'Lo ponemos en tu web, redes sociales o línea telefónica.' },
                { title: 'Ajustes', text: 'Revisamos conversaciones reales y seguimos mejorando las respuestas.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un estudio local respondiendo las mismas preguntas todo el día',
                challenge: 'Los clientes hacían las mismas preguntas por mensaje y en redes sociales, y cada respuesta alejaba al equipo de sus clientes.',
                solution: 'Añadimos un agente de IA que responde las preguntas frecuentes por texto y por voz, en la web y en redes sociales.',
                result: 'Los clientes reciben respuesta al instante a cualquier hora, y el equipo se enfoca en las personas que tiene delante.',
            },
            faqs: [
                { q: '¿El agente va a sonar como un robot?', a: 'No. Lo entrenamos con tu tono de voz y tus respuestas reales para que suene natural y propio de tu marca.' },
                { q: '¿Dónde puede funcionar el agente?', a: 'En tu web, redes sociales, apps de mensajería y línea telefónica, según lo que necesites.' },
                { q: '¿Qué pasa si no sabe una respuesta?', a: 'Pasa la conversación a tu equipo, así ningún cliente se queda sin respuesta.' },
            ],
        },
    },
    {
        slug: 'digital-marketing-aeo',
        homeIndex: 4,
        serviceType: 'Digital marketing, SEO and answer engine optimization',
        en: {
            ...common('en'),
            name: 'Digital Marketing & AEO',
            metaTitle: 'Digital Marketing, SEO & AEO Agency | Xtek AI',
            metaDescription: 'SEO, AEO and data-driven ads so your business shows up on Google and in AI answers like ChatGPT, Gemini and Perplexity, and turns searches into customers.',
            h1: 'Digital marketing, SEO and AEO to appear on Google and in',
            h1Highlight: 'AI answers',
            intro: 'We make your business show up where customers search today: on Google and in AI assistants like ChatGPT, Gemini and Perplexity, with ads that are measured, not guessed.',
            savings: [
                { title: 'Customers that find you on their own', text: 'Good rankings bring visits every day without paying for each click.' },
                { title: 'Ad budget that is measured', text: 'Campaigns are tracked, so money moves to what brings customers.' },
                { title: 'Ahead of your competitors', text: 'Be the business AI assistants recommend while others are still invisible there.' },
            ],
            includes: [
                { title: 'Traditional SEO strategy', text: 'Keywords, content and technical fixes to rank on Google.' },
                { title: 'AEO: AI answer optimization', text: 'Content structured so AI assistants can cite and recommend you.' },
                { title: 'Data-driven ad campaigns', text: 'Google and social media ads tracked from click to customer.' },
                { title: 'Smart brand positioning', text: 'A clear, consistent message across every channel.' },
            ],
            process: [
                { title: 'Audit', text: 'We check where you appear today on Google and in AI answers.' },
                { title: 'Strategy', text: 'We pick the searches and channels that bring the right customers.' },
                { title: 'Execution', text: 'We optimize your site, create content and launch campaigns.' },
                { title: 'Monthly reporting', text: 'You see what is working and we keep adjusting.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A beauty business that wanted to be found online',
                challenge: 'The business depended on word of mouth and its social media did not bring new customers in a steady way.',
                solution: 'We organized its online presence, automated its social media and structured its information so search engines and AI could understand it.',
                result: 'The business shows a consistent presence online and new customers can find it and get answers at any hour.',
            },
            faqs: [
                { q: 'What is AEO?', a: 'Answer Engine Optimization: preparing your content so AI assistants like ChatGPT, Gemini and Perplexity understand your business and recommend it in their answers.' },
                { q: 'How long does SEO take to show results?', a: 'SEO builds over months, not days. Ads can bring visits sooner, so we usually combine both.' },
                { q: 'Do you manage the ads for me?', a: 'Yes. We set up, track and adjust the campaigns, and show you the results clearly.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'Marketing Digital & AEO',
            metaTitle: 'Agencia de Marketing Digital, SEO y AEO (Optimización para IA) | Xtek AI',
            metaDescription: 'SEO, AEO y anuncios basados en datos para que tu negocio aparezca en Google y en respuestas de IA como ChatGPT, Gemini y Perplexity, y convierta búsquedas en clientes.',
            h1: 'Marketing digital, SEO y AEO para aparecer en Google y en',
            h1Highlight: 'respuestas de IA',
            intro: 'Hacemos que tu negocio aparezca donde hoy buscan los clientes: en Google y en asistentes de IA como ChatGPT, Gemini y Perplexity, con anuncios medidos, no adivinados.',
            savings: [
                { title: 'Clientes que te encuentran solos', text: 'Un buen posicionamiento trae visitas cada día sin pagar por cada clic.' },
                { title: 'Presupuesto de anuncios medido', text: 'Las campañas se miden, así el dinero va a lo que trae clientes.' },
                { title: 'Adelántate a tu competencia', text: 'Sé el negocio que recomiendan los asistentes de IA mientras otros siguen invisibles ahí.' },
            ],
            includes: [
                { title: 'Estrategia de SEO tradicional', text: 'Palabras clave, contenido y ajustes técnicos para posicionar en Google.' },
                { title: 'AEO: optimización para respuestas de IA', text: 'Contenido estructurado para que los asistentes de IA te citen y recomienden.' },
                { title: 'Campañas de anuncios basadas en datos', text: 'Anuncios en Google y redes medidos desde el clic hasta el cliente.' },
                { title: 'Posicionamiento inteligente de marca', text: 'Un mensaje claro y coherente en todos los canales.' },
            ],
            process: [
                { title: 'Auditoría', text: 'Revisamos dónde apareces hoy en Google y en las respuestas de IA.' },
                { title: 'Estrategia', text: 'Elegimos las búsquedas y canales que traen a los clientes correctos.' },
                { title: 'Ejecución', text: 'Optimizamos tu web, creamos contenido y lanzamos campañas.' },
                { title: 'Reporte mensual', text: 'Ves qué funciona y seguimos ajustando.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un negocio de belleza que quería que lo encontraran en internet',
                challenge: 'El negocio dependía del boca a boca y sus redes sociales no traían clientes nuevos de forma constante.',
                solution: 'Ordenamos su presencia en internet, automatizamos sus redes sociales y estructuramos su información para que buscadores e IA la entendieran.',
                result: 'El negocio tiene una presencia constante en internet y los clientes nuevos lo encuentran y reciben respuesta a cualquier hora.',
            },
            faqs: [
                { q: '¿Qué es el AEO?', a: 'Answer Engine Optimization: preparar tu contenido para que asistentes de IA como ChatGPT, Gemini y Perplexity entiendan tu negocio y lo recomienden en sus respuestas.' },
                { q: '¿Cuánto tarda el SEO en dar resultados?', a: 'El SEO se construye en meses, no en días. Los anuncios pueden traer visitas antes, por eso solemos combinar ambos.' },
                { q: '¿Ustedes manejan los anuncios por mí?', a: 'Sí. Configuramos, medimos y ajustamos las campañas, y te mostramos los resultados con claridad.' },
            ],
        },
    },
    {
        slug: 'web-design-development',
        homeIndex: 5,
        serviceType: 'Web design and development',
        en: {
            ...common('en'),
            name: 'Web Design & Development',
            metaTitle: 'Web Design & Development for Small Business | Xtek AI',
            metaDescription: 'Fast, mobile-first websites designed to turn visitors into customers, built with SEO, online booking, AI agents and loyalty tools ready to plug in.',
            h1: 'Web design and development that turns visitors into',
            h1Highlight: 'customers',
            intro: 'Fast, modern websites that look great on any phone, rank on Google and work for your business: booking, contact forms, AI agents and loyalty tools included when you need them.',
            savings: [
                { title: 'A site that sells while you work', text: 'Customers find information, book or contact you without calling.' },
                { title: 'Fewer tools to pay for', text: 'Booking, forms and AI agents live in one place, your website.' },
                { title: 'Built to rank', text: 'Technical SEO from day one, so you do not have to rebuild later.' },
            ],
            includes: [
                { title: 'Premium UI/UX design', text: 'A clear, professional design made for your brand and customers.' },
                { title: 'Modern development', text: 'Fast sites built with modern React technology.' },
                { title: 'Speed optimization', text: 'Pages that load fast, especially on phones.' },
                { title: 'Technical SEO & structure', text: 'Clean structure, metadata and schema so Google understands you.' },
            ],
            process: [
                { title: 'Brief', text: 'We learn your business, customers and goals for the site.' },
                { title: 'Design', text: 'You review the design before we write a line of code.' },
                { title: 'Development', text: 'We build the site and connect booking, forms or AI agents.' },
                { title: 'Launch & support', text: 'We publish, measure and keep improving it with you.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A local food business that wanted repeat customers',
                challenge: 'The business needed a professional online presence and a way to turn first-time visitors into regulars.',
                solution: 'We built a complete website and connected a digital loyalty program that customers save in Apple Wallet or Google Wallet.',
                result: 'Regular customers get rewarded, and the business now has a real loyalty program working from its own site.',
            },
            faqs: [
                { q: 'Will my website work well on phones?', a: 'Yes. We design mobile-first, because most of your customers will visit from their phone.' },
                { q: 'Can I update the content myself?', a: 'Yes. We can set up the site so you can change texts and photos, or we can handle updates for you.' },
                { q: 'Can you add booking or an AI agent to my site?', a: 'Yes. Online booking, contact forms, AI chat and voice agents can be built into the same site.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'Diseño y Desarrollo Web',
            metaTitle: 'Diseño y Desarrollo Web para Negocios | Sitios Rápidos y Listos para SEO | Xtek AI',
            metaDescription: 'Sitios web rápidos y pensados para el celular, diseñados para convertir visitas en clientes, con SEO, reservas en línea, agentes de IA y fidelización listos para usar.',
            h1: 'Diseño y desarrollo web que convierte visitas en',
            h1Highlight: 'clientes',
            intro: 'Sitios web rápidos y modernos que se ven bien en cualquier celular, posicionan en Google y trabajan para tu negocio: reservas, formularios, agentes de IA y fidelización cuando los necesites.',
            savings: [
                { title: 'Una web que vende mientras trabajas', text: 'Los clientes encuentran información, reservan o te contactan sin llamar.' },
                { title: 'Menos herramientas que pagar', text: 'Reservas, formularios y agentes de IA viven en un solo lugar: tu web.' },
                { title: 'Hecha para posicionar', text: 'SEO técnico desde el primer día, para no tener que rehacerla después.' },
            ],
            includes: [
                { title: 'Diseño UI/UX premium', text: 'Un diseño claro y profesional hecho para tu marca y tus clientes.' },
                { title: 'Desarrollo moderno', text: 'Sitios rápidos hechos con tecnología React moderna.' },
                { title: 'Optimización de velocidad', text: 'Páginas que cargan rápido, sobre todo en el celular.' },
                { title: 'SEO técnico y estructura web', text: 'Estructura limpia, metadatos y schema para que Google te entienda.' },
            ],
            process: [
                { title: 'Brief', text: 'Conocemos tu negocio, tus clientes y los objetivos de la web.' },
                { title: 'Diseño', text: 'Revisas el diseño antes de que escribamos una línea de código.' },
                { title: 'Desarrollo', text: 'Construimos la web y conectamos reservas, formularios o agentes de IA.' },
                { title: 'Lanzamiento y soporte', text: 'Publicamos, medimos y la seguimos mejorando contigo.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un negocio local de comida que quería clientes frecuentes',
                challenge: 'El negocio necesitaba una presencia profesional en internet y una forma de convertir visitas nuevas en clientes frecuentes.',
                solution: 'Creamos una web completa y conectamos un programa de fidelidad digital que los clientes guardan en Apple Wallet o Google Wallet.',
                result: 'Los clientes frecuentes reciben recompensas y el negocio tiene un programa de fidelidad real funcionando desde su propia web.',
            },
            faqs: [
                { q: '¿Mi web funcionará bien en celulares?', a: 'Sí. Diseñamos pensando primero en el celular, porque la mayoría de tus clientes entrará desde ahí.' },
                { q: '¿Puedo actualizar el contenido yo mismo?', a: 'Sí. Podemos preparar la web para que cambies textos y fotos, o nos encargamos nosotros de las actualizaciones.' },
                { q: '¿Pueden añadir reservas o un agente de IA a mi web?', a: 'Sí. Reservas en línea, formularios, chat con IA y agentes de voz pueden ir dentro de la misma web.' },
            ],
        },
    },
    {
        slug: 'content-creation',
        homeIndex: 6,
        serviceType: 'Content creation and social media management',
        en: {
            ...common('en'),
            name: 'Content Creation',
            metaTitle: 'Content Creation & Social Media Management for Business | Xtek AI',
            metaDescription: 'Persuasive copywriting, premium visuals and social media management, with AI helping you publish consistent content that connects with your ideal customers.',
            h1: 'Content creation and social media management that',
            h1Highlight: 'connects with your customers',
            intro: 'Copy, visuals and social media handled for you, with AI helping you publish consistent, on-brand content without spending your week on it.',
            savings: [
                { title: 'Your week back', text: 'No more last-minute posts or writing captions late at night.' },
                { title: 'Consistent without hiring a team', text: 'A steady flow of content without paying for a full in-house team.' },
                { title: 'Content that sells', text: 'Every piece is written to move people to contact you or buy.' },
            ],
            includes: [
                { title: 'Persuasive copywriting', text: 'Texts for social media, web and ads that lead to action.' },
                { title: 'Premium visual production', text: 'Graphics, photos and short videos aligned with your brand.' },
                { title: 'Strategic social media management', text: 'A calendar, publishing and replies handled for you.' },
                { title: 'Content personalization at scale', text: 'AI helps adapt each message to each audience and channel.' },
            ],
            process: [
                { title: 'Brand & audience', text: 'We define your voice, your ideal customer and your goals.' },
                { title: 'Content calendar', text: 'We plan topics and formats for each channel.' },
                { title: 'Production & publishing', text: 'We create, schedule and publish the content.' },
                { title: 'Review', text: 'We look at what performs and adjust the plan.' },
            ],
            story: {
                label: STORY_LABEL.en,
                title: 'A salon whose social media took time away from clients',
                challenge: 'Messages and posts on social media took hours that the team needed for clients in the salon.',
                solution: 'We automated its social media and added an AI agent that answers customer questions on its own.',
                result: 'The salon stays active online, customers get quick replies, and the team focuses on the people in the salon.',
            },
            faqs: [
                { q: 'Do I have to approve every post?', a: 'You decide. Many clients approve a monthly calendar; others prefer to review each post.' },
                { q: 'Which social networks do you manage?', a: 'We work with the networks where your customers are, such as Instagram, Facebook, TikTok and Google Business Profile.' },
                { q: 'Is the content written by AI?', a: 'AI helps us move faster, but people plan, review and adapt every piece to your brand.' },
            ],
        },
        es: {
            ...common('es'),
            name: 'Creación de Contenido',
            metaTitle: 'Creación de Contenido y Manejo de Redes Sociales para Negocios | Xtek AI',
            metaDescription: 'Copywriting persuasivo, producción visual y manejo de redes sociales, con IA para publicar contenido constante que conecta con tus clientes ideales.',
            h1: 'Creación de contenido y manejo de redes sociales que',
            h1Highlight: 'conecta con tus clientes',
            intro: 'Textos, visuales y redes sociales hechos por nosotros, con IA que ayuda a publicar contenido constante y fiel a tu marca sin gastar tu semana en ello.',
            savings: [
                { title: 'Recupera tu semana', text: 'Se acabaron las publicaciones de último minuto y escribir textos de madrugada.' },
                { title: 'Constancia sin contratar un equipo', text: 'Un flujo constante de contenido sin pagar un equipo interno completo.' },
                { title: 'Contenido que vende', text: 'Cada pieza está escrita para que la gente te contacte o compre.' },
            ],
            includes: [
                { title: 'Copywriting persuasivo', text: 'Textos para redes, web y anuncios que llevan a la acción.' },
                { title: 'Producción visual premium', text: 'Gráficos, fotos y videos cortos acordes a tu marca.' },
                { title: 'Manejo estratégico de redes sociales', text: 'Calendario, publicaciones y respuestas, hechos por nosotros.' },
                { title: 'Contenido personalizado a escala', text: 'La IA ayuda a adaptar cada mensaje a cada público y canal.' },
            ],
            process: [
                { title: 'Marca y público', text: 'Definimos tu voz, tu cliente ideal y tus objetivos.' },
                { title: 'Calendario de contenido', text: 'Planeamos temas y formatos para cada canal.' },
                { title: 'Producción y publicación', text: 'Creamos, programamos y publicamos el contenido.' },
                { title: 'Revisión', text: 'Vemos qué funciona y ajustamos el plan.' },
            ],
            story: {
                label: STORY_LABEL.es,
                title: 'Un salón cuyas redes sociales le quitaban tiempo con sus clientes',
                challenge: 'Los mensajes y publicaciones en redes sociales se llevaban horas que el equipo necesitaba para los clientes del salón.',
                solution: 'Automatizamos sus redes sociales y añadimos un agente de IA que responde solo las preguntas de los clientes.',
                result: 'El salón sigue activo en internet, los clientes reciben respuesta rápida y el equipo se enfoca en las personas del salón.',
            },
            faqs: [
                { q: '¿Tengo que aprobar cada publicación?', a: 'Tú decides. Muchos clientes aprueban un calendario mensual; otros prefieren revisar cada publicación.' },
                { q: '¿Qué redes sociales manejan?', a: 'Trabajamos con las redes donde están tus clientes, como Instagram, Facebook, TikTok y el Perfil de Empresa de Google.' },
                { q: '¿El contenido lo escribe la IA?', a: 'La IA nos ayuda a ir más rápido, pero personas planean, revisan y adaptan cada pieza a tu marca.' },
            ],
        },
    },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceByHomeIndex = (i: number) => services.find((s) => s.homeIndex === i);
