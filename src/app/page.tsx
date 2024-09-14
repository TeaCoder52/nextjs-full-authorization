import Link from 'next/link'

import { buttonVariants } from '@/shared/components/ui'

export default function HomePage() {
	return (
		<div className='space-y-5 text-center'>
			<h1 className='text-4xl font-bold'>Главная страница</h1>
			<Link href='/auth/login' className={buttonVariants()}>
				Войти в аккаунт
			</Link>
		</div>
	)
}
