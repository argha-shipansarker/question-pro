import { NavLink } from "react-router-dom"
import { useContextApi } from "../../store/AppContext";

function Header() {

    const { userInfo } = useContextApi();

    return (
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            <div style={{ display: "flex", columnGap: "16px" }}>
                <NavLink
                    to={"/"}
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
                    Home
                </NavLink>
                <NavLink
                    to={"/dashboard"}
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
                    Dashboard
                </NavLink>

                <NavLink
                    to={"/component"}
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
                    My Component
                </NavLink>
            </div>

            <div style={{ position: "absolute", right: 0 }}>
                <NavLink
                    to={"/user"}
                    style={{
                        textDecoration: "none",
                        margin: 0
                    }}
                >
                    <p>{userInfo.name}</p>
                </NavLink>
                <p style={{ margin: 0, padding: 0 }}>{userInfo.email}</p>
            </div>
        </div>
    )
}

export default Header