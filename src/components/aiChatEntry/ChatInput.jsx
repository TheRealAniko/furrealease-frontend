import { useState } from "react";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        console.log("User Message; ", message);
    };

    return (
        <div className="flex gap-4 items-center p-4 bg-neutral200 rounded-lg">
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
    );
};

export default ChatInput;
