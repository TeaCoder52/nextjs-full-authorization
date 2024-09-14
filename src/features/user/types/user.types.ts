/**
 * Роли пользователя в системе.
 */
export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN'
}

/**
 * Методы аутентификации.
 */
export enum AuthMethod {
	Credentials = 'CREDENTIALS',
	Google = 'GOOGLE',
	Yandex = 'YANDEX'
}

/**
 * Интерфейс для аккаунта пользователя.
 */
export interface IAccount {
	id: string
	createdAt: Date
	updatedAt: Date
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresAt: number
	userId: string
}

/**
 * Интерфейс для пользователя.
 */
export interface IUser {
	id: string
	createdAt: Date
	updatedAt: Date
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
}
