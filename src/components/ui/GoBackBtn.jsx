import { useNavigate } from "react-router";
import { CirclePlus, ChevronLeft } from "lucide-react";

const GoBackBtn = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        setTimeout(() => navigate(-1), 100); // 💡 kleiner Delay!
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    return (
        <button
            onClick={handleGoBack}
            className="flex items-center gap-2 font-light text-base text-greenEyes">
            <ChevronLeft className="w-5 h-5" />
            Go Back
        </button>
    );
};

export default GoBackBtn;
