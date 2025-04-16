import { useAuth, usePets } from "../context/index.js";
import { Pencil, AtSign, PawPrint } from "lucide-react";

const Settings = () => {
    const { pets } = usePets();
    const { user } = useAuth();
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Profile</h2>
            </div>

            {/* Profile info container */}
            <div className="card-container flex gap-28 ">
                {/* Image left */}
                <div>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="rounded-full w-80"
                    />
                </div>
                {/* Infos right */}
                <div className="flex flex-col gap-4 w-full">
                    <button className="flex items-center gap-2 font-light text-base text-greenEyes justify-end">
                        <Pencil className="w-5 h-5" />
                        Edit Information
                    </button>
                    <h2 className="font-medium text-4xl">
                        {user?.firstName} {user?.lastName}
                    </h2>
                    <div className="flex items-center gap-4 font-light text-base">
                        <AtSign className="text-inactive w-6 " />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 font-light text-base">
                        <PawPrint className="text-inactive w-6 " />
                        <span>{pets?.length} Pets</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
