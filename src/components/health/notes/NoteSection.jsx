import AddButton from "../../ui/AddBtn";
import { Eye } from "lucide-react";
import NoteRow from "./NoteRow";

const NoteSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const notes = pet?.notes || [];

    const notesSorted = [...(pet?.notes || [])].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0); // ganz alt
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });
    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-6 ">
                <h3 className="h3-section">Notes & Observations</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>
            {notes.length > 0 ? (
                <>
                    <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                        <thead className="table-head">
                            <tr className="overflow-hidden">
                                <th>Notes & Observations</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {notesSorted.slice(0, 2).map((note) => (
                                <NoteRow
                                    key={note._id}
                                    note={note}
                                    showActions={false}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                        <button onClick={onOpenModal} className="btn-icon">
                            <Eye className="w-5 h-5" />
                            View All Entries
                        </button>
                    </div>{" "}
                </>
            ) : (
                <p className="text-neutral700 italic">
                    No notes or observations yet
                </p>
            )}
        </div>
    );
};

export default NoteSection;
