import { ReactNode, CSSProperties } from "react";

export default function Button({ children, style }: { children: ReactNode, style: CSSProperties }) {
    return (
        <button {...{style}}>{children}</button>
    )
}