/**
 * Тип для параметров поиска, которые могут быть переданы в запрос.
 *
 * Ключи могут быть строками, а значения могут быть:
 * - строками
 * - числами
 * - булевыми значениями
 * - undefined
 * - массивами, содержащими строки, числа, булевы значения или undefined
 */
export type TypeSearchParams = {
	[key: string]:
		| string
		| number
		| boolean
		| undefined
		| Array<string | number | boolean | undefined>
}

/**
 * Интерфейс для параметров запроса, расширяющий стандартные параметры RequestInit.
 *
 * @extends RequestInit
 * @property {Record<string, string>} [headers] - Заголовки, которые будут добавлены к запросу.
 * @property {TypeSearchParams} [params] - Параметры поиска, которые будут добавлены к URL.
 */
export interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
	params?: TypeSearchParams
}

/**
 * Тип для конфигурации запроса, который может содержать параметры и дополнительные параметры.
 *
 * @template Params - Тип параметров, которые могут быть переданы в запрос.
 * @property {RequestOptions} [config] - Дополнительные параметры запроса.
 * @property {Params} [params] - Параметры, которые будут добавлены к запросу, если они определены.
 */
export type TypeFetchRequestConfig<Params = undefined> =
	Params extends undefined
		? { config?: RequestOptions }
		: { params: Params; config?: RequestOptions }
