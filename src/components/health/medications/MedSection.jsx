import AddButton from "../../ui/AddBtn";
import { Eye, BriefcaseMedical } from "lucide-react";

const MedSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const medications = pet?.medications || [];

    // neueste Medikation zuerst
    const medSorted = medications.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-6 ">
                <h3 className="h3-section">Medication</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>

            {medications.length > 0 ? (
                <>
                    <div className="space-y-2">
                        {medSorted.slice(0, 2).map((med) => (
                            <div
                                key={med._id}
                                className="bg-neutral100 rounded-md border border-neutral400">
                                <div className="inner-head">{med.name}</div>
                                <div className="inner-body flex items-center gap-4 ">
                                    <BriefcaseMedical className="text-inactive w-6 " />{" "}
                                    {med.dosage} • {med.route}
                                </div>
                            </div>
                        ))}
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
                    All good! No medication for {pet.name}
                </p>
            )}
        </div>
    );
};

export default MedSection;
