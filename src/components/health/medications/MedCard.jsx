import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/formateDate";

const MedCard = ({ med, onEdit, onDelete }) => {
    return (
        <div className="bg-neutral100 rounded-md border border-neutral400">
            <div className="inner-head flex justify-between items-center ">
                <div>{med.name}</div>
                <span className="text-xs">
                    {formatDate(med.startDate)} →{" "}
                    {med.endDate ? formatDate(med.endDate) : "ongoing"}
                </span>
            </div>
            <div className="inner-body space-y-1">
                <p>
                    <span className="font-medium">Reason:</span>{" "}
                    {med.reason || "-"}
                </p>
                <p>
                    <span className="font-medium">Dosage:</span>{" "}
                    {med.dosage || "-"}
                </p>
                <p>
                    <span className="font-medium">How to give:</span>{" "}
                    {med.route}
                </p>
                {med.comment && (
                    <p className="italic text-neutral600">{med.comment}</p>
                )}
            </div>
            <div className="flex justify-end gap-10 text-greenEyes px-4 pb-4">
                <button onClick={() => onEdit(med)} className="btn-icon">
                    <Pencil className="w-5 h-5" />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(med._id)}
                    className="btn-icon text-error hover:text-[#A24140]">
                    <Trash2 className="w-5 h-5" /> Delete
                </button>
            </div>
        </div>
    );
};

export default MedCard;
