/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './next-components/**/*.{js,ts,jsx,tsx,mdx}',
    './next-app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Extend theme to work well with Ant Design
      colors: {
        // Ant Design primary colors
        'ant-primary': '#1890ff',
        'ant-success': '#52c41a',
        'ant-warning': '#faad14',
        'ant-error': '#f5222d',

        // Additional colors for AI/modern look
        'ai-blue': '#0066ff',
        'ai-purple': '#6366f1',
        'ai-gradient-start': '#667eea',
        'ai-gradient-end': '#764ba2',
      },

      // Typography that complements Ant Design
      fontFamily: {
        alibaba: ['AlibabaSans', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },

      // Spacing that aligns with Ant Design grid
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },

      // Animation for modern interactions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Box shadows that complement Ant Design
      boxShadow: {
        'ant-card':
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        'ant-drawer': '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    // Note: @tailwindcss/typography and @tailwindcss/forms plugins available as optional dependencies
  ],

  // Important prefix to avoid conflicts with Ant Design
  important: false,

  // Configure to work with CSS-in-JS
  corePlugins: {
    // Disable preflight to avoid conflicts with Ant Design styles
    preflight: false,
  },
};
