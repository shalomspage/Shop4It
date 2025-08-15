'use client'

import React from 'react'
import Form from './Form'
import useRegister from '@/hooks/use-register';


const RegisterForm = () => {
    const{
        // first_name,
        // last_name,
        email,
        username,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit
        } = useRegister();

        const config = [
          
            {
                labelText: 'Email',
                labelId: "email",
                type: 'email',
                value: email,
                required: true,
            },
            {
                labelText: 'Username',
                labelId: "username",
                type: 'text',
                value: username,
                required: true,
            },
            {
                labelText: 'Password',
                labelId: "password",
                type: 'password',
                value: password,
                required: true,
            },
            {
                labelText: 'Confirm Password',
                labelId: "re_password",
                type: 'password',
                value: re_password,
                required: true,
            }
        ]
  return (
    <Form
			config={config}
			isLoading={isLoading}
			btnText='Sign up'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
  )
}

export default RegisterForm