import PetCard from "./PetCard";
import { usePets } from "../context";

const Petlist = () => {
    const { pets } = usePets();
    return (
        <>
            {pets.map((pet) => (
                <PetCard key={pet._id} {...pet} />
            ))}
        </>
    );
};

export default Petlist;
