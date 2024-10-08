import type { Config } from "tailwindcss";

interface ColorsType {
  [key: string]: string;
}

export const colors: ColorsType = {
  'common': '#161616',
  'common-white': '#fff',
  'slate-50': '#f8fafc',
  'slate-100': '#f1f5f9',
  'slate-200': '#e2e8f0',
  'slate-300': '#cbd5e1',
  'slate-400': '#94a3b8',
  'slate-500': '#64748b',
  'slate-600': '#475569',
  'slate-700': '#334155',
  'slate-800': '#1e293b',
  'slate-900': '#0f172a',
  'slate-950': '#020617',
  'gray-50': '#f9fafb',
  'gray-100': '#f3f4f6',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  'gray-950': '#030712',
  'red-50': '#fff1f2',
  'red-100': '#ffe4e6',
  'red-200': '#fecdd3',
  'red-300': '#fda4af',
  'red-400': '#fb7185',
  'red-500': '#f43f5e',
  'red-600': '#e11d48',
  'red-700': '#be123c',
  'red-800': '#9f1239',
  'red-900': '#881337',
  'red-950': '#4c0519',
  'orange-50': '#fff7ed',
  'orange-100': '#ffedd5',
  'orange-200': '#fed7aa',
  'orange-300': '#fdba74',
  'orange-400': '#fb923c',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
  'orange-700': '#c2410c',
  'orange-800': '#9a3412',
  'orange-900': '#7c2d12',
  'orange-950': '#431407',
  'green-50': '#f0fdf4',
  'green-100': '#dcfce7',
  'green-200': '#bbf7d0',
  'green-300': '#86efac',
  'green-400': '#4ade80',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'green-700': '#15803d',
  'green-800': '#166534',
  'green-900': '#14532d',
  'green-950': '#052e16',
  'teal-50': '#f0fdfa',
  'teal-100': '#ccfbf1',
  'teal-200': '#99f6e4',
  'teal-300': '#5eead4',
  'teal-400': '#2dd4bf',
  'teal-500': '#14b8a6',
  'teal-600': '#0d9488',
  'teal-700': '#0f766e',
  'teal-800': '#115e59',
  'teal-900': '#134e4a',
  'teal-950': '#042f2e',
  'cyan-50': '#ecfeff',
  'cyan-100': '#cffafe',
  'cyan-200': '#a5f3fc',
  'cyan-300': '#67e8f9',
  'cyan-400': '#22d3ee',
  'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2',
  'cyan-700': '#0e7490',
  'cyan-800': '#155e75',
  'cyan-900': '#164e63',
  'cyan-950': '#083344',
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a',
  'blue-950': '#172554',
  'indigo-50': '#eef2ff',
  'indigo-100': '#e0e7ff',
  'indigo-200': '#c7d2fe',
  'indigo-300': '#a5b4fc',
  'indigo-400': '#818cf8',
  'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5',
  'indigo-700': '#4338ca',
  'indigo-800': '#3730a3',
  'indigo-900': '#312e81',
  'indigo-950': '#1e1b4b',
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '600',
      },
      fontFamily: {
        poppins: ['var(--font-pretendard)'],
      },
      fontSize: {
        'xxs': ['0.6875rem', { lineHeight: '1.2' }],  // 11px
        'xs': ['0.75rem', { lineHeight: '1.2' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.2' }],    // 14px
        'base': ['1rem', { lineHeight: '1.2' }],      // 16px
        'md': ['1.125rem', { lineHeight: '1.2' }],    // 18px
        'lg': ['1.25rem', { lineHeight: '1.2' }],     // 20px
        'xl': ['1.375rem', { lineHeight: '1.2' }],    // 22px
        '2xl': ['1.5625rem', { lineHeight: '1.2' }],  // 25px
        '3xl': ['1.75rem', { lineHeight: '1.2' }],    // 28px
        '4xl': ['2rem', { lineHeight: '1.2' }],       // 32px
        '5xl': ['2.25rem', { lineHeight: '1.2' }],    // 36px
        '6xl': ['2.5rem', { lineHeight: '1.2' }],     // 40px
        '7xl': ['2.8125rem', { lineHeight: '1.2' }],  // 45px
        '8xl': ['3.1875rem', { lineHeight: '1.2' }],  // 51px
        '9xl': ['3.625rem', { lineHeight: '1.2' }],   // 58px
      },
      colors: {
        ...colors,
      },
      height: {
        'header-height': '52px',
        'basic-body-with-header': 'calc(100vh - 52px)',
        'basic-menu-body': '100vh',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
        },
        fadeIn: {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" },
        },
      },
      animation: {
        wiggle: 'wiggle 0.15s linear infinite',
        fadeInPage: 'fadeIn 0.8s  forwards',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
