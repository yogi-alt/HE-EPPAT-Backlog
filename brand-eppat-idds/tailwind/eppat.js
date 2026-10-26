/**
 * E-PPAT Color Tokens for Tailwind CSS v3
 * Pejabat Pembuat Akta Tanah Theme — format sama dengan @idds/styles/tailwind/ts/inagov.js
 *
 * // tailwind.config.js
 * import { iddsColorToken } from '@idds/react';
 * import eppatColorTokens from './brand-eppat-idds/tailwind/eppat.js';
 * export default { theme: { extend: { colors: { ...iddsColorToken, ...eppatColorTokens } } } };
 */
const eppatColorTokens = {
    // Primary shades
    'primary-25': 'var(--ina-primary-25, #f5f8f7)',
    'primary-50': 'var(--ina-primary-50, #eef3f1)',
    'primary-100': 'var(--ina-primary-100, #dde5e2)',
    'primary-200': 'var(--ina-primary-200, #c2d3cc)',
    'primary-300': 'var(--ina-primary-300, #9db8ae)',
    'primary-400': 'var(--ina-primary-400, #4e7c6f)',
    'primary-500': 'var(--ina-primary-500, #3d6b5e)',
    'primary-600': 'var(--ina-primary-600, #345d52)',
    'primary-700': 'var(--ina-primary-700, #2a4b42)',
    'primary-800': 'var(--ina-primary-800, #1d3530)',
    'primary-900': 'var(--ina-primary-900, #0f1c19)',
    'primary-primary': 'var(--ina-primary-primary, #3d6b5e)',
    // Secondary shades
    'secondary-25': 'var(--ina-secondary-25, #fcfbf6)',
    'secondary-50': 'var(--ina-secondary-50, #f8f4e7)',
    'secondary-100': 'var(--ina-secondary-100, #f0e8cc)',
    'secondary-200': 'var(--ina-secondary-200, #e6dab2)',
    'secondary-300': 'var(--ina-secondary-300, #dac999)',
    'secondary-400': 'var(--ina-secondary-400, #c7b077)',
    'secondary-500': 'var(--ina-secondary-500, #ae9358)',
    'secondary-600': 'var(--ina-secondary-600, #8c7444)',
    'secondary-700': 'var(--ina-secondary-700, #6a5733)',
    'secondary-800': 'var(--ina-secondary-800, #483b23)',
    'secondary-900': 'var(--ina-secondary-900, #272013)',
    // Interactive hover
    'brand-primary': 'var(--ina-brand-primary, #3d6b5e)',
    'brand-hover': 'var(--ina-brand-hover, #345d52)',
    'neutral-hover': 'var(--ina-neutral-hover, #f2f2f2)',
    // Brand-specific colors
    'eppat-sidebar-bg': 'var(--ina-eppat-sidebar-bg, #2c3c42)',
    'eppat-sidebar-hover': 'var(--ina-eppat-sidebar-hover, #3a4d54)',
    'eppat-sidebar-active': 'var(--ina-eppat-sidebar-active, #3d6b5e)',
    'eppat-office-card': 'var(--ina-eppat-office-card, #dac999)',
    'eppat-stroke-brand': 'var(--ina-eppat-stroke-brand, #d2ddd9)',
    'eppat-surface-cream': 'var(--ina-eppat-surface-cream, #eef3f1)',
};
export default eppatColorTokens;
