import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";

const AddPetBtn = () => {
    return (
        <>
            <NavLink to="/pets/new-pet">
                {" "}
                <button className="btn-icon">
                    <CirclePlus className="w-5 h-5" />
                    Add a Fur Friend
                </button>
            </NavLink>
        </>
    );
};

export default AddPetBtn;
