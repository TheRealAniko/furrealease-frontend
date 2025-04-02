import { usePets } from "../context";
import Petlist from "../components/PetList";
import { CirclePlus, Eye } from "lucide-react";

const Pets = () => {
    const { pets } = usePets();
    // const navigate = useNavigate();
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
                {pets.length === 0 ? <div>No pets</div> : <Petlist />}
            </div>
        </div>
    );
};

export default Pets;
