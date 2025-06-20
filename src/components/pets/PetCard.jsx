import { Cake, Stethoscope, Eye, Pencil, Mars, Venus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import PetProfilImg from "./PetProfileImg.jsx";
import { formatAge } from "../../utils/formatAge.js";

const PetCard = ({
    name,
    birthdate,
    vetVisits,
    id,
    photoUrl,
    species,
    sex,
}) => {
    const lastVetVisit =
        vetVisits.length > 0
            ? new Date(vetVisits.at(-1).date).toLocaleDateString()
            : "no visits yet";
    console.log("Species:", species);
    const navigate = useNavigate();

    return (
        <div className="card-container flex flex-row gap-6 p-4 bg-white rounded-xl shadow-md text-neutral900">
            {/* Bild-Sektion */}
            <div className="sm:basis-1/3 flex justify-center items-center">
                <PetProfilImg
                    photoUrl={photoUrl}
                    species={species}
                    className="w-full  min-w-[100px] max-w-[160px]"
                />
            </div>

            {/* Info-Sektion */}
            <div className="sm:basis-2/3 flex flex-col justify-between gap-4 mt-4 sm:mt-0">
                <h2 className="font-medium text-2xl sm:text-4xl flex items-center gap-4">
                    {name}
                    {sex === "male" && (
                        <Mars className="w-6 sm:w-8 text-inactive" />
                    )}
                    {sex === "female" && (
                        <Venus className="w-6 sm:w-8 text-inactive" />
                    )}
                </h2>

                <div className="space-y-2 font-light text-base">
                    <div className="flex items-center gap-4">
                        <Cake className="text-inactive w-5 sm:w-6" />
                        <span>{formatAge(birthdate)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Stethoscope className="text-inactive w-5 sm:w-6" />
                        <span>{lastVetVisit}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-4 text-greenEyes">
                    <Link key={id} to={`/pets/${id}`}>
                        <button className="btn-icon flex items-center gap-2 w-auto">
                            <Eye className="w-8" />
                            View
                        </button>
                    </Link>
                    <button
                        onClick={() => navigate(`/pets/edit-pet/${id}`)}
                        className="btn-icon flex items-center gap-2 w-auto">
                        <Pencil className="w-8" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
