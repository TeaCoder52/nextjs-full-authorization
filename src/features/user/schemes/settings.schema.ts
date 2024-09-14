import { z } from 'zod'

/**
 * Схема для валидации и типизации данных настроек пользователя.
 */
export const SettingsSchema = z.object({
	name: z.string().min(1, {
		message: 'Введите имя'
	}),
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	isTwoFactorEnabled: z.boolean()
})

/**
 * Тип данных настроек пользователя, выведенный из схемы.
 */
export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
