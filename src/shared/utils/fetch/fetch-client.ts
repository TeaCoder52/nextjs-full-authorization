import { FetchError } from './fetch-error'
import type { RequestOptions, TypeSearchParams } from './fetch-types'

/**
 * Класс для выполнения HTTP-запросов с использованием Fetch API.
 */
export class FetchClient {
	private baseUrl: string
	public headers?: Record<string, string>
	public params?: TypeSearchParams
	public options?: RequestOptions

	/**
	 * Конструктор класса FetchClient.
	 *
	 * @param {Object} init - Начальные параметры для клиента.
	 * @param {string} init.baseUrl - Базовый URL для запросов.
	 * @param {Record<string, string>} [init.headers] - Заголовки для запросов.
	 * @param {TypeSearchParams} [init.params] - Параметры для поиска.
	 * @param {RequestOptions} [init.options] - Дополнительные параметры запроса.
	 */
	public constructor(init: {
		baseUrl: string
		headers?: Record<string, string>
		params?: TypeSearchParams
		options?: RequestOptions
	}) {
		this.baseUrl = init.baseUrl
		this.headers = init.headers
		this.params = init.params
		this.options = init.options
	}

	/**
	 * Создает строку параметров поиска для URL.
	 *
	 * @param {TypeSearchParams} params - Параметры поиска.
	 * @returns {string} - Строка параметров поиска, начинающаяся с "?".
	 */
	private createSearchParams(params: TypeSearchParams) {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]

				if (Array.isArray(value)) {
					value.forEach(currentValue => {
						if (currentValue) {
							searchParams.append(key, currentValue.toString())
						}
					})
				} else if (value) {
					searchParams.set(key, value.toString())
				}
			}
		}

		return `?${searchParams.toString()}`
	}

	/**
	 * Выполняет HTTP-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {RequestInit['method']} method - Метод HTTP (GET, POST, PUT и т.д.).
	 * @param {RequestOptions} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 * @throws {FetchError} - Если ответ не успешен, выбрасывает ошибку FetchError.
	 */
	private async request<T>(
		endpoint: string,
		method: RequestInit['method'],
		options: RequestOptions = {}
	) {
		let url = `${this.baseUrl}/${endpoint}`

		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			...options,
			...(!!this.options && { ...this.options }),
			method,
			headers: {
				...(!!options?.headers && options.headers),
				...this.headers
			}
		}

		const response: Response = await fetch(url, config)

		if (!response.ok) {
			const error = (await response.json()) as
				| { message: string }
				| undefined
			throw new FetchError(
				response.status,
				error?.message || response.statusText
			)
		}

		if (
			response.headers.get('Content-Type')?.includes('application/json')
		) {
			return (await response.json()) as unknown as T
		} else {
			return (await response.text()) as unknown as T
		}
	}

	/**
	 * Выполняет GET-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {Omit<RequestOptions, 'body'>} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 */
	public get<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	) {
		return this.request<T>(endpoint, 'GET', options)
	}

	/**
	 * Выполняет POST-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {Record<string, any>} [body] - Тело запроса.
	 * @param {RequestOptions} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 */
	public post<T>(
		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'POST', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}

	/**
	 * Выполняет PUT-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {Record<string, any>} [body] - Тело запроса.
	 * @param {RequestOptions} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 */
	public put<T>(
		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PUT', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}

	/**
	 * Выполняет DELETE-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {Omit<RequestOptions, 'body'>} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 */
	public delete<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	) {
		return this.request<T>(endpoint, 'DELETE', options)
	}

	/**
	 * Выполняет PATCH-запрос.
	 *
	 * @template T
	 * @param {string} endpoint - Конечная точка API для запроса.
	 * @param {Record<string, any>} [body] - Тело запроса.
	 * @param {RequestOptions} [options={}] - Дополнительные параметры запроса.
	 * @returns {Promise<T>} - Ответ от сервера, преобразованный в тип T.
	 */
	public patch<T>(
		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PATCH', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}
}
