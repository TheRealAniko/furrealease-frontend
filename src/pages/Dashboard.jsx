import Petlist from "../components/PetList";

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Fur Family</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Petlist />
            </div>
        </div>
    );
};

export default Dashboard;
