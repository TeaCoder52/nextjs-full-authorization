import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет классы CSS, используя clsx и tailwind-merge.
 *
 * @param {...ClassValue} inputs - Один или несколько классов CSS, которые нужно объединить.
 * @returns {string} - Объединенная строка классов CSS.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
