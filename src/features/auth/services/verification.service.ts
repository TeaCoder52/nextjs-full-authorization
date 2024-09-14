import { api } from '@/shared/api'

/**
 * Сервис для верификации электронной почты.
 */
class VerificationService {
	/**
	 * Подтверждение электронной почты с использованием токена.
	 *
	 * @param {string | null} token - Токен для подтверждения.
	 * @returns {Promise<any>} - Ответ от сервера.
	 */
	public async newVerification(token: string | null) {
		const response = await api.post('auth/email-confirmation', { token })

		return response
	}
}

export const verificationService = new VerificationService()
