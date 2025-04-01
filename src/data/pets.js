const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
    throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/pets`;

export const getPets = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(baseURL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while fetching the pets");
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
};

export const getSinglePet = async (id) => {
    const res = await fetch(`${baseURL}/${id}`);
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while fetching the pet");
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
};

export const createPet = async (formData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 👈 wichtig!
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // 👈 deine Daten
    });

    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while creating the pet");
        }
        throw new Error(errorData.error);
    }

    return res.json();
};

export const updatePet = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", // 👈 wichtig!
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // 👈 deine Daten
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
    }

    return res.json();
};

export const retirePet = async (id, data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", // 👈 wichtig!
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // 👈 deine Daten
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Retire failed");
    }

    return res.json();
};
