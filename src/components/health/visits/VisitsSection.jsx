import AddButton from "../../ui/AddBtn";
import { Eye, Circle, Hospital } from "lucide-react";
import { formatDate } from "../../../utils/formateDate";

const VisitsSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const vetVisits = pet?.vetVisits || [];

    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="h3-section">Vet Visits</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>
            {vetVisits.length > 0 ? (
                <>
                    <div className="space-y-2">
                        <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                            <thead className="table-head">
                                <tr className="overflow-hidden">
                                    <th>Reason</th>
                                    <th>Date</th>
                                    <th>Vet</th>
                                </tr>
                            </thead>

                            <tbody className="table-body">
                                {vetVisits.slice(0, 2).map((visit) => (
                                    <tr
                                        key={visit._id}
                                        className="bg-neutral100 rounded-md border border-neutral400 overflow-hidden">
                                        <td className="flex gap-4">
                                            <Hospital className="text-inactive w-6 " />
                                            {visit.reason}
                                        </td>
                                        <td>{formatDate(visit.date)}</td>
                                        <td>{visit.vet}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button onClick={onOpenModal} className="btn-icon">
                            <Eye className="w-5 h-5" />
                            View All
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-neutral700 italic">
                    No vet visits recorded for {pet.name}
                </p>
            )}
        </div>
    );
};

export default VisitsSection;
