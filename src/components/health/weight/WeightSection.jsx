import AddButton from "../../ui/AddBtn";
import WeightChartMini from "./WeightChartMini";

const WeightSection = ({ pet }) => {
    const weightHistory = pet?.weightHistory || [];

    return (
        <div className="card-container">
            <div className="flex justify-between items-center mb-6">
                <h3 className="h3-section">Weight</h3>
                <AddButton
                    onClick={() => setShowModal(true)}
                    label="Add Weight Entry"
                />
            </div>
            {weightHistory.length > 0 ? (
                <>
                    <WeightChartMini weightHistory={weightHistory} />

                    <p className="text-neutral700">
                        Last Entry:{" "}
                        <strong>{weightHistory.at(-1).weight} kg</strong> on{" "}
                        {new Date(weightHistory.at(-1).date).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }
                        )}
                    </p>
                </>
            ) : (
                <p className="text-neutral700 italic">No weight entries yet</p>
            )}

            {/* 
            {showModal && (
                <WeightModal
                    petId={pet._id}
                    onClose={() => setShowModal(false)}
                />
            )} */}
        </div>
    );
};

export default WeightSection;
