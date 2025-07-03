const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error("API URL is required, are you missing a .env file?");
}
const baseURL = `${API_URL}/api/parse-entry`;

export const parseEntry = async (userInput) => {
    const token = localStorage.getItem("token");

    const res = await fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userInput }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
            errorData.error || "An error occurred while parsing the entry"
        );
    }

    return res.json();
};
