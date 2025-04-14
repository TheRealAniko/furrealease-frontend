import { Pencil, Trash2, Circle } from "lucide-react";
import { formatDate, getDueDate } from "../../../utils/formateDate";

const VisitCard = ({ visit, onEdit, onDelete }) => {
    return (
        <div className="bg-neutral100 rounded-md border border-neutral400">
            <div className="inner-head flex justify-between items-center ">
                <div>{visit.reason}</div>
                <span className="text-xs">{formatDate(visit.date)}</span>
            </div>

            <div className="inner-body space-y-1">
                <div className="flex justify-between items-center gap-2"></div>
                <div>
                    <span className="font-medium">Vet:</span> {visit.vet}
                </div>
                {visit.notes && (
                    <div className="italic text-neutral600">{visit.notes}</div>
                )}
            </div>
            <div className="flex justify-end gap-10 text-greenEyes px-4 pb-4">
                <button onClick={() => onEdit(visit)} className="btn-icon">
                    <Pencil className="w-5 h-5" />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(visit._id)}
                    className="btn-icon text-error hover:text-[#A24140]">
                    <Trash2 className="w-5 h-5" /> Delete
                </button>
            </div>
        </div>
    );
};

export default VisitCard;
