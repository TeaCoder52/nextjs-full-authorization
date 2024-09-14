import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import type { TypeSettingsSchema } from '../schemes'
import { userService } from '../services'

/**
 * Хук для выполнения мутации обновления профиля пользователя.
 */
export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: ({ values }: { values: TypeSettingsSchema }) =>
			userService.updateProfile(values),
		onSuccess() {
			toast.success('Профиль успешно обновлён')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
