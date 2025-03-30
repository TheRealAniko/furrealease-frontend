import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8 pt-20">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
