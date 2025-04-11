import { Pencil, Trash2, Circle } from "lucide-react";
import { formatDate, getDueDate } from "../../../utils/formateDate";
import { getVaccinationStatus } from "../../../utils/vaccStatus";

const VaccCard = ({ vacc, onEdit, onDelete }) => {
    const statusClass = {
        fresh: "text-success fill-success",
        dueSoon: "text-warning fill-warning",
        overdue: "text-error fill-error",
    };
    return (
        <div className="bg-neutral100 rounded-md border border-neutral400">
            <div className="inner-head flex justify-between items-center ">
                <div>{vacc.name}</div>
                <span className="text-xs">{formatDate(vacc.date)}</span>
            </div>

            <div className="inner-body space-y-1">
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <span className="font-medium">Due date:</span>{" "}
                        {formatDate(getDueDate(vacc))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle
                            className={`w-3 h-3 ${
                                statusClass[getVaccinationStatus(vacc)]
                            }`}
                        />
                        <span className="text-neutral900">
                            {getVaccinationStatus(vacc)}
                        </span>
                    </div>
                </div>
                <div>
                    <span className="font-medium">Vet:</span> {vacc.vet}
                </div>
                {vacc.comment && (
                    <div className="italic text-neutral600">{vacc.comment}</div>
                )}
            </div>
            <div className="flex justify-end gap-10 text-greenEyes px-4 pb-4">
                <button onClick={() => onEdit(vacc)} className="btn-icon">
                    <Pencil className="w-5 h-5" />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(vacc._id)}
                    className="btn-icon text-error hover:text-[#A24140]">
                    <Trash2 className="w-5 h-5" /> Delete
                </button>
            </div>
        </div>
    );
};

export default VaccCard;
