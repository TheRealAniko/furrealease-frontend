import { useParams } from "react-router";
import { getSinglePet } from "../data/pets";
import { useEffect, useState } from "react";
import { CirclePlus, Cake, Stethoscope, Pencil } from "lucide-react";
import PetForm from "../components/PetForm";

const PetDetail = () => {
    const [currPet, setCurrPet] = useState({});
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (!id) return;
        const fetchPet = async () => {
            try {
                const data = await getSinglePet(id);
                setCurrPet(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPet();
    }, [id]);

    const {
        name,
        birthdate,
        photoUrl,
        // species,
        // chipped,
        // chipNumber,
        vetVisits = [],
        // vaccinations = [],
        // medications = [],
        // weightHistory = [],
        // notes = [],
    } = currPet || {};
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
    const lastVetVisit =
        vetVisits.length > 0
            ? new Date(vetVisits.at(-1).date).toLocaleDateString()
            : "no visits yet";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friend {name}</h2>
                <button className="flex items-center gap-2 font-light text-base text-greenEyes">
                    <CirclePlus className="w-5 h-5" />
                    Add a Fur Friend
                </button>
            </div>
            {/* Pet info container */}
            <div className="card-container flex gap-28 ">
                <div className="">
                    {/* Image left */}
                    <img
                        src={photoUrl}
                        alt={name}
                        className="rounded-full aspect-square object-cover w-80 border border-neutral400"
                    />
                </div>
                {/* Infos right */}
                <div className="flex flex-col justify-between w-full">
                    <button className="flex items-center gap-2 font-light text-base text-greenEyes justify-end">
                        <Pencil className="w-5 h-5" />
                        Edit Information
                    </button>
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
                    <div>
                        <p className=" text-lg text-neutral700">
                            {name} is doing great! 🐾{" "}
                            {!lastVetVisit ? (
                                <span>
                                    Last check-up was {lastVetVisit} months ago.
                                </span>
                            ) : (
                                <span className="px-4">
                                    Time for a check-up or nail trim?
                                </span>
                            )}{" "}
                            <button className="btn btn-primary self-center">
                                Set a reminder
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-10">
                <div className="card-container bg-neutral200 flex justify-between items-center">
                    Health Tracker
                </div>
                <div className="card-container bg-neutral200 flex justify-between items-center">
                    Vet Visits
                </div>
                <div className="card-container bg-neutral200 flex justify-between items-center">
                    Weight History
                </div>
                <div className="card-container bg-neutral200 flex justify-between items-center">
                    Notes / Observations
                </div>
            </div>
            <PetForm />
        </div>
    );
};

export default PetDetail;
