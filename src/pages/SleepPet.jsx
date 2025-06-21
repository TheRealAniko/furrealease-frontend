import SleepingPetCard from "../components/pets/SleepingPetCard";
import { toastSuccess, toastError } from "../utils/toastHelper.js";
import { usePets } from "../context";
import { unsleepPet } from "../data/pets";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const SleepPets = () => {
    const { pets, refreshPets } = usePets();
    const sleepingPets = pets.filter((pet) => pet.status === "sleeping");
    const navigate = useNavigate();

    const handleUnsleep = async (id) => {
        try {
            await unsleepPet(id);
            await refreshPets();
            toastSuccess("Welcome back 💚");
            navigate("/pets");
        } catch (err) {
            toastError(err.message || "Could not bring pet back");
        }
    };
    const handleGoBack = () => {
        setTimeout(() => navigate("/pets"), 100); // 💡 kleiner Delay!
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Angels</h2>
                <button onClick={handleGoBack} className="btn-icon">
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>
            </div>
            <div className="grid grid-cols-1 fit:grid-cols-2 gap-6">
                {sleepingPets.map((pet) => (
                    <SleepingPetCard
                        key={pet._id}
                        id={pet._id}
                        {...pet}
                        onActivate={handleUnsleep}
                    />
                ))}
            </div>
        </div>
    );
};

export default SleepPets;
