import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Pets from "./pages/Pets";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";

import MainLayout from "./layout/MainLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="pets" element={<Pets />} />
                    <Route path="pets/:id" element={<PetDetail />} />
                    <Route path="reminders" element={<Reminders />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
