"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MagnetizeButton } from './ui/magnetize-button';
import { homeHref } from '../lib/navigation';
import CtaButton from './CtaButton';

type Product = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: string;
  status_label: string;
  price?: string;
  price_note?: string;
  href?: string;
  cta: string;
};

const ProductCard: React.FC<{ product: Product; onCta: () => void }> = ({ product, onCta }) => {
  const isLive = product.status === 'live';
  return (
    <div className="glass rounded-[32px] p-8 lg:p-10 border border-white/5 hover:border-primary-light/30 transition-all duration-500 flex flex-col">
      <div className="flex items-center justify-between mb-6 gap-4">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            isLive ? 'bg-secondary/20 text-secondary' : 'bg-primary-light/20 text-primary-light'
          }`}
        >
          {product.status_label}
        </span>
      </div>
      <h3 className="text-3xl font-bold mb-2 !text-white">{product.name}</h3>
      <p className="text-primary-light font-bold mb-4">{product.tagline}</p>
      <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
            <svg className="w-5 h-5 text-primary-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      {product.price && (
        <div className="mb-6">
          <p className="text-2xl font-bold !text-white">{product.price}</p>
          {product.price_note && <p className="text-white/50 text-sm">{product.price_note}</p>}
        </div>
      )}
      {product.href ? (
        <div className="self-start">
          <CtaButton href={product.href} arrow={false} className="!py-3">{product.cta}</CtaButton>
        </div>
      ) : (
        <div className="self-start">
          <MagnetizeButton
            onClick={onCta}
            className="px-8 py-3 bg-primary-light text-white font-bold rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary-light/20 border-none h-auto"
          >
            {product.cta}
          </MagnetizeButton>
        </div>
      )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const p = t.products;
  const goToContact = () => router.push(homeHref('contact'));

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-12 group inline-flex"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.blog.back}
        </Link>

        <div className="mb-20 text-center">
          <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">{p.badge}</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">{p.title}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">{p.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {p.items.map((product: Product) => (
            <ProductCard key={product.name} product={product} onCta={goToContact} />
          ))}
        </div>

        <div className="glass rounded-[40px] p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{p.more_title}</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-8">{p.more_desc}</p>
          <MagnetizeButton
            onClick={(e) => {
              e.preventDefault();
              goToContact();
            }}
            className="px-12 py-5 bg-primary-light text-white font-bold rounded-full text-xl hover:bg-secondary hover:scale-105 transition-all shadow-xl shadow-primary-light/20 border-none h-auto"
          >
            {p.more_cta}
          </MagnetizeButton>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
