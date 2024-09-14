/** @type {import('next').NextConfig} */
const nextConfig = {
	// Экспериментальные функции для Next.js
	experimental: {
		// Отключение функции "missing Suspense with CSR bailout"
		missingSuspenseWithCSRBailout: false
	},
	env: {
		// URL сервера для API-запросов, получаемый из переменных окружения
		SERVER_URL: process.env.SERVER_URL,
		// Ключ сайта Google reCAPTCHA для клиентской валидации
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	},
	images: {
		// Шаблоны для оптимизации изображений
		remotePatterns: [
			{
				// Шаблон для изображений, размещенных на Google User Content
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				// Шаблон для изображений, размещенных на Yandex
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			}
		]
	}
};

export default nextConfig;