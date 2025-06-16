import { Pencil, Trash2, Circle } from "lucide-react";
import { formatDate, getDueDate } from "../../../utils/formateDate";

const VisitCard = ({
    visit,
    weightHistory,
    vaccinations,
    medications,
    onEdit,
    onDelete,
}) => {
    const linkedWeight = weightHistory?.find(
        (entry) =>
            entry._id === visit.weightRef ||
            entry._id?.toString() === visit.weightRef
    );

    const linkedMed = medications?.find(
        (entry) =>
            entry._id === visit.medicationRef ||
            entry._id?.toString() === visit.medicationRef
    );

    const linkedVax = vaccinations?.find(
        (entry) =>
            entry._id === visit.vaccinationRef ||
            entry._id?.toString() === visit.vaccinationRef
    );

    return (
        <div className="bg-neutral100 rounded-md border border-neutral400 flex flex-col h-full">
            <div className="inner-head flex justify-between items-center ">
                <div>{visit.reason}</div>
                <span className="text-xs">{formatDate(visit.date)}</span>
            </div>
            <div className="inner-body space-y-1">
                <div className="flex justify-between items-center gap-2"></div>
                {visit.vet && (
                    <div>
                        <span className="font-medium pr-2">Vet:</span>{" "}
                        {visit.vet}
                    </div>
                )}
                {visit.notes && (
                    <div>
                        <span className="font-medium pr-2">Note:</span>
                        {visit.notes}
                    </div>
                )}
                {linkedWeight && (
                    <div>
                        <span className="font-medium pr-2">Weight:</span>{" "}
                        {linkedWeight.weight} kg
                    </div>
                )}
                {linkedMed && (
                    <div>
                        <span className="font-medium pr-2">Treatment:</span>{" "}
                        {linkedMed.name}
                    </div>
                )}
                {linkedVax && (
                    <div>
                        <span className="font-medium pr-2">Vaccine:</span>{" "}
                        {linkedVax.name}
                    </div>
                )}
            </div>
            <div className="flex-grow" />{" "}
            {/* <-- Spacer schiebt den Button runter */}
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
