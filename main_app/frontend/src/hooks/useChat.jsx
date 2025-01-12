import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Create the context
const ChatContext = createContext();

// Create the provider component
export const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [cameraZoomed, setCameraZoomed] = useState(false);
  const [audioRes, setAudioRes] = useState();
  const [messages, setMessages] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0); // 0 = default, 1 = first zoom, 2 = closer, etc.

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  const type = async (message) => {
    if (loading) return;

    setLoading(true);
    setMessage(null);

    try {
      const chatResponse = await api.post("/chat", { text: message });

      console.log(chatResponse);

      // Update handling of chatResponse.data based on new structure
      const messagesRes = chatResponse.data.map((item) => ({
        text: item.text,
        facialExpression: item.facialExpression,
        animation: item.animation,
        audio: item.audio,
        lipsync: item.lipsync,
      }));

      setAudioRes(messagesRes.map((item) => item.audio)); // Assuming you want to set audio responses
      setMessages((messages) => [...messages, ...messagesRes]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const chat = async (audioBlob) => {
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      let payload;
      let headers = {};

      if (audioBlob instanceof Blob) {
        const formData = new FormData();
        formData.append("audio", audioBlob);
        payload = formData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        payload = { text: audioBlob };
        headers = { "Content-Type": "application/json" };
      }

      const chatResponse = await api.post("/chat", payload, { headers });
      const messagesRes = chatResponse.data.map((item) => ({
        text: item.text,
        facialExpression: item.facialExpression,
        animation: item.animation,
        audio: item.audio, // This should be base64 encoded audio data
        lipsync: item.lipsync,
      }));

      setMessages((messages) => [...messages, ...messagesRes]);
    } catch (error) {
      console.error("Chat error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 3)); // Max 3 zoom levels
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 0));
  };

  // Provide the context values
  return (
    <ChatContext.Provider
      value={{
        audioRes,
        chat,
        message,
        loading,
        cameraZoomed,
        setCameraZoomed,
        onMessagePlayed,
        zoomLevel,
        handleZoomIn,
        handleZoomOut,
        type,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
