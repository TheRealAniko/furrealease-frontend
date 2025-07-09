import { useState, useRef } from "react";

export const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]); // ✅ Ref statt State für chunks

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: "audio/webm;codecs=opus", // ✅ Explizit webm format
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = []; // ✅ Chunks zurücksetzen

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data); // ✅ Direkt in Ref pushen
                }
            };

            mediaRecorder.onstart = () => {
                setIsRecording(true);
                console.log("Recording started");
            };

            mediaRecorder.onstop = () => {
                setIsRecording(false);
                console.log("Recording stopped");

                // ✅ Stream tracks stoppen
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorder.start(100); // ✅ Daten alle 100ms sammeln
        } catch (error) {
            console.error("Error starting recording:", error);
            throw error;
        }
    };

    const stopRecording = () => {
        return new Promise((resolve, reject) => {
            if (
                !mediaRecorderRef.current ||
                mediaRecorderRef.current.state === "inactive"
            ) {
                reject(new Error("No active recording"));
                return;
            }

            mediaRecorderRef.current.onstop = () => {
                try {
                    // ✅ Blob aus den gesammelten Chunks erstellen
                    const blob = new Blob(audioChunksRef.current, {
                        type: "audio/webm",
                    });

                    console.log("Audio blob created:", {
                        size: blob.size,
                        type: blob.type,
                        chunksCount: audioChunksRef.current.length,
                    });

                    setIsRecording(false);
                    resolve(blob);
                } catch (error) {
                    console.error("Error creating audio blob:", error);
                    reject(error);
                }
            };

            mediaRecorderRef.current.stop();
        });
    };

    return {
        isRecording,
        startRecording,
        stopRecording,
    };
};
