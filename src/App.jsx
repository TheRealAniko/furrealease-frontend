import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Pets from "./pages/Pets";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import AuthContextProvider from "./context/AuthContext";

import MainLayout from "./layout/MainLayout";
import ProtectedLayout from "./layout/ProtectedLayout";

const App = () => {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="auth" element={<Auth />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="pets" element={<Pets />} />
                        <Route path="pets/:id" element={<PetDetail />} />
                        <Route path="reminders" element={<Reminders />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
};

export default App;
