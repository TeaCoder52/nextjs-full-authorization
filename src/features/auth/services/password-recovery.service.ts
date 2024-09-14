import { api } from '@/shared/api'

import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes'
import type { IAuthResponse } from '../types'

/**
 * Сервис для восстановления пароля.
 */
class PasswordRecoveryService {
	/**
	 * Сброс пароля.
	 *
	 * @param {TypeResetPasswordSchema} body - Данные для сброса пароля.
	 * @param {string} [recaptcha] - Токен reCAPTCHA (опционально).
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>(
			'auth/password-recovery/reset',
			body,
			{
				headers
			}
		)

		return response
	}

	/**
	 * Установка нового пароля.
	 *
	 * @param {TypeNewPasswordSchema} body - Данные для нового пароля.
	 * @param {string | null} token - Токен для подтверждения.
	 * @param {string} [recaptcha] - Токен reCAPTCHA (опционально).
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>(
			`auth/password-recovery/new/${token}`,
			body,
			{
				headers
			}
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
