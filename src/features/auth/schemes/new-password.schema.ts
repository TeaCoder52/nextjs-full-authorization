import { z } from 'zod'

/**
 * Схема для валидации нового пароля.
 */
export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Пароль минимум 6 символов'
	})
})

/**
 * Тип данных для нового пароля, выведенный из схемы.
 */
export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>
