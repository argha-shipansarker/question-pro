import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"

function Layout() {
    return (
        <div style={{ maxWidth: "1280px", margin: "auto", userSelect: "none" }}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout