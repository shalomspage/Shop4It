'use client';

import useLogin from '@/hooks/use-login';
import { Form } from '@/components/forms';

export default function LoginForm() {
	const { username, password, isLoading, onChange, onSubmit } = useLogin();

	const config = [
		{
			labelText: 'User Name',
			labelId: 'username',
			type: 'text',
			value: username,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			link: {
				linkText: 'Forgot password?',
				linkUrl: '/password-reset',
			},
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Sign in'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
