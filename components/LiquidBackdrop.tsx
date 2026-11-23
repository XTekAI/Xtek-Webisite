import React from 'react';

/** Brand-colored blurred lights placed behind liquid-glass cards. The parent must be `relative isolate`. */
const LiquidBackdrop: React.FC<{ variant?: 'page' | 'section' }> = ({ variant = 'page' }) =>
    variant === 'page' ? (
        <div className="liquid-backdrop" aria-hidden="true">
            <span className="bg-primary-light" style={{ width: 520, height: 520, top: '8%', left: '-10%' }} />
            <span className="bg-secondary" style={{ width: 460, height: 460, top: '30%', right: '-8%' }} />
            <span className="bg-primary-light" style={{ width: 420, height: 420, top: '58%', left: '15%' }} />
            <span className="bg-accent" style={{ width: 300, height: 300, top: '78%', right: '10%', opacity: 0.3 }} />
        </div>
    ) : (
        <div className="liquid-backdrop" aria-hidden="true">
            <span className="bg-primary-light" style={{ width: 420, height: 420, top: '20%', left: '10%' }} />
            <span className="bg-secondary" style={{ width: 380, height: 380, top: '45%', right: '8%' }} />
        </div>
    );

export default LiquidBackdrop;
