import GoBackBtn from "../components/ui/GoBackBtn";
import PetForm from "../components/pets/PetForm";

const CreatePet = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Add Your New Fur Friend </h2>
                <GoBackBtn />
            </div>
            {/* Pet info container */}
            <div className="card-container flex gap-28 ">
                <PetForm />
            </div>
        </div>
    );
};

export default CreatePet;
