import {useState} from 'react'

export const useForm = (initialState = {}): any => {
  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleChange = ({target}: any) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  return {values, reset, handleChange}
}
