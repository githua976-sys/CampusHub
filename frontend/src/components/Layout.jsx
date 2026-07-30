import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <main style={{ flex: 1, padding: "20px" }}>
                    <Outlet />
                </main>
            </div>
        </>
    );
}