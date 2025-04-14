import { useState, useEffect } from "react";
import {
    baseVacc,
    baseMed,
    baseVisit,
    baseWeight,
} from "../../../utils/defaults";
import { toast } from "react-toastify";
import {
    addVacc,
    addVisit,
    deleteVisit,
    updateVisit,
    addWeightEntry,
    addMed,
} from "../../../data/pets.js";

import AddBtn from "../../ui/AddBtn";
import VisitForm from "./VisitForm";
import VisitCard from "./VisitCard";

// Hilfsfunktion
const getToday = () => new Date().toISOString().split("T")[0];

const VisitModal = ({ pet, onClose, onUpdatePet, openWithAdd = false }) => {
    const vetVisits = pet?.vetVisits || [];

    const [addVaccEnabled, setAddVaccEnabled] = useState(false);
    const [vaccData, setVaccData] = useState(baseVacc);

    const [addMedEnabled, setAddMedEnabled] = useState(false);
    const [medData, setMedData] = useState({
        ...baseMed,
        startDate: getToday(),
    });

    const [addWeightEnabled, setAddWeightEnabled] = useState(false);
    const [weightData, setWeightData] = useState(baseWeight);

    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);

    const [newVisit, setNewVisit] = useState({
        ...baseVisit,
        date: getToday(),
    });

    const [editVisit, setEditVisit] = useState({
        ...baseVisit,
        date: "",
    });

    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    const handleChangeNew = (e) => {
        const { name, value } = e.target;
        setNewVisit((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditVisit((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const visitToSave = { ...newVisit };

            if (addVaccEnabled) {
                const response = await addVacc(pet._id, vaccData);
                const vaccId =
                    response?.vaccinations?._id || response?.vaccinations?.id;

                console.log("📦 Vacc response full:", response);

                if (!vaccId) throw new Error("No vacc ID returned");
                visitToSave.vaccinationRef = vaccId;
            }

            if (addMedEnabled) {
                console.log("📡 Sende Medikations-Daten:", medData);
                const response = await addMed(pet._id, medData);
                console.log("📦 Medication response full:", response);

                const medId =
                    response?.medications?._id || response?.medications?.id;
                if (!medId) throw new Error("No med ID returned");

                visitToSave.medicationRef = medId;
            }

            if (addWeightEnabled) {
                console.log("📡 Sende Gewichts-Daten:", weightData);
                const response = await addWeightEntry(pet._id, weightData);
                console.log("📦 Weight response full:", response);

                const weightId =
                    response?.weightEntry?._id ||
                    response?.entry?._id ||
                    response?.weight?._id ||
                    response?._id;
                if (!weightId) throw new Error("No weight ID returned");

                visitToSave.weightRef = weightId;
            }
            const visitRes = await addVisit(pet._id, visitToSave);

            // Reset
            setNewVisit({ ...baseVisit, date: getToday() });
            setAddVaccEnabled(false);
            setVaccData(baseVacc);
            setAddMedEnabled(false);
            setMedData({ ...baseMed, startDate: getToday() });
            setAddWeightEnabled(false);
            setWeightData(baseWeight);
            setShowAddRow(false);

            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
            }

            toast.success("Vet visit successfully saved!");
        } catch (err) {
            console.error("🔥 ERROR in handleSave:", err);
            toast.error(err.message || "Fehler beim Speichern der Visit.");
        }
    };

    const handleUpdate = async (visitId) => {
        try {
            await updateVisit(pet._id, visitId, editVisit);
            setEditRowId(null);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toast.success("Vet visit record updated!");
            }
        } catch (err) {
            toast.error("Error while updating vet visit record");
        }
    };

    const handleEditStart = (visit) => {
        setEditRowId(visit._id);
        setEditVisit({
            ...visit,
            date: visit.date?.split("T")[0],
        });
    };

    const handleDelete = async (visitId) => {
        try {
            await deleteVisit(pet._id, visitId);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toast.success("Vet visit record deleted!");
            }
        } catch (err) {
            toast.error("Error while deleting vet visit record");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">
                        Vet visit records: {pet.name}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-greenEyes hover:text-darkGreenEyes text-lg">
                        ✕ close
                    </button>
                </div>

                {!showAddRow && (
                    <div className="flex justify-end">
                        <AddBtn
                            onClick={() => setShowAddRow(true)}
                            label="Add"
                        />
                    </div>
                )}

                {showAddRow && (
                    <VisitForm
                        visit={newVisit}
                        handleChange={handleChangeNew}
                        onSave={handleSave}
                        onCancel={() => setShowAddRow(false)}
                        setAddVacc={setAddVaccEnabled}
                        addVacc={addVaccEnabled}
                        vaccData={vaccData}
                        setVaccData={setVaccData}
                        setAddMed={setAddMedEnabled}
                        addMed={addMedEnabled}
                        medData={medData}
                        setMedData={setMedData}
                        addWeight={addWeightEnabled}
                        setAddWeight={setAddWeightEnabled}
                        weightData={weightData}
                        setWeightData={setWeightData}
                    />
                )}

                <div className="grid gap-6 grid-cols-2 mt-4">
                    {vetVisits.map((visit) =>
                        editRowId === visit._id ? (
                            <VisitForm
                                key={visit._id}
                                visit={editVisit}
                                handleChange={handleChangeEdit}
                                onSave={() => handleUpdate(visit._id)}
                                onCancel={() => setEditRowId(null)}
                                isEdit={true}
                            />
                        ) : (
                            <VisitCard
                                key={visit._id}
                                visit={visit}
                                onEdit={() => handleEditStart(visit)}
                                onDelete={handleDelete}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisitModal;
