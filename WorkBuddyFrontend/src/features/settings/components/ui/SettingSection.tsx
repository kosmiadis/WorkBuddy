import type { ReactNode } from "react";
import Container from "../../../../components/ui/Container";

type SettingSectionProps = {
    title: string;
    children: ReactNode;
}

export default function SettingSection ({ title, children }: SettingSectionProps) {
    return <Container>
    <section className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg">{title}</h3>
        <div>
            {children}
        </div>
    </section>
    </Container>
}