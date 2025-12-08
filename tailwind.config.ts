import type { Config } from "tailwindcss";

interface ColorsType {
  [key: string]: string;
}

export const colors: ColorsType = {
  'common': '#161616',
  'common-white': '#fff',
  'backdrop': '#1A1A1A66',
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

const getHeightUnit = () => {
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') return 'dvh';

  try {
    const iOSCanInstall = "standalone" in window.navigator;
    const iOSIsInstalled = window.navigator.standalone === true;

    if (window.navigator.standalone) {
      return 'vh';
    }
    if (iOSCanInstall && iOSIsInstalled) {
      return 'vh';
    }
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return 'vh';
    }

    // PWA가 아닌 경우 dvh 사용
    return 'dvh';
  } catch (e) {
    // 오류 발생 시 기본값 사용
    return 'dvh';
  }
};
const generateHeights = () => {
  const heightUnit = getHeightUnit();

  return {
    full: "100%",
    'header-height': '60px',
    'basic-body-with-header': `calc(100${heightUnit} - 52px)`,
    'basic-menu-body': '100dvh',
    "bottom-menu-body-with-header": `calc(100${heightUnit} - 44px - 70px)`,
    "bottom-menu-body": `calc(100${heightUnit} - 70px)`,
    'button-height-sm': '26px',
    'button-height-md': '38px',
    'button-height-ml': '43px',
    'button-height-lg': '50px',
    'input-height': '52px',
    'location-no-search-height': `calc(100${heightUnit} - 260px - 52px)`,
    'fast-choice-height': `calc(100${heightUnit} - 199px)`,
    'random-height': `calc(100${heightUnit} - 180px)`,
    'swipe-result-height': `calc(100${heightUnit} - 114px)`,
    'restaurant-result-height': `calc(100${heightUnit} - 102px)`,
    'restaurant-result-up-height': `calc(100${heightUnit} - 190px)`,
    'restaurant-result-card-page-height' : `calc(100${heightUnit} - 122px - 60px)`
  }
}

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
      borderRadius: {
        'large': '1200px',
      },
      fontSize: {
        'caption3': ['11px', { lineHeight: '0.786rem' }],   // 11px
        'caption2': ['12px', { lineHeight: '0.857rem' }],     // 12px
        'caption1': ['14px', { lineHeight: '1rem' }],        // 14px
        'body2': ['16px', { lineHeight: '1.143rem' }],           // 16px
        'body1': ['18px', { lineHeight: '1.286rem' }],       // 18px
        'title2': ['20px', { lineHeight: '1.429rem' }],       // 20px
        'title1': ['22px', { lineHeight: '1.571rem' }],      // 22px
        'heading4': ['25px', { lineHeight: '1.786rem' }],   // 25px
        'heading3': ['28px', { lineHeight: '2rem' }],         // 28px
        'heading2': ['32px', { lineHeight: '2.286rem' }],        // 32px
        'heading1': ['36px', { lineHeight: '2.571rem' }],     // 36px
        'display4': ['40px', { lineHeight: '2.857rem' }],        // 40px
        'display3': ['45px', { lineHeight: '3.214rem' }],     // 45px
        'display2': ['51px', { lineHeight: '3.643rem' }],     // 51px
        'display1': ['58px', { lineHeight: '4.143rem' }],      // 58px
      },
      screens: {
        'xs': '420px',    // 추가
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        ...colors,
        "static-white": "rgba(255, 255, 255, 1)",
        "static-black": "rgba(20, 20, 20, 1)",
        "bg-0": "rgba(255, 255, 255, 1)",
        "line-0": "rgba(255, 255, 255, 1)",
        "primary-1": colors['red-50'],
        "text-1": colors['slate-900'],
        "text-2": colors['slate-700'],
        "text-3": colors['slate-500'],
        "text-4": colors['slate-400'],
        "text-5": colors['slate-300'],
        "text-6": colors['slate-200'],
        "text-7": colors['slate-50'],
        "primary-2": colors['red-100'],
        "primary-3": colors['red-200'],
        "primary-4": colors['red-300'],
        "primary-5": colors['red-400'],
        "primary-6": colors['red-500'],
        "primary-7": colors['red-600'],
        "primary-8": colors['red-700'],
        "primary-9": colors['red-800'],
        "primary-10": colors['red-950'],
        "bg-1": colors['slate-50'],
        "bg-2": colors['slate-100'],
        "bg-3": colors['slate-200'],
        "bg-7": colors['slate-500'],
        "bg-8": colors['slate-700'],
        "bg-9": colors['slate-900'],
        "line-1": colors['slate-100'],
        "line-2": colors['slate-200'],
        "line-3": colors['slate-300'],
        "line-4": colors['slate-400'],
        "line-5": colors['slate-500']
      },
      height:generateHeights(),
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
        },
        "fly-in": {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px) rotate(-5deg)',
          },
          '25%': {
            transform: 'translateX(10px) rotate(5deg)',
          },
          '50%': {
            transform: 'translateX(-5px) rotate(-3deg)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateX(5px) rotate(3deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) rotate(0)',
          }
        },
        fadeIn: {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" },
        },
        fadeOut: {
          '0%': { opacity: "1" },
          '100%': { opacity: "0" },
        },
      },
      boxShadow: {
        'bottom-sheet-top': '0 20px 92px 6px rgba(0, 0, 0, 0.1)',
        'card': '0px 15px 30px rgba(0, 0, 0, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.08)',
        'top-sides': '0 -1px 0 1px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        wiggle: 'wiggle 0.15s linear infinite',
        fadeInPage: 'fadeIn 0.8s  forwards',
        flyIn: 'fly-in 0.8s forwards',
        fadeOut: 'fadeOut 0.3s ease-in-out',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
