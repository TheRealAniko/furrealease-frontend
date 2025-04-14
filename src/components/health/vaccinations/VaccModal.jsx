import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../../../utils/toastHelper.js";
import { addVacc, deleteVacc, updateVacc } from "../../../data/pets";
import { baseVacc } from "../../../utils/defaults";
import AddBtn from "../../ui/AddBtn";
import VaccCard from "./VaccCard";
import VaccForm from "./VaccForm";

const VaccModal = ({ pet, onClose, onUpdatePet, openWithAdd = false }) => {
    const vaccinations = pet?.vaccinations || [];

    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);

    const [newVacc, setNewVacc] = useState({
        ...baseVacc,
        date: new Date().toISOString().split("T")[0],
    });
    const [editVacc, setEditVacc] = useState({
        ...baseVacc,
        date: "", // wird beim Edit initial gesetzt
    });

    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    // Für Add-Form
    const handleChangeNew = (e) => {
        const { name, value } = e.target;
        setNewVacc((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditVacc((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await addVacc(pet._id, newVacc);
            setShowAddRow(false);
            setNewVacc({
                ...baseVacc,
                date: new Date().toISOString().split("T")[0],
            });

            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toastSuccess("New vaccination created!");
            }
        } catch (err) {
            toastError(err.message || "Error while creating vaccination");
        }
    };

    const handleUpdate = async (vaccId) => {
        try {
            await updateVacc(pet._id, vaccId, editVacc);
            setEditRowId(null);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toastSuccess("Vaccination updated!");
            }
        } catch (err) {
            toastError(err.message || "Error while updating vaccination");
        }
    };

    const handleEditStart = (vacc) => {
        setEditRowId(vacc._id);
        setEditVacc({
            ...vacc,
            date: vacc.date?.split("T")[0],
        });
    };

    const handleDelete = async (vaccId) => {
        try {
            await deleteVacc(pet._id, vaccId);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toastSuccess("Vaccination deleted!");
            }
        } catch (err) {
            toastError(err.message || "Error while deleting vaccination");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">Vaccination: {pet.name}</h3>
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
                    <VaccForm
                        vacc={newVacc}
                        handleChange={handleChangeNew}
                        onSave={handleSave}
                        onCancel={() => setShowAddRow(false)}
                    />
                )}

                {/* Existing Vaccination */}
                <div className="grid gap-6 grid-cols-2 mt-4">
                    {vaccinations.map((vacc) =>
                        editRowId === vacc._id ? (
                            <VaccForm
                                key={vacc._id}
                                vacc={editVacc}
                                handleChange={handleChangeEdit}
                                onSave={() => handleUpdate(vacc._id)}
                                onCancel={() => setEditRowId(null)}
                                isEdit={true}
                            />
                        ) : (
                            <VaccCard
                                key={vacc._id}
                                vacc={vacc}
                                onEdit={() => handleEditStart(vacc)}
                                onDelete={handleDelete}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default VaccModal;
