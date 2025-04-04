import { useAuth } from "./index.js";
import { useEffect, useState } from "react";
import {
    getPets,
    // getSinglePet,
    // updatePet,
    // createPet,
    // retirePet,
} from "../data/pets.js";
import { toast } from "react-toastify";
import { PetContext } from "./index.js";

const PetContextProvider = ({ children }) => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        setPets([]);
        const fetchPets = async () => {
            try {
                const data = await getPets();
                setPets(data);
                toast.success("All Pets fetched");
            } catch (error) {
                console.error("Failed to load pets", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [user]);

    return (
        <PetContext.Provider
            value={{
                pets,
                setPets,
                loading,
            }}>
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
