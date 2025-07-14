import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";

const LayoutShell = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-screen">
            <Header onBurgerClick={() => setIsSidebarOpen(true)} />

            <div className="flex flex-1">
                <Sidebar
                    isOpen={isSidebarOpen} // ← sagt Sidebar: offen oder zu?
                    onClose={() => setIsSidebarOpen(false)} // ← Funktion zum Schließen
                />

                <main className="flex-1 px-2 sm:px-8 pt-20 bg-neutral100">
                    <Breadcrumbs className="" />
                    <Outlet />
                </main>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                theme="colored"
            />
            <Footer />
        </div>
    );
};

export default LayoutShell;
