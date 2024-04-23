import { NavLink } from "react-router-dom";

function DashboardHeader() {
    return (
        <div style={{ display: "flex", columnGap: "16px" }}>
            <NavLink
                to={"/dashboard/posts"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        textDecoration: "none",
                        padding: "8px",
                        background: isActive ? "blue" : "white",
                    };
                }}
            >
                Posts
            </NavLink>
            <NavLink
                to={"/dashboard/comments"}
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "white" : "black",
                        textDecoration: "none",
                        padding: "8px",
                        background: isActive ? "blue" : "white",
                    };
                }}
            >
                Comments
            </NavLink>
        </div>
    )
}

export default DashboardHeader