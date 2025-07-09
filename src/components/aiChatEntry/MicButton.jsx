import { Mic, MicOff } from "lucide-react";

export const MicButton = ({ isListening, startListening, stopListening }) => {
    return (
        <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-full transition-colors ${
                isListening ? "bg-red-500" : "bg-success"
            } hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}>
            {isListening ? (
                <MicOff className="h-6 w-6 text-white" />
            ) : (
                <Mic className="h-6 w-6 text-white" />
            )}
        </button>
    );
};
