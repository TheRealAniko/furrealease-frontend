import { Cake, Stethoscope, Eye, Pencil } from "lucide-react";

const PetCard = ({ name, birthdate, vetVisits }) => {
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
    const lastVetVisit =
        vetVisits.length > 0
            ? new Date(vetVisits.at(-1).date).toLocaleDateString()
            : "no visits yet";

    return (
        <div className="card-container flex gap-8 text-neutral900">
            <div className="">
                <img
                    src="https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029"
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
                    <div className="flex items-center gap-2 font-light text-base">
                        <Eye className=" w-10 " />
                        View
                    </div>
                    <div className="flex items-center gap-2 font-light text-base">
                        <Pencil className="w-10 " />
                        Edit
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
