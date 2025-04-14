import { useRems } from "../../context";
import { usePets } from "../../context";
import { useState } from "react";
import { format, isAfter } from "date-fns";
import { toast } from "react-toastify";
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
            toast.success("Reminder updated");
            refreshRems();
        } catch (err) {
            toast.error("Could not update reminder");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRem(rem._id);
            toast.success("Reminder deleted");
            refreshRems();
            setActiveReminder(null); // optional
        } catch (err) {
            toast.error("Could not delete reminder");
        }
    };

    const handleEditSave = async (updatedData) => {
        try {
            if (
                !updatedData.title ||
                !updatedData.category ||
                !updatedData.date
            ) {
                toast.error("Please fill all fields");
                return;
            }

            const cleaned = {
                ...updatedData,
                date: new Date(updatedData.date),
            };

            await updateRem(rem._id, cleaned);
            toast.success("Reminder updated");
            refreshRems();
            setIsEditing(false);
        } catch (err) {
            toast.error("Could not update reminder");
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
                // normale Card anzeigen
                <div className=" p-4 rounded-md cursor-pointer">
                    <div className="flex items-center gap-4 py-2 border-b border-neutral200 text-sm">
                        <input
                            type="radio"
                            checked={rem.status === "done"}
                            readOnly
                            onClick={(e) => {
                                e.stopPropagation(); // verhindert Detail-Öffnung
                                handleStatusToggle(); // ⬅️ das ist alles
                            }}
                            className="radio-btn"
                        />

                        <span className="text-neutral500 w-[120px]">
                            {new Date(rem.date).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                        <span
                            onClick={onClick}
                            className={`font-medium ${
                                rem.status === "done"
                                    ? "line-through text-neutral400"
                                    : "text-neutral900"
                            }`}>
                            {rem.title}
                        </span>

                        <span className="text-xs text-gray-500">
                            {rem.status}
                        </span>
                    </div>

                    {isActive && (
                        <div className="mt-2 text-sm text-gray-700">
                            <p>{rem.notes}</p>
                            <p className="text-xs text-neutral400 italic">
                                {getPetName(rem.petId)}
                            </p>

                            <div className="flex gap-2 mt-2">
                                <button onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>

                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default RemCard;
