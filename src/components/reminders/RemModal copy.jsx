import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createRem, deleteRem, updateRem } from "../../data/rem";
import { baseRem } from "../../utils/defaults";
import { useRems } from "../../context";
import AddBtn from "../ui/AddBtn";
import RemForm from "./RemForm";
import RemCard from "./RemCard";

const RemModal = ({ onClose, openWithAdd = false }) => {
    const { rems, refreshRems } = useRems();

    const [showAddRow, setShowAddRow] = useState(openWithAdd);
    const [editRowId, setEditRowId] = useState(null);

    const [newReminder, setNewReminder] = useState({
        ...baseRem,
        date: new Date().toISOString().split("T")[0],
    });

    const [editReminder, setEditReminder] = useState({
        ...baseRem,
        date: "",
    });

    useEffect(() => {
        if (openWithAdd) setShowAddRow(true);
    }, [openWithAdd]);

    const handleChangeNew = (e) => {
        const { name, value } = e.target;
        setNewReminder((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditReminder((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (!newReminder.category) {
                toast.error("Please select a category.");
                return;
            }
            await createRem(newReminder);
            toast.success("Reminder created!");
            refreshRems();
            setShowAddRow(false);
            setNewReminder({
                ...baseReminder,
                date: new Date().toISOString().split("T")[0],
            });
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleUpdate = async (remId) => {
        try {
            await updateRem(remId, editReminder);
            toast.success("Reminder updated!");
            refreshRems();
            setEditRowId(null);
        } catch (err) {
            toast.error("Error while updating reminder");
        }
    };

    const handleEditStart = (rem) => {
        setEditRowId(rem._id);
        setEditReminder({
            ...rem,
            date: rem.date?.split("T")[0],
        });
    };

    const handleDelete = async (remId) => {
        try {
            await deleteRem(remId);
            toast.success("Reminder deleted!");
            refreshRems();
        } catch (err) {
            toast.error("Error while deleting reminder");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">Reminders</h3>
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
                            label="Add Reminder"
                        />
                    </div>
                )}

                {showAddRow && (
                    <RemForm
                        reminder={newReminder}
                        handleChange={handleChangeNew}
                        onSave={handleSave}
                        onCancel={() => setShowAddRow(false)}
                    />
                )}

                <div className="grid gap-6 grid-cols-2 mt-4">
                    {rems.map((rem) =>
                        editRowId === rem._id ? (
                            <RemForm
                                key={rem._id}
                                reminder={editReminder}
                                handleChange={handleChangeEdit}
                                onSave={() => handleUpdate(rem._id)}
                                onCancel={() => setEditRowId(null)}
                                isEdit={true}
                            />
                        ) : (
                            <RemCard
                                key={rem._id}
                                rem={rem}
                                onEdit={() => handleEditStart(rem)}
                                onDelete={() => handleDelete(rem._id)}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemModal;
