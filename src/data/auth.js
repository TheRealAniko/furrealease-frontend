const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
    throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/auth`;

export const me = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, // 💥 DAS brauchst du
        },
    });

    if (!res.ok) throw new Error("Not authenticated");

    return await res.json(); // z.B. { id, email, firstName }
};

export const signin = async (formData) => {
    const res = await fetch(`${baseURL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while trying to sign in");
        }
        throw new Error(errorData.error);
    }
    const result = await res.json();
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user)); // optional
    return result;
};

export const signup = async (formData) => {
    const res = await fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while trying to sign up");
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
};
