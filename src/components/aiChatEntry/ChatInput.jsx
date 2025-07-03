import { useState, useEffect } from "react";
import { useSpeechToText } from "./hooks/useSpeechToText.js";
import { MicButton } from "./MicButton";
import { PawPrint } from "lucide-react";
import { parseEntry } from "../../data/parseEntry.js";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const [aiResponse, setAiResponse] = useState(null);

    const { isListening, transcript, startListening, stopListening } =
        useSpeechToText();

    const handleSend = async () => {
        console.log("User Message:", message);

        try {
            // AI Antwort generieren
            const data = await parseEntry(message);
            console.log("AI Response:", data);

            setAiResponse(data);
            setMessage(""); // Textfeld leeren nach dem Senden
        } catch (error) {
            console.error("Error generating AI response:", error);
            setAiResponse(null);
        }
    };

    // Wenn transcript sich ändert → ins Textfeld setzen
    useEffect(() => {
        if (transcript) {
            setMessage(transcript);
        }
    }, [transcript]);

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral200 rounded-lg">
            <p className="mb-2 flex text-left">
                <PawPrint />{" "}
                <span className="px-4 font-light">
                    <strong>PawBot:</strong> Hi! Tell me what happened with{" "}
                    {name} today and I'll help you record it.
                </span>
            </p>
            {/* TOP ROW */}
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-small grow focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />
                <MicButton
                    isListening={isListening}
                    startListening={startListening}
                    stopListening={stopListening}
                />

                <button onClick={handleSend} className="btn-primary">
                    Send
                </button>
            </div>

            {/* STATUS / TRANSCRIPT */}
            <div className="text-sm text-neutral700 mt-1 font-light">
                <strong>Status:</strong>{" "}
                {isListening
                    ? "Listening... Tap to stop."
                    : "Tap the mic to speak."}
                {/* {transcript && (
                    <>
                        <br />
                        <strong>Transcript:</strong> {transcript}
                    </>
                )} */}
            </div>

            {/* AI Response Display */}
            {aiResponse && (
                <div className="mt-2 p-2 bg-white rounded shadow text-sm">
                    <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
