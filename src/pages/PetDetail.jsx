import { useParams, useNavigate } from "react-router";
import { getSinglePet } from "../data/pets";
import { useEffect, useState } from "react";
import {
    Mars,
    Venus,
    Cake,
    Stethoscope,
    Pencil,
    Dna,
    Wrench,
    Microchip,
} from "lucide-react";
import AddPetBtn from "../components/pets/AddPetBtn.jsx";
import PetProfilImg from "../components/pets/PetProfileImg.jsx";
import { formatAge } from "../utils/formatAge.js";
import WeightCard from "../components/health/weight/WeightCard.jsx";
import AddButton from "../components/ui/AddBtn.jsx";
import WeightSection from "../components/health/weight/WeightSection.jsx";

const PetDetail = () => {
    const [currPet, setCurrPet] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
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
        species,
        sex,
        breed,
        intact,
        // chipped,
        chipNumber,
        vetVisits = [],
        // vaccinations = [],
        // medications = [],
        weightHistory = [],
        // notes = [],
    } = currPet || {};

    const lastVetVisit =
        vetVisits.length > 0
            ? new Date(vetVisits.at(-1).date).toLocaleDateString()
            : "No visits yet";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friend {name}</h2>
                <AddPetBtn />
            </div>
            {/* Pet info container */}
            <div className="card-container flex gap-28 ">
                <div className="">
                    {/* Image left */}
                    <PetProfilImg
                        photoUrl={photoUrl}
                        species={species}
                        size="w-80"
                    />
                </div>
                {/* Infos right */}
                <div className="flex flex-col justify-between w-full">
                    <button
                        onClick={() => navigate(`/pets/edit-pet/${id}`)}
                        className="flex items-center gap-2 font-light text-base text-greenEyes justify-end">
                        <Pencil className="w-5 h-5" />
                        Edit Information
                    </button>
                    <h2 className="font-medium text-4xl">
                        {name}{" "}
                        {sex === "male" ? (
                            <Mars className="inline pl-4 w-10 text-inactive" />
                        ) : sex === "female" ? (
                            <Venus className="inline pl-4 w-10 text-inactive" />
                        ) : null}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 font-light text-base">
                            <Cake className="text-inactive w-6 " />
                            <span>{formatAge(birthdate)}</span>
                        </div>
                        <div className="flex items-center gap-4 font-light text-base">
                            <Stethoscope className="text-inactive w-6 " />{" "}
                            {lastVetVisit}
                        </div>
                        <div className="flex items-center gap-4 font-light text-base">
                            <Dna className="text-inactive w-6 " />{" "}
                            {breed || "No breed info"}
                        </div>
                        <div className="flex items-center gap-4 font-light text-base">
                            <Wrench className="text-inactive w-6 " />{" "}
                            {intact === "intact"
                                ? "Not neutered (intact)"
                                : intact === "neutered"
                                ? "Spayed / Neutered"
                                : "No info about neutering"}
                        </div>
                        <div className="flex items-center gap-4 font-light text-base">
                            <Microchip className="text-inactive w-6 " />{" "}
                            {chipNumber || "No chipnumer"}
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

                <WeightSection pet={currPet} />

                <div className="card-container bg-neutral200 flex justify-between items-center">
                    Notes / Observations
                </div>
            </div>
        </div>
    );
};

export default PetDetail;
