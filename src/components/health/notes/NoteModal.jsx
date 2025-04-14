import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "../../../utils/toastHelper";
import { toast } from "react-toastify";
import { addNote, deleteNote, updateNote } from "../../../data/pets";
import NoteRow from "./NoteRow";
import { Pencil, Trash2, Save, X } from "lucide-react";
import AddBtn from "../../ui/AddBtn";

const NoteModal = ({ pet, onClose, onUpdatePet, openWithAdd = false }) => {
    const notes = pet?.notes || [];
    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);
    const [editedNote, setEditedNote] = useState({
        note: "",
        category: "",
        date: "",
    });
    const [newNote, setNewNote] = useState({
        note: "",
        category: "",
        date: new Date().toISOString().split("T")[0], // default: heute
    });

    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await addNote(pet._id, newNote);
            setShowAddRow(false);
            setNewNote({
                note: "",
                category: "",
                date: new Date().toISOString().split("T")[0],
            });

            // Refetch (du brauchst dafür ein prop!)
            if (typeof onUpdatePet === "function") {
                await onUpdatePet();
                toastSuccess("New note created!");
            }
        } catch (err) {
            toastError(err.message || "Error while updating note");
        }
    };

    const handleDelete = async (noteId) => {
        try {
            await deleteNote(pet._id, noteId);
            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toastSuccess("Note deleted!");
            }
        } catch (err) {
            toastError(err.message || "Error while deleting note");
        }
    };

    const handleUpdate = async (noteId) => {
        try {
            await updateNote(pet._id, noteId, editedNote);
            setEditRowId(null);

            if (typeof onUpdatePet === "function") {
                await onUpdatePet(); // Re-fetch daten
                toastSuccess("Note updated!");
            }
        } catch (err) {
            toastError(err.message || "Error while updating note");
        }
    };

    const notesSorted = [...(pet?.notes || [])].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0); // ganz alt
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">Notes & Observations</h3>
                    <button
                        onClick={onClose}
                        className="text-greenEyes hover:text-darkGreenEyes text-lg">
                        ✕ close
                    </button>
                </div>
                {!showAddRow && (
                    <div className="flex justify-end ">
                        <AddBtn
                            onClick={() => setShowAddRow(true)}
                            label="Add"
                        />
                    </div>
                )}

                <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                    <thead className="table-head">
                        <tr className="overflow-hidden">
                            <th>Notes & Observations</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className="table-body">
                        {showAddRow && (
                            <tr>
                                <td>
                                    <textarea
                                        name="note"
                                        value={newNote.note}
                                        onChange={handleChange}
                                        className="textarea w-full text-sm"
                                        placeholder="Enter your note"
                                        rows={2}
                                    />
                                </td>
                                <td>
                                    <label className="input flex items-center gap-2">
                                        <select
                                            name="category"
                                            value={newNote.category}
                                            onChange={handleChange}
                                            className="grow font-light text-base">
                                            <option value="" disabled>
                                                Select a category
                                            </option>
                                            <option value="Symptom">
                                                Symptom
                                            </option>
                                            <option value="Behavior">
                                                Behavior
                                            </option>
                                            <option value="Feeding">
                                                Feeding
                                            </option>
                                            <option value="Sleep">Sleep</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </label>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newNote.date}
                                        onChange={handleChange}
                                        className="input input-bordered w-full text-sm"
                                    />
                                </td>
                                <td>
                                    {" "}
                                    <button
                                        onClick={handleSave}
                                        className="btn-icon">
                                        <Save className="w-5 h-5" /> Save
                                    </button>
                                </td>
                                <td>
                                    {" "}
                                    <button
                                        onClick={() => setShowAddRow(false)}
                                        className="btn-icon  text-error hover:text-[#A24140]">
                                        <X className="w-5 h-5" /> Cancel
                                    </button>
                                </td>
                            </tr>
                        )}
                        {notesSorted.map((note) =>
                            editRowId === note._id ? (
                                <tr key={note._id}>
                                    <td>
                                        <textarea
                                            name="note"
                                            value={editedNote.note}
                                            onChange={(e) =>
                                                setEditedNote((prev) => ({
                                                    ...prev,
                                                    note: e.target.value,
                                                }))
                                            }
                                            className="textarea w-full text-sm"
                                            rows={2}
                                        />
                                    </td>
                                    <td>
                                        <label className="input flex items-center gap-2">
                                            <select
                                                name="category"
                                                value={editedNote.category}
                                                onChange={(e) =>
                                                    setEditedNote((prev) => ({
                                                        ...prev,
                                                        category:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="select select-bordered w-full text-sm">
                                                <option value="" disabled>
                                                    Select a category
                                                </option>
                                                <option value="Symptom">
                                                    Symptom
                                                </option>
                                                <option value="Behavior">
                                                    Behavior
                                                </option>
                                                <option value="Feeding">
                                                    Feeding
                                                </option>
                                                <option value="Sleep">
                                                    Sleep
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="date"
                                            value={editedNote.date}
                                            onChange={(e) =>
                                                setEditedNote((prev) => ({
                                                    ...prev,
                                                    date: e.target.value,
                                                }))
                                            }
                                            className="input input-bordered w-full text-sm"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleUpdate(note._id)
                                            }
                                            className="btn-icon">
                                            <Save className="w-5 h-5" /> Save
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => setEditRowId(null)}
                                            className="btn-icon text-error hover:text-[#A24140]">
                                            <X className="w-5 h-5" /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <NoteRow
                                    key={note._id}
                                    note={note}
                                    showActions={true}
                                    onEdit={(note) => {
                                        setEditRowId(note._id);
                                        setEditedNote({
                                            note: note.note,
                                            category: note.category,
                                            date: note.date
                                                ? new Date(note.date)
                                                      .toISOString()
                                                      .split("T")[0]
                                                : "",
                                        });
                                    }}
                                    onDelete={handleDelete}
                                />
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoteModal;
