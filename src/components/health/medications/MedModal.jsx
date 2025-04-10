import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addMed, deleteMed, updateMed } from "../../../data/pets";
import { baseMed } from "../../../utils/defaults";
import AddBtn from "../../ui/AddBtn";
import MedForm from "./MedForm";
import MedCard from "./MedCard";

const MedModal = ({ pet, onClose, onUpdatePet, openWithAdd = false }) => {
    const meds = pet?.medications || [];

    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);

    const [newMed, setNewMed] = useState({
        ...baseMed,
        startDate: new Date().toISOString().split("T")[0],
    });

    const [editMed, setEditMed] = useState({
        ...baseMed,
        startDate: "", // wird beim Edit initial gesetzt
    });

    // Öffnet Add-Form automatisch, wenn Modal mit Add gestartet wird
    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    // Für Add-Form
    const handleChangeNew = (e) => {
        const { name, value } = e.target;
        setNewMed((prev) => ({ ...prev, [name]: value }));
    };

    // Für Edit-Form
    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditMed((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await addMed(pet._id, newMed);
            setShowAddRow(false);
            setNewMed({
                ...baseMed,
                startDate: new Date().toISOString().split("T")[0],
            });

            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toast.success("New medication created!");
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleUpdate = async (medId) => {
        try {
            await updateMed(pet._id, medId, editMed);
            setEditRowId(null);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toast.success("Medication updated!");
            }
        } catch (err) {
            toast.error("Error while updating medication");
        }
    };

    const handleEditStart = (med) => {
        setEditRowId(med._id);
        setEditMed({
            ...med,
            startDate: med.startDate?.split("T")[0],
            endDate: med.endDate ? med.endDate.split("T")[0] : "",
        });
    };

    const handleDelete = async (medId) => {
        try {
            await deleteMed(pet._id, medId);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toast.success("Medication deleted!");
            }
        } catch (err) {
            toast.error("Error while deleting mediction");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">Medication for {pet.name}</h3>
                    <button
                        onClick={onClose}
                        className="text-greenEyes hover:text-darkGreenEyes text-lg">
                        ✕ close
                    </button>
                </div>

                {/* Add-Button */}
                {!showAddRow && (
                    <div className="flex justify-end ">
                        <AddBtn
                            onClick={() => setShowAddRow(true)}
                            label="Add"
                        />
                    </div>
                )}

                {/* Add-Form */}
                {showAddRow && (
                    <MedForm
                        med={newMed}
                        handleChange={handleChangeNew}
                        onSave={handleSave}
                        onCancel={() => setShowAddRow(false)}
                    />
                )}

                {/* Existing Medications */}
                <div className="grid gap-6 grid-cols-2 mt-4">
                    {meds.map((med) =>
                        editRowId === med._id ? (
                            <MedForm
                                key={med._id}
                                med={editMed}
                                handleChange={handleChangeEdit}
                                onSave={() => handleUpdate(med._id)}
                                onCancel={() => setEditRowId(null)}
                                isEdit={true}
                            />
                        ) : (
                            <MedCard
                                key={med._id}
                                med={med}
                                onEdit={() => handleEditStart(med)}
                                onDelete={handleDelete}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedModal;
