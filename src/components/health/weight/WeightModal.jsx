import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../../../utils/toastHelper.js";
import {
    addWeightEntry,
    deleteWeightEntry,
    updateWeightEntry,
} from "../../../data/pets";
import WeightChartMini from "./WeightChartMini";
import { Pencil, Trash2, Save, X } from "lucide-react";
import AddBtn from "../../ui/AddBtn";
import WeightForm from "../weight/WeightForm";

const WeightModal = ({ pet, onClose, onUpdatePet, openWithAdd = false }) => {
    const weightHistory = pet?.weightHistory || [];
    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);
    const [editedEntry, setEditedEntry] = useState({ weight: "", date: "" });

    const [newEntry, setNewEntry] = useState({
        weight: "",
        date: new Date().toISOString().split("T")[0], // default: heute
    });

    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditedEntry((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = async () => {
        try {
            await addWeightEntry(pet._id, newEntry);
            setShowAddRow(false);
            setNewEntry({
                weight: "",
                date: new Date().toISOString().split("T")[0],
            });

            // Refetch (du brauchst dafür ein prop!)
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toastSuccess("New weight entry created!");
            }
        } catch (err) {
            toastError(err.message || "Error while creating weight entry");
        }
    };
    const handleDelete = async (weightId) => {
        try {
            await deleteWeightEntry(pet._id, weightId);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toastSuccess("Weight entry deleted!");
            }
        } catch (err) {
            toastError(err.message || "Error while deleting entry");
        }
    };
    const handleUpdate = async (weightId) => {
        try {
            await updateWeightEntry(pet._id, weightId, editedEntry);
            setEditRowId(null);

            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toastSuccess("Weight entry updated!");
            }
        } catch (err) {
            toastError(err.message || "Error while updating entry");
        }
    };

    const weightHistorySorted = [...(pet?.weightHistory || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">Weight History: {pet.name}</h3>
                    <button
                        onClick={onClose}
                        className="text-greenEyes hover:text-darkGreenEyes text-lg">
                        ✕ close
                    </button>
                </div>
                {weightHistory.length > 0 && (
                    <WeightChartMini weightHistory={weightHistory} />
                )}
                {!showAddRow && (
                    <div className="flex justify-end ">
                        <AddBtn
                            onClick={() => setShowAddRow(true)}
                            label="Add Weight"
                        />
                    </div>
                )}

                {showAddRow && (
                    <WeightForm
                        formData={newEntry}
                        setFormData={setNewEntry}
                        onSave={handleSave}
                        onCancel={() => setShowAddRow(false)}
                    />
                )}
                <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                    <thead className="table-head">
                        <tr className="overflow-hidden">
                            <th>Weight</th>
                            <th>Date</th>
                            <th>Change</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {weightHistorySorted.map((entry, index) => {
                            const prev = weightHistorySorted[index + 1];
                            const diff = prev
                                ? (entry.weight - prev.weight).toFixed(1)
                                : null;

                            const isEditing = editRowId === entry._id;

                            if (isEditing) {
                                return (
                                    <tr key={entry._id}>
                                        <td colSpan={5}>
                                            <WeightForm
                                                formData={editedEntry}
                                                setFormData={setEditedEntry}
                                                onSave={() =>
                                                    handleUpdate(entry._id)
                                                }
                                                onCancel={() =>
                                                    setEditRowId(null)
                                                }
                                                isEdit
                                            />
                                        </td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={entry._id} className="overflow-hidden">
                                    <td>{entry.weight} kg</td>
                                    <td>
                                        {new Date(
                                            entry.date
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        {diff !== null
                                            ? `${diff > 0 ? "+" : ""}${diff} kg`
                                            : "—"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setEditRowId(entry._id);
                                                setEditedEntry({
                                                    weight: entry.weight,
                                                    date: new Date(entry.date)
                                                        .toISOString()
                                                        .split("T")[0],
                                                });
                                            }}
                                            className="btn-icon">
                                            <Pencil className="w-5 h-5" />
                                            <span className="hidden md:flex">
                                                Edit
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(entry._id)
                                            }
                                            className="btn-icon text-error hover:text-[#A24140]">
                                            <Trash2 className="w-5 h-5" />
                                            <span className="hidden md:flex">
                                                Delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeightModal;
