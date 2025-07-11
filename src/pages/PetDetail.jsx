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
import WeightSection from "../components/health/weight/WeightSection.jsx";
import WeightModal from "../components/health/weight/WeightModal";
import NoteSection from "../components/health/notes/NoteSection.jsx";
import NoteModal from "../components/health/notes/NoteModal.jsx";
import MedSection from "../components/health/medications/MedSection.jsx";
import MedModal from "../components/health/medications/MedModal.jsx";
import VaccSection from "../components/health/vaccinations/VaccSection.jsx";
import VaccModal from "../components/health/vaccinations/VaccModal.jsx";
import VisitsSection from "../components/health/visits/VisitsSection.jsx";
import { formatDate } from "../utils/formateDate.js";
import VisitModal from "../components/health/visits/VisitModal.jsx";
import { useRems } from "../context";
import RemCard from "../components/reminders/RemCard.jsx";
import PetRemSection from "../components/pets/PetRemSection.jsx";

const PetDetail = () => {
    const [currPet, setCurrPet] = useState({});
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [openWeightModalWithAdd, setOpenWeightModalWithAdd] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [openNoteModalWithAdd, setOpenNoteModalWithAdd] = useState(false);
    const [showMedModal, setShowMedModal] = useState(false);
    const [openMedModalWithAdd, setOpenMedModalWithAdd] = useState(false);
    const [showVaccModal, setShowVaccModal] = useState(false);
    const [openVaccModalWithAdd, setOpenVaccModalWithAdd] = useState(false);
    const [showVisitModal, setShowVisitModal] = useState(false);
    const [openVisitModalWithAdd, setOpenVisitModalWithAdd] = useState(false);
    const { rems } = useRems();

    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    const fetchPet = async () => {
        try {
            const data = await getSinglePet(id);
            setCurrPet(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!id) return;
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

    const lastVisit = vetVisits.at(-1);
    const lastVetVisit = formatDate(lastVisit?.date);

    const petRems = rems.filter((r) => r.petId?.toString() === currPet._id);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friend {name}</h2>
                <AddPetBtn />
            </div>
            {/* Pet info container */}
            <div className="card-container flex flex-col sm:flex-row gap-8 ">
                <div className="sm:basis-1/3 flex justify-center items-start">
                    {/* Image left */}
                    <PetProfilImg
                        photoUrl={photoUrl}
                        species={species}
                        className="w-full  min-w-[100px] max-w-[300px]"
                    />
                </div>
                {/* Infos right */}
                <div className="flex flex-col justify-between w-full gap-8">
                    <h2 className="font-medium text-4xl text-center sm:text-left">
                        {name}{" "}
                        {sex === "male" ? (
                            <Mars className="inline pl-4 w-10 text-inactive" />
                        ) : sex === "female" ? (
                            <Venus className="inline pl-4 w-10 text-inactive" />
                        ) : null}
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 font-light text-base">
                            <Cake className="text-inactive w-6 " />
                            <span>{formatAge(birthdate)}</span>
                        </div>
                        <div className="flex items-center gap-4 font-light text-base">
                            <Stethoscope className="text-inactive w-6 " />{" "}
                            {lastVetVisit || "No visits yet"}
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

                    <div className="text-lg text-neutral700 text-center sm:text-left">
                        <span className=" pr-2">{name} is doing great! </span>

                        {!lastVetVisit && <span>Time for a check-up?</span>}
                    </div>
                    <button
                        onClick={() => navigate(`/pets/edit-pet/${id}`)}
                        className="flex items-center gap-2 font-light text-base text-greenEyes justify-end">
                        <Pencil className="w-5 h-5" />
                        <span className="hidden sm:inline">
                            Edit Information
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 fit:grid-cols-2 gap-6">
                <PetRemSection pet={currPet} />

                <VisitsSection
                    pet={currPet}
                    onOpenModal={() => setShowVisitModal(true)}
                    onOpenAddModal={() => {
                        setShowVisitModal(true);
                        setOpenVisitModalWithAdd(true);
                    }}
                />
                <WeightSection
                    pet={currPet}
                    onOpenModal={() => setShowWeightModal(true)}
                    onOpenAddModal={() => {
                        setShowWeightModal(true);
                        setOpenWeightModalWithAdd(true);
                    }}
                />
                <NoteSection
                    pet={currPet}
                    onOpenModal={() => setShowNoteModal(true)}
                    onOpenAddModal={() => {
                        setShowNoteModal(true);
                        setOpenNoteModalWithAdd(true);
                    }}
                />

                <MedSection
                    pet={currPet}
                    onOpenModal={() => setShowMedModal(true)}
                    onOpenAddModal={() => {
                        setShowMedModal(true);
                        setOpenMedModalWithAdd(true);
                    }}
                />
                <VaccSection
                    pet={currPet}
                    onOpenModal={() => setShowVaccModal(true)}
                    onOpenAddModal={() => {
                        setShowVaccModal(true);
                        setOpenVaccModalWithAdd(true);
                    }}
                />

                {showWeightModal && (
                    <WeightModal
                        pet={currPet}
                        onClose={() => {
                            setShowWeightModal(false);
                            setOpenWeightModalWithAdd(false);
                        }}
                        onUpdatePet={fetchPet}
                        openWithAdd={openWeightModalWithAdd}
                    />
                )}

                {showNoteModal && (
                    <NoteModal
                        pet={currPet}
                        onClose={() => {
                            setShowNoteModal(false);
                            setOpenNoteModalWithAdd(false);
                        }}
                        onUpdatePet={fetchPet}
                        openWithAdd={openNoteModalWithAdd}
                    />
                )}

                {showMedModal && (
                    <MedModal
                        pet={currPet}
                        onClose={() => {
                            setShowMedModal(false);
                            setOpenMedModalWithAdd(false);
                        }}
                        onUpdatePet={fetchPet}
                        openWithAdd={openMedModalWithAdd}
                    />
                )}

                {showVaccModal && (
                    <VaccModal
                        pet={currPet}
                        onClose={() => {
                            setShowVaccModal(false);
                            setOpenVaccModalWithAdd(false);
                        }}
                        onUpdatePet={fetchPet}
                        openWithAdd={openVaccModalWithAdd}
                    />
                )}

                {showVisitModal && (
                    <VisitModal
                        pet={currPet}
                        onClose={() => {
                            setShowVisitModal(false);
                            setOpenVisitModalWithAdd(false);
                        }}
                        onUpdatePet={fetchPet}
                        openWithAdd={openVisitModalWithAdd}
                    />
                )}
            </div>
        </div>
    );
};

export default PetDetail;
