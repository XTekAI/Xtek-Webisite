"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface FormConsentNoteProps {
    /** Newsletter sign-ups get an email-subscription notice instead of the inquiry one. */
    newsletter?: boolean;
    className?: string;
}

/** Short notice shown next to a form's submit button, linking to the legal pages. */
const FormConsentNote: React.FC<FormConsentNoteProps> = ({ newsletter = false, className = 'mt-4 text-xs text-white/55 leading-relaxed text-center' }) => {
    const { lang } = useLanguage();
    const link = 'underline underline-offset-2 hover:text-white';

    if (lang === 'es') {
        return (
            <p className={className}>
                {newsletter
                    ? 'Al suscribirte aceptas recibir correos de Xtek AI y puedes darte de baja en cualquier momento. '
                    : 'Al enviar este formulario aceptas ser contactado por Xtek AI sobre tu consulta por correo o teléfono. '}
                Consulta nuestra <Link href="/privacy" className={link}>Política de Privacidad</Link> y los <Link href="/terms" className={link}>Términos y Condiciones</Link>.
            </p>
        );
    }

    return (
        <p className={className}>
            {newsletter
                ? 'By subscribing you agree to receive emails from Xtek AI. You can unsubscribe at any time. '
                : 'By submitting this form you agree to be contacted by Xtek AI about your inquiry by email or phone. '}
            See our <Link href="/privacy" className={link}>Privacy Policy</Link> and <Link href="/terms" className={link}>Terms and Conditions</Link>.
        </p>
    );
};

export default FormConsentNote;
