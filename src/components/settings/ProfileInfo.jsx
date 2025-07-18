import { Pencil, AtSign, PawPrint, X, User } from "lucide-react";
import { useState } from "react";

const ProfileInfo = ({ user, pets }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Sofort-Vorschau
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Headline and Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="h2-section">Your Profile</h2>
            </div>

            {/* Profile info container */}
            <div className="card-container flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                {/* Image left */}
                <div className="w-80 h-80 rounded-full overflow-hidden flex items-center justify-center bg-primary shrink-0">
                    {previewUrl || user?.photoUrl ? (
                        <img
                            src={previewUrl || user?.photoUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-32 h-32 text-white" />
                    )}
                </div>
                {/* Infos right */}
                <div className="flex flex-col gap-2 w-full">
                    {isEditing ? (
                        <>
                            <div className="flex justify-between">
                                <h2 className="font-medium text-4xl">
                                    Update your infos
                                </h2>
                                <button
                                    className="flex gap-2 font-light text-base text-greenEyes self-end w-fit"
                                    onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? (
                                        <>
                                            <X className="w-5 h-5" /> Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Pencil className="w-5 h-5" /> Edit
                                            Information
                                        </>
                                    )}
                                </button>
                            </div>
                            <form className="p-4 text-base font-light space-y-4">
                                <div>
                                    <label className="text-neutral600 text-sm">
                                        Profile Picture:
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="text-neutral600 text-sm">
                                        Name:
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        defaultValue={user?.firstName}
                                        className="flex items-center input-small w-full gap-4"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="text-neutral600 text-sm">
                                        Lastname:
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        defaultValue={user?.lastName}
                                        className="flex items-center input-small w-full gap-4"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-neutral600 text-sm">
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        defaultValue={user?.email}
                                        className="flex items-center input-small w-full gap-4"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-4 w-full">
                            {/* Headline + Edit Button */}
                            <div className="flex justify-between items-start">
                                <h2 className="font-medium text-4xl mb-10">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <button
                                    className="flex gap-2 font-light text-base text-greenEyes w-fit"
                                    onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? (
                                        <>
                                            <X className="w-5 h-5" /> Cancel
                                        </>
                                    ) : (
                                        <>
                                            <Pencil className="w-5 h-5" /> Edit
                                            Information
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4 font-light text-base">
                                <AtSign className="text-inactive w-6" />
                                <span>{user?.email}</span>
                            </div>

                            {/* Pets */}
                            <div className="flex items-center gap-4 font-light text-base">
                                <PawPrint className="text-inactive w-6" />
                                <span>{pets?.length} Pets</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
