import PetCard from "./PetCard";
import { usePets } from "../context";

const Petlist = ({ limit }) => {
    const { pets } = usePets();
    const displayedPets = limit ? pets.slice(0, limit) : pets;
    return (
        <>
            {displayedPets.map((pet) => (
                <PetCard key={pet._id} id={pet._id} {...pet} />
            ))}
        </>
    );
};

export default Petlist;
