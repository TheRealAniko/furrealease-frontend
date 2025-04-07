import SleepingPetCard from "../components/pets/SleepingPetCard";
import { usePets } from "../context";
import { unsleepPet } from "../data/pets"; // 👈 wichtig!
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SleepPets = () => {
    const { pets, refreshPets } = usePets();
    const sleepingPets = pets.filter((pet) => pet.status === "sleeping");
    const navigate = useNavigate();

    const handleUnsleep = async (id) => {
        try {
            await unsleepPet(id);
            toast.success("Welcome back 💚");
            await refreshPets();
            navigate("/pets");
        } catch (err) {
            toast.error("Could not bring pet back");
            console.error(err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Angels</h2>
                go back buuton
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
