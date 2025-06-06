/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const rotateX = plugin(function ({ addUtilities }) {
	addUtilities({
		'.rotate-y-180': {
			transform: 'rotateY(180deg)',
		},
	});
});
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	purge: {
		content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
		options: {
			safelist: [
				'badge-outline-info',
				'badge-outline-success',
				'badge-outline-danger',
				'badge-outline-warning',
				'badge-outline-primary',
				'badge-outline-secondary',
				'badge-outline-dark',
				'badge-outline-light',
				'bg-info',
				'bg-success',
				'bg-danger',
				'bg-warning',
				'bg-[#4A90E2]',
				'bg-[#7ED321]',
				'bg-[#D0021B]',
				'bg-[#F8E71C]',
				'bg-[#50E3C2]',
				'bg-[#D8D8D8]',
				'bg-[#4A4A4A]',
				'bg-[#9013FE]',
				'bg-[#FF4081]',
				'bg-[#00BCD4]',
			],
		},
	},
	darkMode: 'class',
	theme: {
		zIndex: {
			0: 0,
			10: 10,
			20: 20,
			30: 30,
			40: 40,
			50: 50,
			60: 60,
			70: 70,
			80: 80,
			90: 90,
			100: 100,
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#4361ee',
					light: '#eaf1ff',
					'dark-light': 'rgba(67,97,238,.15)',
				},
				secondary: {
					DEFAULT: '#805dca',
					light: '#ebe4f7',
					'dark-light': 'rgb(128 93 202 / 15%)',
				},
				success: {
					DEFAULT: '#00ab55',
					light: '#ddf5f0',
					'dark-light': 'rgba(0,171,85,.15)',
				},
				danger: {
					DEFAULT: '#e7515a',
					light: '#fff5f5',
					'dark-light': 'rgba(231,81,90,.15)',
				},
				warning: {
					DEFAULT: '#e2a03f',
					light: '#fff9ed',
					'dark-light': 'rgba(226,160,63,.15)',
				},
				info: {
					DEFAULT: '#2196f3',
					light: '#e7f7ff',
					'dark-light': 'rgba(33,150,243,.15)',
				},
				dark: {
					DEFAULT: '#3b3f5c',
					light: '#eaeaec',
					'dark-light': 'rgba(59,63,92,.15)',
				},
				black: {
					DEFAULT: '#0e1726',
					light: '#e3e4eb',
					'dark-light': 'rgba(14,23,38,.15)',
				},
				white: {
					DEFAULT: '#ffffff',
					light: '#e0e6ed',
					dark: '#888ea8',
				},
				green: colors.green,
			},
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
			},
			spacing: {
				4.5: '18px',
			},
			boxShadow: {
				'3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-invert-headings': theme('colors.white.dark'),
						'--tw-prose-invert-links': theme('colors.white.dark'),
						h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
						h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
						h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
						h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
						h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
						h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
						p: { marginBottom: '0.5rem' },
						li: { margin: 0 },
						img: { margin: 0 },
					},
				},
			}),
			keyframes: {
				animatedgradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
			backgroundSize: {
				'300%': '300%',
			},
			animation: {
				gradient: 'animatedgradient 6s ease infinite alternate',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
		require('@tailwindcss/typography'),
		// require('@tailwindcss/colors'),
		rotateX,
	],
};
