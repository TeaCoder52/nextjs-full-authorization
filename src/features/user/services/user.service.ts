import { api } from '@/shared/api'

import type { TypeSettingsSchema } from '../schemes'
import type { IUser } from '../types'

/**
 * Сервис для работы с пользователями.
 */
class UserService {
	/**
	 * Получает профиль текущего пользователя.
	 *
	 * @returns {Promise<IUser>} - Профиль пользователя.
	 */
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	/**
	 * Обновляет профиль текущего пользователя.
	 *
	 * @param {TypeSettingsSchema} body - Данные для обновления профиля.
	 * @returns {Promise<IUser>} - Обновленный профиль пользователя.
	 */
	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}
}

export const userService = new UserService()
