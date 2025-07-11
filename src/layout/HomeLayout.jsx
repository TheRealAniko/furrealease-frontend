import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../components/layout/Footer";

const LayoutShell = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8 pt-24 bg-neutral100">
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
