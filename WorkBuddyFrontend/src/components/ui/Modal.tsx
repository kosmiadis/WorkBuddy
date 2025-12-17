import { useTheme } from "../../store/ThemeProvider";
import { useModal } from "../../store/useModal"
import Container from "./Container";

export default function Modal () {
    
    const { isOpen, renderedComponent, title, description } = useModal();
    const { theme } = useTheme();

    if (isOpen) return <div className="duration-200 z-100 w-full min-h-screen flex flex-col items-center justify-center absolute left-0 top-0 bg-transparent backdrop-blur-2xl"><div className={`${theme} w-full max-w-[350px]`}>
            <Container>
                <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-0.5">
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                    {renderedComponent}
                </div>
            </Container>
        </div>
    </div>
}