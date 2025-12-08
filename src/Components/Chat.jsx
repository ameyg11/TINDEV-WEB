import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null); 
  
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  
  const socketRef = useRef(null);

  const sendMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName,
      lastName, 
      userId,
      targetUserId,
      text: newMessage,
    });
    setnewMessage("");
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatData = chat.data;
      console.log("SERVER DATA:", chatData);
      // --- CRASH FIX START ---
      if (chatData.participants) {
        const participant = chatData.participants.find((p) => {
          // SAFE CHECK: 
          // 1. If p is an object, use p._id
          // 2. If p is just a string ID (population failed), use p itself
          const participantId = p?._id || p; 
          
          return participantId?.toString() !== userId?.toString();
        });

        setOtherUser(participant);
      }
      // --- CRASH FIX END ---

      if (chatData.messages) {
        const chatMessages = chatData.messages.map((msg) => {
          const { senderId, text } = msg;
          return {
            // SAFE CHECK: Handle if senderId is missing or null
            senderId: senderId?._id || senderId, 
            firstName: senderId?.firstName || "Unknown",
            lastName: senderId?.lastName || "",
            text,
          };
        });
        setMessages(chatMessages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(userId){
        fetchChatMessages();
    }
  }, [targetUserId, userId]); 

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { firstName, userId, targetUserId });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      const effectiveSenderId = senderId || (firstName === user?.firstName ? userId : "other");
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, senderId: effectiveSenderId },
      ]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, targetUserId, firstName, lastName]);

  // CRITICAL FIX: If user is not loaded from Redux yet, don't render the chat
  if (!user) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-3xl mx-auto border border-neutral-800 bg-neutral-900 m-5 h-[80vh] flex flex-col rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-zinc-700">
            {/* FIX: Use optional chaining (?.) here */}
            {otherUser?.firstName ? otherUser.firstName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-white text-lg tracking-wide">
              {/* FIX: Use optional chaining (?.) here */}
              {otherUser 
                ? `${otherUser.firstName} ${otherUser.lastName || ""}` 
                : "Chat"}
            </h1>
            <span className="text-xs text-zinc-400">Online</span>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-black">
          {/* FIX: Check if messages exist before mapping */}
          {!messages || messages.length === 0 ? (
             <div className="text-zinc-500 text-center mt-10">No messages yet. Say Hi!</div>
          ) : (
            <div className="text-center text-zinc-500 text-sm mt-10">
                {messages.map((msg, index) => {
                const isMyMessage = msg.senderId === userId;

                return (
                    <div
                    key={index}
                    className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
                    >
                    <div className="chat-image avatar"></div>
                    <div className="chat-header">
                        {msg.firstName} {msg.lastName}
                        <time className="text-xs opacity-50 ml-1">12:45</time>
                    </div>
                    <div
                        className={`chat-bubble ${
                        isMyMessage ? "bg-blue-600 text-white" : "bg-zinc-700 text-white"
                        }`}
                    >
                        {msg.text}
                    </div>
                    <div className="chat-footer opacity-50">Delivered</div>
                    </div>
                );
                })}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center gap-3">
          <input
            value={newMessage}
            onChange={(e) => setnewMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
            }}
            className="flex-1 bg-black text-white border border-neutral-700 rounded-full px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-500"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="rounded-full px-6 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;