import { ReactNode, useEffect, useRef, useState } from "react";

export default function MyComponent({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const clickHandler = () => {
        console.log("Button clicked");
        setCount((prev) => prev + 1);
    };

    useEffect(() => {
        const container = containerRef.current;
        const buttons = container?.querySelectorAll("button");
        for (const button of buttons || []) {
            button.addEventListener('click', clickHandler);
            break;
        }

        return () => {
            for (const button of buttons || []) {
                button.removeEventListener('click', clickHandler);
                break;
            }
        };
    }, []);

    return (
        <div ref={containerRef}>
            <p >
                Hey! you have clicked me {count} times
            </p>
            {children}
        </div>
    );
}