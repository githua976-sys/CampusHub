import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />

            <div style={{ marginLeft: "220px", padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
}