const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
    throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/users`;

export const updateProfile = async (formData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData, // KEIN JSON.stringify bei FormData!
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Profile update failed");
    }

    return await res.json();
};
