import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Languages, Send } from "lucide-react";

// Interface defining the structure of a chat message
interface Message {
  id: number;
  text: string;
  language: string;
  sessionid: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      language: "en",
      sessionid: "s0",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  // State to track the current input value
  const [inputValue, setInputValue] = useState("");

  // State to show loading indicator while waiting for bot response
  const [isLoading, setIsLoading] = useState(false);

  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message when messages array changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to send message to backend API and handle response
  const sendMessageToAPI = async (message: {
    sender: string;
    message: string;
  }): Promise<string> => {
    try {
      const response = await fetch(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data[0].text || "Sorry, I didn't receive a proper response.";
    } catch (error) {
      console.error("Error sending message to API:", error);
      return "Sorry, I'm having trouble connecting to the server. Please try again later.";
    }
  };

  // const sendBotMessageToAPI = async (message: {
  //   sender: string;
  //   text: string;
  // }): Promise<string> => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5005/webhooks/rest/webhook ",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(message),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     return data || "Sorry, I didn't receive a proper response.";
  //   } catch (error) {
  //     console.error("Error sending message to API:", error);
  //     return "Sorry, I'm having trouble connecting to the server. Please try again later.";
  //   }
  // };

  // Handle sending a new message
  const handleSendMessage = async () => {
    // Don't send empty messages
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue.trim(),
      language: "en",
      sessionid: "s0",
      isUser: true,
      timestamp: new Date(),
    };

    const messagePayload = {
      sender: "test_user",
      message: userMessage.text,
    };
    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);

    // Clear input field immediately
    setInputValue("");

    // Show loading state
    setIsLoading(true);

    // Send message to API and get bot response
    const botResponse = await sendMessageToAPI(messagePayload);

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      language: "en",
      sessionid: "s0",
      isUser: false,
      timestamp: new Date(),
    };

    // Add bot response to chat
    setMessages((prev) => [...prev, botMessage]);

    // const botPayload = {
    //   text: botMessage.text,
    //   language: botMessage.language,
    //   user_message: botResponse.id,
    // };

    // send botresponse to backend

    // const sentBot = await sendBotMessageToAPI(botPayload);
    // Hide loading state
    setIsLoading(false);
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-chat-background to-secondary">
      {/* Chat Header */}
      <div className="bg-card shadow-sm border-b px-6 py-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-chat-userBubble bg-clip-text text-transparent">
          AI Chat Assistant
        </h1>
        <p className="text-muted-foreground text-sm">
          Ask me anything and I'll do my best to help!
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] p-4 transition-all duration-300 hover:scale-[1.02] ${
                message.isUser
                  ? "bg-chat-userBubble text-chat-userText shadow-lg"
                  : "bg-chat-botBubble text-chat-botText border shadow-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span
                className={`text-xs mt-2 block opacity-70 ${
                  message.isUser
                    ? "text-chat-userText"
                    : "text-muted-foreground"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Card>
          </div>
        ))}

        {/* Loading indicator for bot response */}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-chat-botBubble text-chat-botText border shadow-md p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  Thinking...
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-card border-t p-4">
        <div className="flex space-x-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1 bg-chat-inputBackground border-border focus:ring-primary focus:border-primary transition-all duration-200"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Usage tip */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          Press Enter to send • API endpoint: http://localhost:5000/chat
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
