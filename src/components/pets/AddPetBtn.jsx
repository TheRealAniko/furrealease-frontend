import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";

const AddPetBtn = () => {
    return (
        <>
            <NavLink to="/pets/new-pet">
                {" "}
                <button className="btn-icon">
                    <CirclePlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Fur Friend</span>
                </button>
            </NavLink>
        </>
    );
};

export default AddPetBtn;
