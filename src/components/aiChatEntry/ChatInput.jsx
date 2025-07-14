import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAudioRecorder } from "./hooks/useAudioRecorder.js";
import { PawPrint, Mic, MicOff } from "lucide-react";
import { parseEntry } from "../../data/parseEntry.js";
import { transcribeAudio } from "../../data/transcribeAudio.js";
import { getPawBotText } from "../../utils/formatPawBotResponse.js";
import { mapParcedEntryToForms } from "../../utils/parseMapping.js";
import { useSpeechToText } from "./hooks/useSpeechToText.js";
import { addVisit, addWeightEntry, addMed, addVacc } from "../../data/pets.js";
import { set } from "date-fns";

const ChatInput = ({ petId, onDataSaved }) => {
    const [message, setMessage] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [aiResponse, setAiResponse] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);

    const { isListening, transcript, startListening, stopListening } =
        useSpeechToText();

    const { isRecording, startRecording, stopRecording } = useAudioRecorder();

    const handleStopAndTranscribe = async () => {
        const audioBlob = await stopRecording();
        await handleServerTranscribe(audioBlob);
    };

    const handleSend = async () => {
        console.log("User Message:", message);

        setLoading(true);
        setError(null);
        setAiResponse(null);

        try {
            // User Message speichern
            setUserMessage(message);

            // AI Antwort generieren
            const data = await parseEntry(message);
            console.log("AI Response:", data);

            // Mappe AI Antwort zu Formularen
            const mappedForms = mapParcedEntryToForms(data?.data);
            console.log("Mapped Forms:", mappedForms);

            // Setze AI Antwort
            setAiResponse({ raw: data, mapped: mappedForms });

            setMessage(""); // Textfeld leeren nach dem Senden
        } catch (error) {
            console.error("Error generating AI response:", error);
            const errorMessage = error.message || "Something went wrong!";
            setError(errorMessage);
            toast.error(`AI Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleServerTranscribe = async (audioBlob) => {
        console.log("Transcribing audio...");
        setLoading(true);
        setError(null);

        try {
            const data = await transcribeAudio(audioBlob);
            console.log("Whisper Transcription:", data.text);
            setMessage(data.text); // Setze transkribierten Text ins Eingabefeld
            toast.success("Audio transcribed successfully!");
        } catch (error) {
            console.error("Error transcribing audio:", error);
            const errorMessage = error.message || "Failed to transcribe audio";
            setError(errorMessage);
            toast.error(`Transcription failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Wenn transcript sich ändert → ins Textfeld setzen
    useEffect(() => {
        if (transcript) {
            setMessage(transcript);
        }
    }, [transcript]);

    // Initiale Höhe des Textarea setzen
    useEffect(() => {
        handleInput();
    }, [message]);

    const handleInput = () => {
        const input = textareaRef.current;
        if (input) {
            input.style.height = "auto"; // Reset height
            input.style.height = `${input.scrollHeight}px`; // Set to scrollHeight

            if (input.scrollHeight > 96) {
                input.style.overflowY = "scroll"; // Enable scroll if too tall
            } else {
                input.style.overflowY = "hidden"; // Hide scroll if not needed
            }
        }
    };

    const handleConfirm = async (mapped) => {
        console.log("handleConfirm called with:", mapped);

        if (!mapped) return;
        if (!petId) {
            setError("No pet selected");
            toast.error("No pet selected");
            return;
        }
        setLoading(true);
        setError(null);

        const savedEntries = [];

        try {
            // VetVisit
            if (mapped.vetVisit) {
                await addVisit(petId, mapped.vetVisit);
                console.log("Saving vet visit:", mapped.vetVisit);
                savedEntries.push("Vet visit");
            }
            // Weight
            if (mapped.weight) {
                await addWeightEntry(petId, mapped.weight);
                console.log("Saving weight:", mapped.weight);
                savedEntries.push("Weight entry");
            }
            // Medication - mit zusätzlicher Validierung
            if (mapped.medication) {
                console.log("Saving medication:", mapped.medication);
                if (!mapped.medication.name || !mapped.medication.startDate) {
                    throw new Error("Medication requires name and start date");
                }
                await addMed(petId, mapped.medication);
                savedEntries.push("Medication");
            }
            // Vaccination
            if (mapped.vaccination) {
                await addVacc(petId, mapped.vaccination);
                console.log("Saving vaccination:", mapped.vaccination);
                savedEntries.push("Vaccination");
            }

            // Success
            const successMessage = `Successfully saved: ${savedEntries.join(
                ", "
            )}`;
            toast.success(successMessage);
            setAiResponse(null); // Reset AI response
            setUserMessage(""); // Reset user message

            // Trigger refresh in parent component
            if (onDataSaved) {
                onDataSaved();
            }
        } catch (error) {
            console.error("Error saving entry:", error);
            const errorMessage = error.message || "Failed to save entry";
            setError(errorMessage);
            toast.error(`Save failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setAiResponse(null);
        setUserMessage("");
        setMessage("");
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral200 rounded-lg">
            <p className="mb-2 flex text-left">
                <span className="px-4 font-light">
                    <strong>PawBot:</strong> Hi! Tell me what happened with your
                    pet today and I'll help you record it.
                </span>
            </p>

            {/* Input new */}
            <div className="flex flex-col w-full input-small">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleInput();
                    }}
                    placeholder={
                        isRecording
                            ? "Recording…"
                            : "Type your message or record…"
                    }
                    rows={1}
                    className="grow w-full  p-2 focus:outline-none focus:ring-0"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={
                            isRecording
                                ? handleStopAndTranscribe
                                : startRecording
                        }
                        className={`flex items-center gap-2 rounded-full transition-colors h-10 justify-center aspect-square ${
                            isRecording ? "bg-error" : "bg-success"
                        } hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}>
                        {isRecording ? (
                            <MicOff className="h-6 w-6 text-white" />
                        ) : (
                            <Mic className="h-6 w-6 text-white" />
                        )}
                    </button>
                    <button onClick={handleSend} className="btn-primary-xs">
                        Send
                    </button>
                </div>
            </div>

            {/* LOADING / ERROR */}
            {Loading && (
                <div className="text-sm text-neutral700 mt-2">
                    <span className="animate-pulse">PawBot is thinking...</span>
                </div>
            )}
            {error && (
                <div className="text-sm text-red-500 mt-2">
                    <strong>Error:</strong> {error}
                </div>
            )}
            {/* User Message Display */}
            {userMessage && (
                <div className="mb-2 ml-8 flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
                    <div className="flex items-start gap-4 self-end">
                        <span className="font-light whitespace-pre-wrap">
                            <strong>You:</strong> {userMessage}
                        </span>
                    </div>
                </div>
            )}
            {/* AI Response Display */}
            {aiResponse?.raw?.data && (
                <div className="mb-2 flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                        <span className="font-light whitespace-pre-wrap text-left">
                            <strong>PawBot:</strong>{" "}
                            {getPawBotText(aiResponse.raw.data)}
                        </span>
                    </div>

                    <div className="flex self-end gap-4">
                        <button
                            className="btn-primary self-end"
                            onClick={() => handleConfirm(aiResponse.mapped)}>
                            Confirm & Save
                        </button>

                        <button className="btn-outline" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
