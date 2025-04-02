import { usePets } from "../context";
import Petlist from "../components/PetList";
import { CirclePlus, Eye } from "lucide-react";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const { pets } = usePets();
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Fur Friends</h2>
                <button className="flex items-center gap-2 font-light text-base text-greenEyes">
                    <CirclePlus className="w-5 h-5" />
                    Add a Fur Friend
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pets.length === 0 ? (
                    <div className="card-container bg-neutral200 flex justify-between items-center">
                        No Fur Friends yet{" "}
                        <button className="btn btn-primary self-center">
                            Add a Fur Friend
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
                        className="flex items-center gap-2 font-light text-base text-greenEyes hover:text-darkGreenEyes hover:font-normal">
                        <Eye className="w-5 h-5" />
                        See all Your Friends
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
