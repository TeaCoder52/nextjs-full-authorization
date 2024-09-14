import { type NextRequest, NextResponse } from 'next/server'

/**
 * Middleware для обработки запросов в приложении Next.js.
 *
 * @param {NextRequest} request - Объект запроса, содержащий информацию о текущем запросе.
 * @returns {NextResponse} - Ответ, который будет отправлен клиенту.
 */
export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session = cookies.get('session')?.value

	const isAuthPage = url.includes('/auth')

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', url))
		}

		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

/**
 * Конфигурация middleware, определяющая маршруты, к которым будет применяться данный middleware.
 *
 * @type {{ matcher: string[] }}
 */
export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*']
}
