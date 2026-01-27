export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: { extend: {} },
  // Safelist classes that are constructed dynamically in JS/JSX
  // This prevents Tailwind from purging gradient/color utilities used via variables
  safelist: [
    // gradient directions
    { pattern: /bg-gradient-to-(r|l|t|b|tr|br|tl|bl)/ },
    // from/to/via color stops
    { pattern: /(from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d{3})/ },
    // text gradients and clip
    'bg-clip-text',
    'text-transparent',
    // common utility patterns used dynamically
    { pattern: /(text|bg|border)-(indigo|purple|pink|blue|cyan|green|rose)-(\d{3})/ },
    { pattern: /animate-(blob|float|spin-slow|grid-flow|fade-up|slide-up|pulse-slow|bounce-slow|shimmer-line|star-twinkle|text-shimmer)/ }
  ],
  plugins: [],
}
