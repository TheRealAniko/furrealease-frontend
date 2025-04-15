import AddButton from "../../ui/AddBtn";
import { Eye, BriefcaseMedical } from "lucide-react";

const MedSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const medications = pet?.medications || [];

    // neueste Medikation zuerst
    const medSorted = medications.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    return (
        <div className="card-container flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="h3-section">Medication</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>

            {medications.length > 0 ? (
                <>
                    <div className="space-y-2">
                        <table className="w-full mt-2 text-left border-separate border-spacing-y-2">
                            <thead className="table-head">
                                <tr className="overflow-hidden">
                                    <th>Medication</th>
                                    <th>Dosage</th>
                                    <th>How</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {medSorted.slice(0, 2).map((med) => (
                                    <tr
                                        key={med._id}
                                        className="bg-neutral100 rounded-md border border-neutral400">
                                        <td className="flex gap-4">
                                            <BriefcaseMedical className="text-inactive w-6 " />{" "}
                                            {med.name}
                                        </td>
                                        <td>{med.dosage}</td>
                                        <td>{med.route}</td>
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

export default MedSection;
