import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);

  // Defensive: If no selectedUser or authUser, render nothing
  if (!selectedUser || !authUser) return null;

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-base-100 sm:rounded-2xl shadow-xl animate-fade-in">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-2 py-2 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in">
        {messages.map((message, idx) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} animate-fade-in-up`}
            ref={idx === messages.length - 1 ? messageEndRef : null}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border-2 border-base-300 shadow-md">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={`chat-bubble flex flex-col shadow-md transition-all duration-300 ${
                message.senderId === authUser._id
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              }`}
              style={{ borderRadius: 18, minWidth: 60, maxWidth: 320 }}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 shadow cursor-pointer"
                  onClick={() => setModalImage(message.image)}
                />
              )}
              {message.text && <p className="text-base leading-relaxed">{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="shrink-0">
        <MessageInput />
      </div>
      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Enlarged" className="max-w-full max-h-full rounded-xl shadow-2xl border-4 border-white" />
        </div>
      )}
    </div>
  );
};
export default ChatContainer;

// Add animation utility
// In your global CSS (index.css or tailwind.config.js), add:
// .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }