import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../components/layout/Footer";
import Cat from "../assets/Cat.svg";
import Dog from "../assets/Dog.svg";
import Rabbit from "../assets/Rabbit.svg";

const HomeLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-screen">
            <Header onBurgerClick={() => setIsSidebarOpen(true)} />

            <div className="flex flex-1">
                <Sidebar
                    isOpen={isSidebarOpen} // ← sagt Sidebar: offen oder zu?
                    onClose={() => setIsSidebarOpen(false)} // ← Funktion zum Schließen
                />

                <main className="flex-1 bg-neutral200 ">
                    <div className="flex flex-col  text-neutral900 pt-20 ">
                        <div className="relative flex-1 overflow-hidden">
                            {/* 2.1 Background Layer */}
                            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                                <img
                                    src={Dog}
                                    alt="Dog Illustration"
                                    className="hidden md:block absolute top-20 left-4 w-60 lg:w-72"
                                />
                                <img
                                    src={Cat}
                                    alt="Cat Illustration"
                                    className="hidden md:block absolute top-24 right-0 w-56 lg:w-64"
                                />
                                <img
                                    src={Rabbit}
                                    alt="Rabbit Illustration"
                                    className="hidden lg:block absolute top-1/4 left-2/3 w-48 xl:w-56"
                                />
                            </div>
                            {/* 2.2 Content Layer */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-start px-4 md:px-6 lg:px-8">
                                <Outlet />
                            </div>
                        </div>
                    </div>
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

export default HomeLayout;
