module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        primary: '#1e40af',
        secondary: '#374151',
        text: '#e5e7eb',
        error: '#dc2626',
        accent: '#9333ea',
      },
    },
  },
  plugins: [],
};
