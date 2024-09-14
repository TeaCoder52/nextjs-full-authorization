/**
 * Класс для обработки ошибок, возникающих при выполнении запросов.
 *
 * @extends Error
 * @property {number} statusCode - Код статуса HTTP, связанный с ошибкой.
 * @property {string} message - Сообщение об ошибке.
 */
export class FetchError extends Error {
	public constructor(
		public statusCode: number,
		public message: string
	) {
		super(message) // Вызов конструктора родительского класса

		// Установка прототипа для корректной работы instanceof
		Object.setPrototypeOf(this, new.target.prototype)
	}
}
