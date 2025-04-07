import { Undo2, Mars, Venus, Cake, Rainbow } from "lucide-react"; // oder ein anderes Icon
import PetProfilImg from "./PetProfileImg";
import { formatAge } from "../utils/formatAge.js";

const SleepingPetCard = ({
    _id,
    name,
    birthdate,
    sex,
    photoUrl,
    species,
    onActivate,
    sleepingSince,
}) => {
    const handleUnsleep = async (id) => {
        try {
            await unsleepPet(id);
            toast.success("Welcome back 💚");
            // evtl. pets neu laden / context updaten
        } catch (err) {
            toast.error("Could not bring pet back");
            console.error(err);
        }
    };

    return (
        <div className="card-container flex gap-8 text-neutral900">
            <div className="">
                <PetProfilImg
                    photoUrl={photoUrl}
                    species={species}
                    size="w-52"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className="font-medium text-4xl">
                    {name}{" "}
                    {sex === "male" ? (
                        <Mars className="inline pl-4 w-10 text-inactive" />
                    ) : sex === "female" ? (
                        <Venus className="inline pl-4 w-10 text-inactive" />
                    ) : null}
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-4 font-light text-base">
                        <Cake className="text-inactive w-6 " />
                        <span>{formatAge(birthdate)}</span>
                    </div>
                    <div className="flex items-center gap-4 font-light text-base">
                        <Rainbow className="text-inactive w-6 " /> Since{" "}
                        {new Date(sleepingSince).toLocaleDateString()}
                    </div>
                </div>
                <button className="btn-icon" onClick={() => onActivate(_id)}>
                    <Undo2 className="w-4 h-4" />
                    Wake up
                </button>
            </div>
        </div>
    );
};

export default SleepingPetCard;
