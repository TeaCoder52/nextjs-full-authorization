import type { Metadata } from 'next'

import { SettingsForm } from '@/features/user/components/SettingsForm'

export const metadata: Metadata = {
	title: 'Настройки профиля'
}

export default function SettingsPage() {
	return <SettingsForm />
}
