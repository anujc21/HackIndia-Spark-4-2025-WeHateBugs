import React, {useState, useEffect, useRef} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([]);
    
    const [userMessage, setUserMessage] = useState("");
    
    const chatContainerRef = useRef(null);
    
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

    const toggleChatbot = () => setIsOpen(!isOpen);

    const addMessage = (message, sender) => {
        setMessages((prevMessages) => [...prevMessages, {
            message, sender
        }]);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim()) {
            addMessage(userMessage, "user");

            setUserMessage("");
            
            addMessage("Thinking...", "bot");
            
            const botMessage = await getBotResponse(userMessage);
            
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];

                updatedMessages[updatedMessages.length - 1] = {
                    message: botMessage,
                    sender: "bot"
                };
                
                return updatedMessages;
            });
        }
    };

    const getBotResponse = async (userMessage) => {
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash"
            });

            const prompt = `You are an AI assistant that helps users generate blueprints for PowerPoint presentations. Your responses should be formatted for clarity, with structured headings, bullet points, and properly formatted JSON when needed.`;
            
            const result = await model.generateContent(prompt);
            
            const response = await result.response.text();
            
            return response;
        }
        catch (error){
            console.error("Error fetching bot response:", error);

            return "Sorry, I encountered an error.";
        }
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addMessage("How can I help you?", "bot");
        }
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [isOpen, messages]);

    const handleCopy = (message) => {
        navigator.clipboard.writeText(message)
            .then(() => {
                Swal.fire({
                    toast: true,
                    position: "bottom-left",
                    icon: "success",
                    title: "Copied to clipboard!",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                });
            })
            .catch((err) => {
                console.error("Error copying text: ", err);
            });
    };

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#ff148a",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "2px 2px 6px rgba(255, 115, 185, 0.8)",
                    transition: "all 0.3s ease",
                }}
                onClick={toggleChatbot}
            >
                <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>?</span>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "20px",
                        width: "300px",
                        height: "400px",
                        backgroundColor: "#121212",
                        borderRadius: "15px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                        padding: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <div 
                        ref={chatContainerRef}
                        style={{
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: "10px",
                            backgroundColor: "#181818",
                            borderRadius: "10px",
                            marginBottom: "15px",
                            maxHeight: "300px",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div key={index} style={{textAlign: msg.sender === "user" ? "right" : "left", margin: "10px 0"}}>
                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "12px 16px",
                                        borderRadius: "12px",
                                        backgroundColor: (msg.sender === "user" ? "#ff75ba" : "#333"),
                                        color: "#fff",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {msg.message}

                                    <CopyAllIcon
                                        onClick={() => handleCopy(msg.message)}
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            color: "#fff",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            style={{
                                flexGrow: 1,
                                padding: "12px",
                                border: "2px solid #ff148a",
                                borderRadius: "25px",
                                fontSize: "14px",
                                color: "#fff",
                                backgroundColor: "#333",
                            }}
                        />
                        <div
                            onClick={handleSendMessage}
                            style={{
                                backgroundColor: "#ff148a",
                                color: "white",
                                border: "none",
                                padding: "12px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                fontWeight: "bold",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <SendIcon style={{fontSize: "24px", color: "white"}}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;