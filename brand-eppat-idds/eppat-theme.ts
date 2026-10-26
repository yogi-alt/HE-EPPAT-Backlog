/**
 * E-PPAT Custom Theme untuk @idds/react — dipakai dengan setCustomTheme() (API resmi IDDS).
 *
 *   import { setCustomTheme } from '@idds/react';
 *   import { eppatTheme } from './eppat-theme';
 *   setCustomTheme(eppatTheme);
 *
 * setCustomTheme mengubah kunci camelCase menjadi variabel --ina-* di <html>
 * (mis. primary500 → --ina-primary-500). Cara ini tidak membawa penyesuaian mode gelap;
 * bila aplikasi memakai mode gelap, gunakan eppat.css + data-brand="eppat".
 */
import type { CustomTheme } from '@idds/react';

export const eppatTheme: CustomTheme = {
  name: 'eppat',
  colors: {
    primary25: '#f5f8f7',
    primary50: '#eef3f1',
    primary100: '#dde5e2',
    primary200: '#c2d3cc',
    primary300: '#9db8ae',
    primary400: '#4e7c6f',
    primary500: '#3d6b5e',
    primary600: '#345d52',
    primary700: '#2a4b42',
    primary800: '#1d3530',
    primary900: '#0f1c19',
    primaryPrimary: '#3d6b5e',

    secondary25: '#fcfbf6',
    secondary50: '#f8f4e7',
    secondary100: '#f0e8cc',
    secondary200: '#e6dab2',
    secondary300: '#dac999',
    secondary400: '#c7b077',
    secondary500: '#ae9358',
    secondary600: '#8c7444',
    secondary700: '#6a5733',
    secondary800: '#483b23',
    secondary900: '#272013',

    brandPrimary: '#3d6b5e',
    brandHover: '#345d52',

    eppatSidebarBg: '#2c3c42',
    eppatSidebarHover: '#3a4d54',
    eppatSidebarActive: '#3d6b5e',
    eppatOfficeCard: '#dac999',
    eppatStrokeBrand: '#d2ddd9',
    eppatSurfaceCream: '#eef3f1',
  },
};

export default eppatTheme;
