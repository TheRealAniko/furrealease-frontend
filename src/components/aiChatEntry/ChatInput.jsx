import { useState, useEffect, useRef } from "react";
import { useSpeechToText } from "./hooks/useSpeechToText.js";
import { useAudioRecorder } from "./hooks/useAudioRecorder.js";
import { PawPrint, Mic, MicOff } from "lucide-react";
import { parseEntry } from "../../data/parseEntry.js";
import { transcribeAudio } from "../../data/transcribeAudio.js";
import { getPawBotText } from "../../utils/formatPawBotResponse.js";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const [aiResponse, setAiResponse] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);

    // const { isListening, transcript, startListening, stopListening } =
    //     useSpeechToText();

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
            // AI Antwort generieren
            const data = await parseEntry(message);
            console.log("AI Response:", data);

            setAiResponse(data);
            setMessage(""); // Textfeld leeren nach dem Senden
        } catch (error) {
            console.error("Error generating AI response:", error);
            setError(error.message || "Something went wrong!");
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
        } catch (error) {
            console.error("Error transcribing audio:", error);
            setError(error.message || "Failed to transcribe audio");
        } finally {
            setLoading(false);
        }
    };

    // Wenn transcript sich ändert → ins Textfeld setzen
    // useEffect(() => {
    //     if (transcript) {
    //         setMessage(transcript);
    //     }
    // }, [transcript]);

    const handleInput = () => {
        const input = textarea.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height
            textarea.style.height = `${input.scrollHeight}px`; // Set to scrollHeight

            if (textarea.scrollHeight > 96) {
                textarea.style.overflowY = "scroll"; // Enable scroll if too tall
            } else {
                textarea.style.overflowY = "hidden"; // Hide scroll if not needed
            }
        }
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral200 rounded-lg">
            <p className="mb-2 flex text-left">
                <PawPrint />{" "}
                <span className="px-4 font-light">
                    <strong>PawBot:</strong> Hi! Tell me what happened with{" "}
                    {name} today and I'll help you record it.
                </span>
            </p>

            {/* Inpur new */}
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
            {/* AI Response Display */}
            {aiResponse?.data && (
                <div className="mb-2 flex flex-col gap-4 bg-gray-50 border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                        <PawPrint className="w-12" />
                        <span className="font-light whitespace-pre-wrap">
                            <strong>PawBot:</strong>{" "}
                            {getPawBotText(aiResponse.data)}
                        </span>
                    </div>

                    <button
                        className="btn-primary self-end"
                        onClick={() => handleConfirm(aiResponse.data)}>
                        Confirm & Save
                    </button>
                </div>
            )}

            {aiResponse && (
                <div className="mt-2 p-2 bg-white rounded shadow text-sm">
                    <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
