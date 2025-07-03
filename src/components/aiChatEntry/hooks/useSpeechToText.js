import { useState, useEffect, useRef } from "react";

export const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);
    const accumulatedTranscriptRef = useRef(""); // ← Neu: Akkumulator

    useEffect(() => {
        if (
            !("webkitSpeechRecognition" in window) &&
            !("SpeechRecognition" in window)
        ) {
            console.error("Speech recognition not supported");
            return;
        }

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "de-DE";

        recognitionRef.current.onstart = () => {
            setIsListening(true);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            // Neuen finalen Text zum Akkumulator hinzufügen
            if (finalTranscript) {
                accumulatedTranscriptRef.current += finalTranscript + " ";
            }

            // Gesamttext anzeigen (akkumuliert + aktueller interim)
            setTranscript(accumulatedTranscriptRef.current + interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            // Akkumulator zurücksetzen nur beim Start
            accumulatedTranscriptRef.current = "";
            setTranscript("");
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            // Finalen akkumulierten Text setzen
            setTranscript(accumulatedTranscriptRef.current.trim());
        }
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
};
