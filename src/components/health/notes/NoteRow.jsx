const NoteRow = ({ note, showActions, onEdit, onDelete }) => {
    return (
        <tr className="overflow-hidden">
            <td className="whitespace-nowrap text-sm text-neutral700">
                {new Date(note.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })}
            </td>
            <td className="text-sm text-neutral700">{note.category}</td>
            <td className="text-sm text-neutral700">{note.note}</td>
            {showActions ? (
                <>
                    <td>
                        <button
                            onClick={() => onEdit(note)}
                            className="btn-icon">
                            ✏️ Edit
                        </button>
                    </td>
                    <td>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="btn-icon text-error">
                            🗑 Delete
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td></td>
                    <td></td>
                </>
            )}
        </tr>
    );
};

export default NoteRow;
