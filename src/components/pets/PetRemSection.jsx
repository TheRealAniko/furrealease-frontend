import { useRems } from "../../context";
import RemCard from "../reminders/RemCard";
import { Eye, CirclePlus } from "lucide-react";
import { useNavigate } from "react-router";

const PetRemSection = ({ pet }) => {
    const { rems } = useRems();
    const petRems = rems.filter(
        (r) => r.petId?.toString() === pet._id && r.status !== "done"
    );
    const navigate = useNavigate();

    return (
        <div className="card-container flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 ">
                <h3 className="h3-section ">Reminders </h3>
                <button
                    onClick={() => navigate("/reminders?addReminder=true")}
                    className="btn-icon">
                    <CirclePlus className="w-5 h-5" />
                    Add
                </button>
            </div>
            {petRems.length > 0 ? (
                <>
                    <div className="space-y-2">
                        {petRems.map((rem) => (
                            <RemCard key={rem._id} rem={rem} />
                        ))}
                    </div>
                    <div className="flex-grow" />{" "}
                    {/* <-- Spacer schiebt den Button runter */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => {
                                navigate("/reminders"); // KEINE searchParams
                            }}
                            className="btn-icon">
                            <Eye className="w-5 h-5" />
                            View All
                        </button>
                    </div>
                </>
            ) : (
                <div className=" italic text-neutral700">
                    You're all caught up – no pending reminders for {pet.name}!
                </div>
            )}
        </div>
    );
};

export default PetRemSection;
