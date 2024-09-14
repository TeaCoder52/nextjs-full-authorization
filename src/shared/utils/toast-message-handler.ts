import { toast } from 'sonner'

/**
 * Обработчик сообщений об ошибках, который отображает уведомления с помощью библиотеки Sonner.
 *
 * @param {Error} error - Объект ошибки, содержащий информацию об ошибке.
 */
export function toastMessageHandler(error: Error) {
	if (error.message) {
		const errorMessage = error.message
		const firstDotIndex = errorMessage.indexOf('.')

		if (firstDotIndex !== -1) {
			toast.error(errorMessage.slice(0, firstDotIndex), {
				description: errorMessage.slice(firstDotIndex + 1)
			})
		} else {
			toast.error(errorMessage)
		}
	} else {
		toast.error('Ошибка со строны сервера')
	}
}
