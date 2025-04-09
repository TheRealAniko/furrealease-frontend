import AddButton from "../../ui/AddBtn";
import { Eye } from "lucide-react";
import NoteRow from "./NoteRow";

const NoteSection = ({ pet, onOpenModal }) => {
    const notes = pet?.notes || [];
    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-6 ">
                <h3 className="h3-section">Notes & Observations</h3>
                <AddButton onClick={"TODO: Open add"} label="Add" />
            </div>
            {notes.length > 0 ? (
                <>
                    {notes.slice(0, 1).map((note) => (
                        <p key={note._id} className="text-sm text-neutral700">
                            {new Date(note.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                            })}
                            {": "}
                            <NoteRow note={notes[0]} showActions={false} />
                        </p>
                    ))}
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
