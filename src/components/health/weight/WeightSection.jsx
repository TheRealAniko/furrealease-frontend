import AddButton from "../../ui/AddBtn";
import WeightChartMini from "./WeightChartMini";
import { Eye } from "lucide-react";

const WeightSection = ({ pet, onOpenModal, onOpenAddModal }) => {
    const weightHistory = pet?.weightHistory || [];
    const weightHistorySorted = [...(pet?.weightHistory || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-6">
                <h3 className="h3-section">Weight</h3>
                <AddButton onClick={onOpenAddModal} label="Add" />
            </div>

            {weightHistory.length > 0 && (
                <WeightChartMini weightHistory={weightHistory} />
            )}

            {weightHistory.length > 0 ? (
                <>
                    <p className="text-neutral700">
                        Last Weighed:{" "}
                        <strong>
                            {weightHistorySorted[0]?.weight ?? "—"} kg
                        </strong>{" "}
                        on{" "}
                        {weightHistorySorted[0]?.date
                            ? new Date(
                                  weightHistorySorted[0].date
                              ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                              })
                            : "—"}
                    </p>
                    <div className="flex justify-end mt-4">
                        <button onClick={onOpenModal} className="btn-icon">
                            <Eye className="w-5 h-5" />
                            View All Entries
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-neutral700 italic">No weight entries yet</p>
            )}
        </div>
    );
};

export default WeightSection;
