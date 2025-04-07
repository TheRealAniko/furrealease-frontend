import { Cat, Dog, Rabbit, PawPrint } from "lucide-react";

const speciesIcons = {
    cat: <Cat className="w-2/3 h-2/3 stroke-neutral100 stroke-1" />,
    dog: <Dog className="w-2/3 h-2/3 stroke-neutral100 stroke-1" />,
    small_mammal: <Rabbit className="w-2/3 h-2/3 stroke-neutral100 stroke-1" />,
    other: <PawPrint className="w-2/3 h-2/3 stroke-neutral100 stroke-1" />,
};

const PetProfilImg = ({ photoUrl, species = "other", size = "w-80" }) => {
    const fallback = speciesIcons[species.toLowerCase()] || speciesIcons.other;

    return (
        <div
            className={`rounded-full aspect-square flex items-center justify-center bg-primary border border-neutral200 ${size}`}>
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt="Pet profile"
                    className="rounded-full w-full h-full object-cover"
                />
            ) : (
                fallback
            )}
        </div>
    );
};

export default PetProfilImg;
