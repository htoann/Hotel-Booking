import React, {useState} from 'react'
import {ImagesInput, Information, MapInput, Type} from '../../components/join'
import {Button} from '../../components/core'

const stepPages = [
    <Type key={0}/>, <Information key={1}/>, <MapInput key={2}/>, <ImagesInput key={3}/>
]

interface stepsInterface {
    isValid: boolean | undefined;
    label: string;
}

const Join = () => {
    const [step, setStep] = useState<number>(0)
    const [formState, setFormState] = React.useState<Object>({})
    const [steps, setSteps] = React.useState<Array<stepsInterface>>([
        {label: 'Type', isValid: undefined},
        {label: 'Information', isValid: undefined},
        {label: 'MapInput', isValid: undefined},
        {label: 'ImagesInput', isValid: undefined}
    ])

    const currentPage = stepPages[step]
    const lastStepIndex = steps.length - 1
    const isLastStep = lastStepIndex === step

    const onStepSubmit = React.useCallback(
        (event: any) => {
            // const {isValid, values} = event

            // const currentSteps = steps.map(
            //     (currentStep: stepsInterface, index: number) => ({
            //         ...currentStep,
            //         isValid: index === step ? isValid : currentStep.isValid
            //     })
            // )
            //
            // setSteps(currentSteps)
            //
            // if (!isValid) {
            //     return
            // }

            setStep(() => Math.min(step + 1, lastStepIndex))
            // setFormState(values)

            if (isLastStep) {
                alert(JSON.stringify('oke'))
            }
        },
        [steps, isLastStep, step, lastStepIndex]
    )

    const onPrevClick = React.useCallback(
        (event: any) => {
            event.preventDefault()
            setStep(() => Math.max(step - 1, 0))
        },
        [step, setStep]
    )
    return (
        <div className="container mx-auto">
            {currentPage}
            <div className="flex justify-around gap-x-2.5">
                {
                    step !== 0 ? (
                        <div onClick={onPrevClick}>
                            <Button text="Previous" textColor="text-white" bgColor="bg-primary"/>
                        </div>

                    ) : <div></div>
                }
                <div
                    className=""
                    onClick={onStepSubmit}>
                    <Button text={isLastStep ? 'Submit' : 'Next'} textColor="text-white" bgColor="bg-primary"/>
                </div>
            </div>
        </div>
    )
}

export default Join
