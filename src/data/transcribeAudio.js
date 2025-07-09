const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error("API URL is required, are you missing a .env file?");
}

const baseURL = `${API_URL}/api/transcribe`;

export const transcribeAudio = async (audioBlob) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found, please login first");

    try {
        // ✅ FormData erstellen
        const formData = new FormData();

        // ✅ Blob als File mit .webm Extension hinzufügen
        const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, {
            type: audioBlob.type || "audio/webm",
        });

        formData.append("audio", audioFile); // ✅ Stelle sicher, dass 'audio' dem Backend-Field entspricht

        console.log("Sending audio file:", {
            name: audioFile.name,
            size: audioFile.size,
            type: audioFile.type,
        });

        // ✅ Stelle sicher, dass der Pfad korrekt ist
        const response = await fetch(`${baseURL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData, // ✅ Kein Content-Type Header - Browser setzt automatisch
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error transcribing audio:", error);
        throw error;
    }
};
