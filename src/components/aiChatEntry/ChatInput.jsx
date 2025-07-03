import { useState, useEffect } from "react";
import { useSpeechToText } from "./hooks/useSpeechToText.js";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const { isListening, transcript, startListening, stopListening } =
        useSpeechToText();

    const handleSend = () => {
        console.log("User Message:", message);
    };

    // Wenn transcript sich ändert → ins Textfeld setzen
    useEffect(() => {
        if (transcript) {
            setMessage(transcript);
        }
    }, [transcript]);

    return (
        <div className="flex flex-col gap-2 p-4 bg-neutral200 rounded-lg">
            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-small grow focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                />

                <button onClick={handleSend} className="btn-primary">
                    Send
                </button>
            </div>

            <div className="flex gap-2 items-center">
                {isListening ? (
                    <button
                        onClick={stopListening}
                        className="px-3 py-1 bg-red-500 text-white rounded">
                        Stop Listening
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="px-3 py-1 bg-green-500 text-white rounded">
                        Start Listening
                    </button>
                )}

                <p className="text-sm text-neutral700">
                    <strong>Transcript:</strong> {transcript}
                </p>
            </div>
        </div>
    );
};

export default ChatInput;
