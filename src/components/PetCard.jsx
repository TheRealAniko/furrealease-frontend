import { Cake, Stethoscope, Eye, Pencil, Mars, Venus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import PetProfilImg from "./PetProfileImg.jsx";
import { formatAge } from "../utils/formatAge.js";

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
        <div className="card-container flex gap-8 text-neutral900">
            <div className="">
                <PetProfilImg
                    photoUrl={photoUrl}
                    species={species}
                    size="w-52"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h2 className="font-medium text-4xl">
                    {name}
                    {sex === "male" ? (
                        <Mars className="inline pl-4 w-10 text-inactive" />
                    ) : sex === "female" ? (
                        <Venus className="inline pl-4 w-10 text-inactive" />
                    ) : null}
                </h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-4 font-light text-base">
                        <Cake className="text-inactive w-6 " />
                        <span>{formatAge(birthdate)}</span>
                    </div>
                    <div className="flex items-center gap-4 font-light text-base">
                        <Stethoscope className="text-inactive w-6 " />{" "}
                        {lastVetVisit}
                    </div>
                </div>
                <div className="flex justify-between gap-10 text-greenEyes">
                    <Link key={id} to={`/pets/${id}`}>
                        <button className="btn-icon">
                            <Eye className="w-10" />
                            View
                        </button>
                    </Link>

                    <button
                        onClick={() => navigate(`/pets/edit-pet/${id}`)}
                        className="btn-icon">
                        <Pencil className="w-10 " />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
