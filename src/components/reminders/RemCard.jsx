import { useRems } from "../../context";
import { usePets } from "../../context";
import { toastSuccess, toastError } from "../../utils/toastHelper";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { updateRem, deleteRem } from "../../data/rem";
import RemForm from "./RemForm";

const RemCard = ({ rem, isActive, onClick }) => {
    const {
        selectedDate,
        today,
        activeReminder,
        setActiveReminder,
        currentMonth,
        setCurrentMonth,
        refreshRems,
        rems,
    } = useRems();

    const { pets } = usePets();

    const [isEditing, setIsEditing] = useState(false);

    const handleStatusToggle = async () => {
        const updatedStatus = rem.status === "done" ? "pending" : "done";

        try {
            await updateRem(rem._id, { status: updatedStatus });
            toastSuccess("Reminder updated");
            refreshRems();
        } catch (err) {
            toastError(err.message || "Could not update reminder");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRem(rem._id);
            toastSuccess("Reminder deleted");
            refreshRems();
            setActiveReminder(null); // optional
        } catch (err) {
            toastError(err.message || "Could not delete reminder");
        }
    };

    const handleEditSave = async (updatedData) => {
        try {
            if (
                !updatedData.title ||
                !updatedData.category ||
                !updatedData.date
            ) {
                toastError("Please fill all fields");
                return;
            }

            const cleaned = {
                ...updatedData,
                date: new Date(updatedData.date),
            };

            await updateRem(rem._id, cleaned);
            toastSuccess("Reminder updated");
            refreshRems();
            setIsEditing(false);
        } catch (err) {
            toastError(err.message || "Could not update reminder");
        }
    };
    const getPetName = (petId) => {
        const pet = pets?.find((p) => p._id === petId);
        return pet ? pet.name : "Unknown Pet";
    };

    return (
        <>
            {isEditing ? (
                <RemForm
                    defaultValues={rem}
                    onSave={handleEditSave}
                    onCancel={() => setIsEditing(false)}
                    isEdit
                />
            ) : (
                <div className="py-4 border-b border-neutral400">
                    <div className="cursor-pointer flex items-center gap-4">
                        <input
                            type="radio"
                            checked={rem.status === "done"}
                            readOnly
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStatusToggle();
                            }}
                            className="radio-btn"
                        />
                        <div
                            onClick={onClick}
                            className="flex justify-between items-center w-full">
                            <div
                                className={`${
                                    rem.status === "done"
                                        ? "line-through text-neutral400"
                                        : "text-neutral900"
                                }`}>
                                {rem.title}
                            </div>
                            <div className="text-sm text-neutral600 whitespace-nowrap">
                                {new Date(rem.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {isActive && (
                        <>
                            <div className="mt-2 ml-8 flex gap-4">
                                {rem.petId && (
                                    <span className="border border-primary px-4 py-1 text-neutral700 rounded-full text-xs">
                                        {getPetName(rem.petId)}
                                    </span>
                                )}
                                {rem.category && (
                                    <span className="border border-neutral400 px-4 py-1 text-neutral700 rounded-full text-xs">
                                        {rem.category}
                                    </span>
                                )}
                            </div>
                            <div className="mt-2 ml-8 flex gap-4 italic text-neutral700">
                                {rem.notes && <p>{rem.notes}</p>}
                            </div>
                            <div className="flex justify-end gap-10 text-greenEyes px-4 pt-4">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn-icon">
                                    <Pencil className="w-5 h-5" />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn-icon text-error hover:text-[#A24140]">
                                    <Trash2 className="w-5 h-5" />
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default RemCard;
