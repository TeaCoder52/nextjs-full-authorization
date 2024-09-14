'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

/**
 * Провайдер для управления запросами с Tanstack Query.
 *
 * @param {PropsWithChildren<unknown>} props - Свойства компонента.
 * @returns {JSX.Element} - Провайдер запросов с дочерними элементами.
 */
export function TanstackQueryProvider({
	children
}: PropsWithChildren<unknown>) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
