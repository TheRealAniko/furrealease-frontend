import { Cake, Stethoscope, Eye, Pencil } from "lucide-react";
import { Link } from "react-router";

const PetCard = ({ name, birthdate, vetVisits, id, photoUrl }) => {
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
    const lastVetVisit =
        vetVisits.length > 0
            ? new Date(vetVisits.at(-1).date).toLocaleDateString()
            : "no visits yet";

    return (
        <div className="card-container flex gap-8 text-neutral900">
            <div className="">
                <img
                    src={photoUrl}
                    alt={name}
                    className="rounded-full aspect-square object-cover w-52 border border-neutral400"
                />
            </div>
            <div className="flex flex-col justify-between">
                <h2 className="font-medium text-4xl">{name}</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-4 font-light text-base">
                        <Cake className="text-inactive w-6 " /> {age} years
                    </div>
                    <div className="flex items-center gap-4 font-light text-base">
                        <Stethoscope className="text-inactive w-6 " />{" "}
                        {lastVetVisit}
                    </div>
                </div>
                <div className="flex justify-between gap-10 text-greenEyes">
                    <Link key={id} to={`/pets/${id}`}>
                        <button className="flex items-center gap-2 font-light text-base">
                            <Eye className="w-10" />
                            View
                        </button>
                    </Link>

                    <button className="flex items-center gap-2 font-light text-base">
                        <Pencil className="w-10 " />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
