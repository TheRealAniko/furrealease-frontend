import { useEffect } from "react";
import { useLocation } from "react-router";
import { usePets } from "../context";
import Petlist from "../components/PetList";
import AddPetBtn from "../components/AddPetBtn";
import { getPets } from "../data/pets";

const Pets = () => {
    const { state } = useLocation(); // ✅ jetzt korrekt
    const { pets, setPets } = usePets(); // ✅ jetzt korrekt

    useEffect(() => {
        if (state?.reload) {
            const fetchPets = async () => {
                const data = await getPets();
                setPets(data);
            };
            fetchPets();
        }
    }, [state]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friends</h2>
                <AddPetBtn />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pets.length === 0 ? <div>No pets</div> : <Petlist />}
            </div>
        </div>
    );
};

export default Pets;
