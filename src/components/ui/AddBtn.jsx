import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";

const AddBtn = ({ onClick, label = "+ Hinzufügen" }) => {
    return (
        <button onClick={onClick} className="btn-icon">
            <CirclePlus className="w-5 h-5" />
            {label}
        </button>
    );
};

export default AddBtn;
