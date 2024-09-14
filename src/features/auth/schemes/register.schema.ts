import { z } from 'zod'

/**
 * Схема для валидации данных регистрации.
 */
export const RegisterSchema = z
	.object({
		name: z.string().min(1, {
			message: 'Введите имя'
		}),
		email: z.string().email({
			message: 'Некорректная почта'
		}),
		password: z.string().min(6, {
			message: 'Пароль минимум 6 символов'
		}),
		passwordRepeat: z.string().min(6, {
			message: 'Пароль подтверждения минимум 6 символов'
		})
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat']
	})

/**
 * Тип данных для регистрации, выведенный из схемы.
 */
export type TypeRegisterSchema = z.infer<typeof RegisterSchema>
