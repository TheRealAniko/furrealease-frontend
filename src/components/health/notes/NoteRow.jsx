const NoteRow = ({ note, showActions, onEdit, onDelete }) => {
    return (
        <tr className="overflow-hidden">
            <td>{note.note}</td>
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
            )}
        </tr>
    );
};

export default NoteRow;
