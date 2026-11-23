"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PHONE_COUNTRIES, formatPhoneDisplay, getPhoneCountry, sanitizePhoneDigits } from '../lib/formValidation';

/**
 * Phone number with a compact country-code dropdown (+1 US by default). Closed, it shows only "+1 US";
 * open, the native list shows each country's name. The input only accepts digits; the parent keeps the
 * country id and the national digits, and sends toE164(digits, country).
 */
const PhoneField: React.FC<{
    country: string;
    digits: string;
    onCountryChange: (id: string) => void;
    onDigitsChange: (digits: string) => void;
    inputClass: string;
    hasError?: boolean;
    required?: boolean;
    autoFocus?: boolean;
}> = ({ country, digits, onCountryChange, onDigitsChange, inputClass, hasError, required, autoFocus }) => {
    const c = getPhoneCountry(country);
    const border = hasError ? '!border-secondary' : '';
    return (
        <div className="flex gap-2">
            <div className={`${inputClass} ${border} relative !w-[5.75rem] !px-3 shrink-0 flex items-center justify-between gap-1 cursor-pointer`}>
                <span className="text-sm font-semibold whitespace-nowrap">
                    +{c.dial} <span className="text-white/60 font-normal">{c.id}</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60 shrink-0" />
                <select
                    aria-label="Country code"
                    value={country}
                    onChange={(e) => {
                        onCountryChange(e.target.value);
                        onDigitsChange(sanitizePhoneDigits(digits, e.target.value));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                    {PHONE_COUNTRIES.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#00384B] text-white">
                            {p.name} (+{p.dial})
                        </option>
                    ))}
                </select>
            </div>
            <input
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel-national"
                autoFocus={autoFocus}
                required={required}
                value={formatPhoneDisplay(digits, country)}
                onChange={(e) => onDigitsChange(sanitizePhoneDigits(e.target.value, country))}
                placeholder={c.dial === '1' ? '(201) 555-0123' : '0'.repeat(c.min)}
                aria-invalid={hasError || undefined}
                className={`${inputClass} ${border} min-w-0 flex-1`}
            />
        </div>
    );
};

export default PhoneField;
