import React from 'react'
import { ChangeEvent, FormEvent } from 'react';
import Spinner from '../common/Spinner';
import Input from './Input';


interface Config {
    labelText: string;
    labelId: string;
    type: string;
    value: string;
    link?: {
        linkText: string;
        linkUrl: string;
    }
    required?: boolean;
}

interface Props {
    config: Config[];
    isLoading: boolean;
    btnText: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}


const form = ({
     config,
    isLoading,
    btnText,
    onChange,
    onSubmit,
}: Props) => {
  return (
    <form className='space-y-6' onSubmit={onSubmit}>
       {config.map(input => (
				<Input
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={onChange}
					value={input.value}
					link={input.link}
					required={input.required}
				>
					{input.labelText}
				</Input>
			))}

            <div>
                 <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-emerald-900 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-70"
                          >
                            {isLoading ? <Spinner sm /> : `${btnText}`}
                </button>
            </div>
    </form>
  )
}

export default form