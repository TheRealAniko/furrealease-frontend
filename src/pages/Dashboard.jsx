import { usePets, useRems } from "../context";
import Petlist from "../components/pets/PetList";
import { Eye, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router";
import AddPetBtn from "../components/pets/AddPetBtn";
import RemDashboard from "../components/reminders/RemDashboard";

const Dashboard = () => {
    const { pets } = usePets();
    const { rems } = useRems();
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Pet section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friends</h2>
                <AddPetBtn />
            </div>
            <div
                className={`grid grid-cols-1 gap-6 ${
                    pets.length > 0 ? "sm:grid-cols-2" : ""
                }`}>
                {pets.length === 0 ? (
                    <div className="card-container bg-neutral200 flex justify-between items-center">
                        No Fur Friends yet{" "}
                        <button
                            onClick={() => navigate("/pets/new-pet")}
                            className="btn btn-primary self-center">
                            Add Fur Friend
                        </button>
                    </div>
                ) : (
                    <Petlist limit={2} />
                )}
            </div>
            {pets.length > 2 && (
                <div className="flex justify-end items-center mb-6 py-8">
                    <button
                        onClick={() => navigate("/pets")}
                        className="btn-icon">
                        <Eye className="w-5 h-5" />
                        See all Your Friends
                    </button>
                </div>
            )}
            {pets.length <= 2 && <div className="h-8" />} {/* <-- Spacer! */}
            {/* Reminder section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Reminders</h2>
                <button
                    onClick={() => navigate("/reminders?addReminder=true")}
                    className="btn-icon">
                    <CirclePlus className="w-5 h-5" />
                    Add Reminder
                </button>
            </div>
            {rems.length === 0 ? (
                <div className="card-container bg-neutral200 flex justify-between items-center">
                    No reminders yet
                    <button
                        onClick={() => navigate("/reminders?addReminder=true")}
                        className="btn btn-primary self-center">
                        Add Reminder
                    </button>
                </div>
            ) : (
                <>
                    <RemDashboard />
                    <div className="flex justify-end items-center mb-6 py-8">
                        <button
                            onClick={() => navigate("/reminders")}
                            className="btn-icon">
                            <Eye className="w-5 h-5" />
                            See all Reminders
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
