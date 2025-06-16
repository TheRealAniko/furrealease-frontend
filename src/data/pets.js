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
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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
            Authorization: `Bearer ${token}`,
            // ❗️kein Content-Type setzen, FormData macht das!
        },
        body: formData,
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

export const updatePet = async (id, formData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            // "Content-Type": "application/json", // 👈 wichtig!
            Authorization: `Bearer ${token}`,
        },
        body: formData, // 👈 deine Daten
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
    }

    return res.json();
};

export const sleepPet = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${id}/sleep`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Sleep failed");
    }

    return res.json();
};

export const unsleepPet = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/${id}/unsleep`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unsleep failed");
    }

    return res.json();
};

// Weight
export const addWeightEntry = async (id, entry) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/weights`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(entry),
    });

    if (!res.ok) {
        throw new Error("Failed to add weight entry");
    }

    return res.json();
};

export const deleteWeightEntry = async (id, weightId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/weights/${weightId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
    });
    if (!res.ok) {
        throw new Error("Failed to delete weight entry");
    }

    return res.json();
};

export const updateWeightEntry = async (id, weightId, updatedEntry) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/weights/${weightId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(updatedEntry),
    });

    if (!res.ok) {
        throw new Error("Failed to update weight entry");
    }

    return res.json();
};

// Notes
export const addNote = async (id, noteData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(noteData),
    });

    if (!res.ok) {
        throw new Error("Failed to add note");
    }

    return res.json();
};

export const deleteNote = async (id, noteId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
    });
    if (!res.ok) {
        throw new Error("Failed to delete weight entry");
    }

    return res.json();
};

export const updateNote = async (id, noteId, updatedNote) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(updatedNote),
    });

    if (!res.ok) {
        throw new Error("Failed to update weight entry");
    }

    return res.json();
};

// Medication
export const addMed = async (id, medData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/medications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(medData),
    });

    if (!res.ok) {
        throw new Error("Failed to add medication");
    }

    return res.json();
};

export const deleteMed = async (id, medId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/medications/${medId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
    });
    if (!res.ok) {
        throw new Error("Failed to delete medication");
    }

    return res.json();
};

export const updateMed = async (id, medId, updateMed) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/medications/${medId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(updateMed),
    });

    if (!res.ok) {
        throw new Error("Failed to update medications");
    }

    return res.json();
};

// Vaccination
export const addVacc = async (id, vaccData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vaccinations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(vaccData),
    });

    if (!res.ok) {
        throw new Error("Failed to add vaccination");
    }

    return res.json();
};

export const deleteVacc = async (id, vaccId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vaccinations/${vaccId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
    });
    if (!res.ok) {
        throw new Error("Failed to delete vaccination");
    }

    return res.json();
};

export const updateVacc = async (id, vaccId, updateVacc) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vaccinations/${vaccId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(updateVacc),
    });

    if (!res.ok) {
        throw new Error("Failed to update vaccination");
    }

    return res.json();
};

// Vet Visits
export const addVisit = async (id, visitData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vet-visits`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(visitData),
    });

    if (!res.ok) {
        throw new Error("Failed to add vet visit");
    }

    return res.json();
};

export const deleteVisit = async (id, visitId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vet-visits/${visitId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
    });
    if (!res.ok) {
        throw new Error("Failed to delete vet visit");
    }

    return res.json();
};

export const updateVisit = async (id, visitId, updateVisit) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/${id}/vet-visits/${visitId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // nicht vergessen!
        },
        body: JSON.stringify(updateVisit),
    });

    if (!res.ok) {
        throw new Error("Failed to update vet visit");
    }

    return res.json();
};
