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
import RemContextProvider from "./context/RemContext";

import LayoutShell from "./layout/LayoutShell";
import HomeLayout from "./layout/HomeLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import CreatePet from "./pages/CreatePet";
import UpdatePet from "./pages/UpdatePet";
import SleepPets from "./pages/SleepPet";

const App = () => {
    return (
        <AuthContextProvider>
            <PetContextProvider>
                <RemContextProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Public Routes */}
                            <Route element={<HomeLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="auth" element={<Auth />} />
                            </Route>

                            {/* Protected Routes */}
                            <Route element={<ProtectedLayout />}>
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="pets" element={<Pets />} />
                                <Route
                                    path="pets/:id"
                                    element={<PetDetail />}
                                />
                                <Route
                                    path="pets/new-pet"
                                    element={<CreatePet />}
                                />
                                <Route
                                    path="pets/edit-pet/:id"
                                    element={<UpdatePet />}
                                />
                                <Route
                                    path="pets/sleeping"
                                    element={<SleepPets />}
                                />
                                <Route
                                    path="reminders"
                                    element={<Reminders />}
                                />
                                <Route path="settings" element={<Settings />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </RemContextProvider>
            </PetContextProvider>
        </AuthContextProvider>
    );
};

export default App;
