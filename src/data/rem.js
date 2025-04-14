const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
    throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/reminders`;

export const getRems = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(baseURL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while fetching the reminders");
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
};

export const getSingleRem = async (remId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${remId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error("An error occurred while fetching the reminders");
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
};

export const createRem = async (data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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

export const updateRem = async (remId, data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${remId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", // wichtig!
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // sendet JSON statt FormData
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
    }

    return res.json();
};

export const deleteRem = async (remId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${remId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
    }

    return res.json();
};
