import { useAuth } from "./index.js";
import { useEffect, useState } from "react";
import {
    getPets,
    // getSinglePet,
    // updatePet,
    // createPet,
    // sleepPet,
} from "../data/pets.js";
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
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [user]);

    const refreshPets = async () => {
        try {
            const data = await getPets();
            setPets(data);
        } catch (error) {
            console.error(err);
        }
    };

    return (
        <PetContext.Provider
            value={{
                pets,
                setPets,
                loading,
                refreshPets,
            }}>
            {children}
        </PetContext.Provider>
    );
};

export default PetContextProvider;
