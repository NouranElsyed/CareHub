
import { forwardRef } from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type:string,
  label:string,
  className?:string
}

const Input =forwardRef<HTMLInputElement, InputProps>(
  ({label,className,type,...props}, ref) => {
    return (
     <div className={`${className}`}>
        <span className="text-sm/6 font-medium text-cyan-800">{label}</span>
       <div className=''>
         <input
        ref={ref}
        {...props}
        type={`${type}`}
          className={`
            mt-1 block w-full rounded-lg border-none bg-cyan-700/5 px-3 py-1.5 text-sm/6 text-cyan-900  
            focus:outline-3 focus:-outline-offset-3 focus:outline-cyan-900/10 focus:bg-cyan-700/10`
          }
          
        />
       </div>
      </div>
   )
  }
);
Input.displayName = "InputField";
export default Input