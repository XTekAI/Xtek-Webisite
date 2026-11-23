// Shared form rules, used by every form in the browser and again by /api/lead on the server.

/** Characters allowed while typing a person's name: letters (any language, with accents), spaces, apostrophes, hyphens, periods. */
export const sanitizePersonName = (value: string) => value.replace(/[^\p{L}\p{M} '.-]/gu, '').replace(/\s{2,}/g, ' ').slice(0, 80);

/** A real person's name: 2-80 chars, at least 2 letters, no digits or symbols. */
export function isValidPersonName(value: string): boolean {
    const v = value.trim();
    if (v.length < 2 || v.length > 80) return false;
    if ((v.match(/\p{L}/gu) || []).length < 2) return false;
    return /^[\p{L}\p{M}]+(?:[ '.-]+[\p{L}\p{M}]+)*\.?$/u.test(v);
}

/** Standard email shape with a real domain and a 2+ letter extension (name@company.com). */
export function isValidEmail(value: string): boolean {
    const v = value.trim();
    if (v.length > 160 || v.includes('..')) return false;
    return /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/.test(v);
}

export interface PhoneCountry {
    /** Unique key (several countries share +1). */
    id: string;
    name: string;
    flag: string;
    dial: string;
    /** Allowed national number length (digits after the country code). */
    min: number;
    max: number;
}

// United States first (default). The rest are the countries visitors are most likely to write from.
export const PHONE_COUNTRIES: PhoneCountry[] = [
    { id: 'US', name: 'United States', flag: '🇺🇸', dial: '1', min: 10, max: 10 },
    { id: 'CA', name: 'Canada', flag: '🇨🇦', dial: '1', min: 10, max: 10 },
    { id: 'PR', name: 'Puerto Rico', flag: '🇵🇷', dial: '1', min: 10, max: 10 },
    { id: 'DO', name: 'Dominican Republic', flag: '🇩🇴', dial: '1', min: 10, max: 10 },
    { id: 'MX', name: 'Mexico', flag: '🇲🇽', dial: '52', min: 10, max: 10 },
    { id: 'GT', name: 'Guatemala', flag: '🇬🇹', dial: '502', min: 8, max: 8 },
    { id: 'SV', name: 'El Salvador', flag: '🇸🇻', dial: '503', min: 8, max: 8 },
    { id: 'HN', name: 'Honduras', flag: '🇭🇳', dial: '504', min: 8, max: 8 },
    { id: 'NI', name: 'Nicaragua', flag: '🇳🇮', dial: '505', min: 8, max: 8 },
    { id: 'CR', name: 'Costa Rica', flag: '🇨🇷', dial: '506', min: 8, max: 8 },
    { id: 'PA', name: 'Panama', flag: '🇵🇦', dial: '507', min: 7, max: 8 },
    { id: 'CO', name: 'Colombia', flag: '🇨🇴', dial: '57', min: 10, max: 10 },
    { id: 'VE', name: 'Venezuela', flag: '🇻🇪', dial: '58', min: 10, max: 10 },
    { id: 'EC', name: 'Ecuador', flag: '🇪🇨', dial: '593', min: 9, max: 9 },
    { id: 'PE', name: 'Peru', flag: '🇵🇪', dial: '51', min: 9, max: 9 },
    { id: 'CL', name: 'Chile', flag: '🇨🇱', dial: '56', min: 9, max: 9 },
    { id: 'AR', name: 'Argentina', flag: '🇦🇷', dial: '54', min: 10, max: 11 },
    { id: 'BR', name: 'Brazil', flag: '🇧🇷', dial: '55', min: 10, max: 11 },
    { id: 'ES', name: 'Spain', flag: '🇪🇸', dial: '34', min: 9, max: 9 },
    { id: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '44', min: 10, max: 10 },
];

export const DEFAULT_PHONE_COUNTRY = 'US';

export const getPhoneCountry = (id: string) => PHONE_COUNTRIES.find((c) => c.id === id) ?? PHONE_COUNTRIES[0];

/** Keeps only digits, capped at the country's maximum length. */
export const sanitizePhoneDigits = (value: string, countryId: string) => value.replace(/\D/g, '').slice(0, getPhoneCountry(countryId).max);

/** Valid length for the country; +1 numbers must also follow North American rules (area code and exchange can't start with 0 or 1). */
export function isValidPhone(digits: string, countryId: string): boolean {
    const c = getPhoneCountry(countryId);
    if (!/^\d+$/.test(digits) || digits.length < c.min || digits.length > c.max) return false;
    if (c.dial === '1') return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
    return true;
}

/** International format sent to the CRM, e.g. +12015550123. */
export const toE164 = (digits: string, countryId: string) => `+${getPhoneCountry(countryId).dial}${digits}`;

/** What the visitor sees while typing: (201) 555-0123 for +1 numbers, plain digits elsewhere. */
export function formatPhoneDisplay(digits: string, countryId: string): string {
    if (getPhoneCountry(countryId).dial !== '1') return digits;
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Server-side check for a phone already in international format. */
export const isValidE164 = (value: string) => /^\+\d{8,15}$/.test(value);
