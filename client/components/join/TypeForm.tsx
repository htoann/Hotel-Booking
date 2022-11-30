import {useEffect, useState} from 'react'
import {RadioGroup} from '@headlessui/react'

type TypeData = {
    type: string
}

type TypeFormProps = TypeData & {
    updateFields: (fields: Partial<TypeData>) => void
}

interface Type {
    type?: string
    description?: string
}

const plans: Type[] = [
    {
        type: 'resorts',
        description: 'Furnished and self-catering accommodations where guests rent the entire place.'
    },
    {
        type: 'hotels',
        description: 'Furnished and self-catering accommodations where guests rent the entire place.'
    },
    {
        type: 'villas',
        description: 'Furnished and self-catering accommodations where guests rent the entire place.'
    },
    {
        type: 'apartments',
        description: 'Furnished and self-catering accommodations where guests rent the entire place.'
    },
    {
        type: 'cabins',
        description: 'Furnished and self-catering accommodations where guests rent the entire place.'
    }
]

export default function TypeForm ({
    type,
    updateFields
}: TypeFormProps) {
    const [selected, setSelected] = useState<Type>({type: type})

    useEffect(() => {
        setSelected({type: type})
    }, [type])

    return (
        <div>
            <h1 className="font-bold text-2xl mt-2.5">Choose type</h1>
            <div className="w-full px-4 py-16">
                <div className="mx-auto w-full max-w-md">
                    <RadioGroup value={selected} onChange={(e) => {
                        updateFields({type: e.type})
                    }}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2">
                            {plans.map((plan) => (
                                <RadioGroup.Option
                                    key={plan.type}
                                    value={plan}
                                    className={({active, checked}) =>
                                        `${
                                            active || selected.type === plan.type
                                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                : ''
                                        }
                                        ${checked || selected.type === plan.type ? 'bg-lightPrimary text-white' : 'bg-white'}
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                    }
                                >
                                    {({active, checked}) => (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center w-5/6">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium first-letter:uppercase  ${
                                                                checked || selected.type === plan.type ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {plan.type}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${
                                                                checked || selected.type === plan.type ? 'text-sky-100' : 'text-gray-500'
                                                            }`}
                                                        >
                                                            <span>
                                                                {plan.description}
                                                            </span>
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                {checked || selected.type === plan.type ? (
                                                    <div className="shrink-0 text-white">
                                                        <CheckIcon className="h-6 w-6"/>
                                                    </div>
                                                ) : <></>}
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}

function CheckIcon (props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
