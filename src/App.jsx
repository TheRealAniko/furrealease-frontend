import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Pets from "./pages/Pets";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import AuthContextProvider from "./context/AuthContext";
import PetContextProvider from "./context/PetContext";

import MainLayout from "./layout/MainLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import CreatePet from "./pages/CreatePet";
import UpdatePet from "./pages/UpdatePet";

const App = () => {
    return (
        <AuthContextProvider>
            <PetContextProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Auth />} />
                            <Route path="auth" element={<Auth />} />
                        </Route>

                        {/* Protected Routes */}
                        <Route element={<ProtectedLayout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="pets" element={<Pets />} />
                            <Route path="pets/:id" element={<PetDetail />} />
                            <Route
                                path="pets/new-pet"
                                element={<CreatePet />}
                            />
                            <Route
                                path="pets/edit-pet/:id"
                                element={<UpdatePet />}
                            />
                            <Route path="reminders" element={<Reminders />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PetContextProvider>
        </AuthContextProvider>
    );
};

export default App;
