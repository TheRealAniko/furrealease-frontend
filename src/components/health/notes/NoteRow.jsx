import { Pencil, Trash2, NotebookPen } from "lucide-react";

const NoteRow = ({ note, showActions, onEdit, onDelete }) => {
    return (
        <tr className="overflow-hidden">
            <td className="flex gap-4">{note.note}</td>
            <td>{note.category}</td>
            <td className="whitespace-nowrap">
                {note.date
                    ? new Date(note.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                      })
                    : "No date"}
            </td>
            {showActions && (
                <>
                    <td>
                        <button
                            onClick={() => onEdit(note)}
                            className="btn-icon">
                            <Pencil className="w-5 h-5" />
                            <span className="hidden md:flex">Edit</span>
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="btn-icon text-error hover:text-[#A24140]">
                            <Trash2 className="w-5 h-5" />{" "}
                            <span className="hidden md:flex">Delete</span>
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default NoteRow;
