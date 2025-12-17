import type { HTMLAttributes, ReactNode } from "react"

interface ButtonI extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    styleType?: 'main' | 'secondary' | 'danger' | 'info';
    type?: 'submit' | 'reset' | 'button' | undefined;
    children: ReactNode;
}

const ButtonStyles = {
    main: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-error',
    warning: 'btn-warning',
    info: 'btn-info',
}

export default function Button ({ disabled=false, styleType='main', children, ...props }: ButtonI) {
    return <button disabled={disabled} className={`${disabled ? 'opacity-70' : ''} ${ButtonStyles[styleType]}`} {...props}>
        {children}
    </button>
}