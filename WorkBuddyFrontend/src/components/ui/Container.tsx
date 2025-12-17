import type { HTMLAttributes, ReactNode } from "react";

interface ContainerI extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}


export default function Container ({children, ...props}: ContainerI) {
    return <div {...props} className={`rounded-border bg-secondary-background p-4`}>
        {children}
    </div>
}