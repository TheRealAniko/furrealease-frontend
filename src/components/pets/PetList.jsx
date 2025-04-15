import PetCard from "./PetCard";
import { usePets } from "../../context";

const Petlist = ({ limit }) => {
    const { pets } = usePets();
    const activePets = pets.filter((pet) => pet.status !== "sleeping");
    const displayedPets = limit ? activePets.slice(0, limit) : activePets;
    return (
        <>
            {displayedPets
                .slice()
                .reverse()
                .map((pet) => (
                    <PetCard key={pet._id} id={pet._id} {...pet} />
                ))}
        </>
    );
};

export default Petlist;
