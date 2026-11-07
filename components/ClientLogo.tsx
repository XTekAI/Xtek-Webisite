import React from 'react';

/**
 * A client's official logo, cropped to a circle (all four logos are round or sit on a solid square),
 * on the site's dark gradient. `size` is a Tailwind size class pair such as "w-36 h-36".
 */
const ClientLogo: React.FC<{ logo: string; client: string; size?: string; className?: string }> = ({
  logo,
  client,
  size = 'w-36 h-36',
  className = '',
}) => (
  <img
    src={logo}
    alt={`${client} logo`}
    width={512}
    height={512}
    loading="lazy"
    decoding="async"
    className={`${size} rounded-full object-cover ring-4 ring-white/10 shadow-2xl shadow-black/40 bg-white ${className}`}
  />
);

export default ClientLogo;
