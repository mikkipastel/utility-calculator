
import React from 'react';

export const LogoIcon: React.FC = () => (
    <svg
        className="h-20 w-20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
            </linearGradient>
        </defs>
        <path
            d="M12 2L4 5v6c0 5.55 3.58 10.38 8 11.92 4.42-1.54 8-6.37 8-11.92V5l-8-3z"
            stroke="url(#logo-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect x="8.5" y="8" width="7" height="3" rx="1" stroke="url(#logo-gradient)" strokeWidth="1" />
        <circle cx="9.5" cy="13.5" r="0.75" fill="url(#logo-gradient)" />
        <circle cx="12" cy="13.5" r="0.75" fill="url(#logo-gradient)" />
        <circle cx="14.5" cy="13.5" r="0.75" fill="url(#logo-gradient)" />
        <circle cx="9.5" cy="16" r="0.75" fill="url(#logo-gradient)" />
        <circle cx="12" cy="16" r="0.75" fill="url(#logo-gradient)" />
        <circle cx="14.5" cy="16" r="0.75" fill="url(#logo-gradient)" />
    </svg>
);
