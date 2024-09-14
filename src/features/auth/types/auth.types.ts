import type { IUser } from '@/features/user/types'

/**
 * Интерфейс для ответа аутентификации.
 */
export interface IAuthResponse {
	user: IUser
}
