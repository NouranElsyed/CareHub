import { Input , Field, Label } from '@headlessui/react'
import clsx from 'clsx'
const InputField = ({label}:{label:string}) => {
  return (
     <Field>
        <Label className="text-sm/6 font-medium text-black">{label}</Label>
        <Input
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-cyan-700/20 px-3 py-1.5 text-sm/6 text-cyan-900',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        />
      </Field>
  )
}

export default InputField