import type { InputHTMLAttributes } from "react";

interface InputI extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input ({label, ...props}: InputI) {
    return <div className="flex flex-col gap-0.5">
        {label && <label className="text-[12px] text-muted-font">{label}</label>}
        <input className="rounded-border p-1.5 placeholder:text-sm text-main-font" {...props}/>
    </div>
}