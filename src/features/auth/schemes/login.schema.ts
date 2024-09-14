import { z } from 'zod'

/**
 * Схема для валидации данных входа.
 */
export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	password: z.string().min(6, {
		message: 'Пароль минимум 6 символов'
	}),
	code: z.optional(z.string())
})

/**
 * Тип данных для входа, выведенный из схемы.
 */
export type TypeLoginSchema = z.infer<typeof LoginSchema>
