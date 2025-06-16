import { CirclePlus } from "lucide-react";

const AddRemBtn = () => {
    return (
        <>
            <button
                onClick={() => {
                    setOpenWithAdd(true);
                    setShowRemModal(true);
                    console.log("hello");
                }}
                className="btn-icon">
                <CirclePlus className="w-5 h-5" />
                Add Reminder
            </button>
        </>
    );
};

export default AddRemBtn;
