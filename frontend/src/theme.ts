import { createSystem, defaultConfig } from '@chakra-ui/react';
import { defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    
    tokens: {
      fonts: {
        heading: { value: 'Average Sans',  },
        body: { value: 'Libre Franklin Variable' },
      },
      colors: {
        text: {
          50: { value: "#e9effb" },
          100: { value: "#d4e0f7" },
          200: { value: "#a9c0ef" },
          300: { value: "#7ea1e7" },
          400: { value: "#5382df" },
          500: { value: "#2862d7" },
          600: { value: "#204fac" },
          700: { value: "#183b81" },
          800: { value: "#102756" },
          900: { value: "#08142b" },
          950: { value: "#040a16" },
        },
        background: {
          50: { value: "#e9effc" },
          100: { value: "#d2dff9" },
          200: { value: "#a6bff2" },
          300: { value: "#799fec" },
          400: { value: "#4c7fe6" },
          500: { value: "#2060df" },
          600: { value: "#194cb3" },
          700: { value: "#133986" },
          800: { value: "#0d2659" },
          900: { value: "#06132d" },
          950: { value: "#030a16" },
        },
        primary: {
          50: { value: "#e9effb" },
          100: { value: "#d4def7" },
          200: { value: "#a9beef" },
          300: { value: "#7e9de7" },
          400: { value: "#537ddf" },
          500: { value: "#285cd7" },
          600: { value: "#204aac" },
          700: { value: "#183781" },
          800: { value: "#102556" },
          900: { value: "#08122b" },
          950: { value: "#040916" },
        },
        secondary: {
          50: { value: "#fbeaf6" },
          100: { value: "#f7d4ed" },
          200: { value: "#efa9db" },
          300: { value: "#e77ec9" },
          400: { value: "#ff4750" },
          500: { value: "#d629a5" },
          600: { value: "#ab2184" },
          700: { value: "#811863" },
          800: { value: "#561042" },
          900: { value: "#2b0821" },
          950: { value: "#150411" },
        },
        accent: {
          50: { value: "#fbe9ea" },
          100: { value: "#f7d4d6" },
          200: { value: "#efa9ac" },
          300: { value: "#e77e83" },
          400: { value: "#df535a" },
          500: { value: "#d72830" },
          600: { value: "#ac2027" },
          700: { value: "#81181d" },
          800: { value: "#561013" },
          900: { value: "#2b080a" },
          950: { value: "#160405" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bodyText: { value: "{colors.text.700}" },
        headingText: { value: "{colors.text.900}" },
        linkText: { value: "{colors.primary.500}" },
        linkTextHover: { value: "{colors.primary.700}" },
        background: { value: "{colors.background.50}" },
        backgroundHover: { value: "{colors.background.100}" },
        primary: { value: "{colors.primary.500}" },
        secondary: { value: "{colors.secondary.500}" },
        accent: { value: "{colors.accent.500}" },
        muted: { value: "{colors.text.200}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
