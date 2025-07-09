import AddButton from "../../ui/AddBtn";
import { Eye, Syringe, Circle } from "lucide-react";
import { formatDate } from "../../../utils/formateDate";
import { getVaccinationStatus } from "../../../utils/vaccStatus";

const VaccSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const vaccinations = pet?.vaccinations || [];
    const statusClass = {
        fresh: "text-success fill-success",
        dueSoon: "text-warning fill-warning",
        overdue: "text-error fill-error",
    };

    const vaccinationsSorted = [...(pet?.vaccinations || [])].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0); // ganz alt
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    return (
        <div className="card-container flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="h3-section">Vaccination</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>
            {vaccinations.length > 0 ? (
                <>
                    <div className="space-y-2">
                        <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                            <thead className="table-head">
                                <tr className="overflow-hidden">
                                    <th>Vaccine</th>
                                    <th>Last Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {vaccinationsSorted.slice(0, 2).map((vacc) => (
                                    <tr
                                        key={vacc._id}
                                        className="bg-neutral100 rounded-md border border-neutral400 overflow-hidden">
                                        <td className="flex gap-4">
                                            <Syringe className="text-inactive w-6 " />
                                            {vacc.name}
                                        </td>
                                        <td>{formatDate(vacc.date)}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Circle
                                                    className={`w-3 h-3 ${
                                                        statusClass[
                                                            getVaccinationStatus(
                                                                vacc
                                                            )
                                                        ]
                                                    }`}
                                                />
                                                <span className="text-neutral900">
                                                    {getVaccinationStatus(vacc)}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-grow" />{" "}
                    {/* <-- Spacer schiebt den Button runter */}
                    <div className="flex justify-end mt-4">
                        <button onClick={onOpenModal} className="btn-icon">
                            <Eye className="w-5 h-5" />
                            View All
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-neutral700 italic">
                    All good! No medication for {pet.name}
                </p>
            )}
        </div>
    );
};

export default VaccSection;
