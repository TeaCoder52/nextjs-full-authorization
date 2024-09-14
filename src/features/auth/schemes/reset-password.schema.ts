import { z } from 'zod'

/**
 * Схема для валидации данных сброса пароля.
 */
export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	})
})

/**
 * Тип данных для сброса пароля, выведенный из схемы.
 */
export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
