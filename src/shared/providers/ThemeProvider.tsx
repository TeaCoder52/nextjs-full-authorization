'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Провайдер для управления темами.
 *
 * @param {ThemeProviderProps} props - Свойства компонента.
 * @returns {JSX.Element} - Провайдер тем с дочерними элементами.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
