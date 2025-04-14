import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { createRem, deleteRem, updateRem } from "../../data/rem";
import { baseRem } from "../../utils/defaults";
import { useRems } from "../../context";
import AddBtn from "../ui/AddBtn";
import RemForm from "./RemForm";
import RemCard from "./RemCard";

const RemModal = ({ onClose, selectedDate, openWithAdd = false }) => {
    const { rems, refreshRems } = useRems();

    const defaultDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

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
        <div>
            <div className="absolute top-0 left-0 w-full h-full bg-white shadow-lg z-50 p-6 rounded-md overflow-y-auto max-h-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="h3-section">
                        Add Reminder for{" "}
                        {selectedDate
                            ? format(selectedDate, "dd MMMM yyyy")
                            : "today"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-greenEyes hover:text-darkGreenEyes text-lg">
                        ✕ close
                    </button>
                </div>
                {openWithAdd && (
                    <RemForm
                        onSave={() => {
                            refreshRems();
                            onClose();
                        }}
                        onCancel={onClose}
                        selectedDate={selectedDate}
                        isEdit={false}
                    />
                )}
            </div>
        </div>
    );
};

export default RemModal;
