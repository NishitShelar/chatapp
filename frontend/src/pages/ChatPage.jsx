import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import BreezeLogo from '/breeze1.png';

const ChatPage = () => {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Responsive isMobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset showChat if user logs out
  useEffect(() => {
    setShowChat(false);
  }, [authUser]);

  // If a chat is selected on mobile, show chat UI
  useEffect(() => {
    if (isMobile && selectedUser) {
      setShowChat(true);
    }
    // If no chat is selected, go back to sidebar
    if (isMobile && !selectedUser) {
      setShowChat(false);
    }
  }, [isMobile, selectedUser]);

  if (!authUser) return null;

  return (
    <div className={`min-h-screen flex flex-col bg-base-200 px-0 sm:px-4 animate-fade-in ${isMobile ? 'pt-20' : 'pt-20'}`}> {/* pt-4 for mobile, pt-20 for desktop */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row h-[calc(100vh-6rem)] rounded-3xl shadow-2xl overflow-hidden border border-base-300 bg-base-100 animate-fade-in">
        {/* Mobile: Sidebar always open, chat overlays with back arrow */}
        {isMobile && showChat && selectedUser ? (
          <div className="fixed inset-0 z-40 bg-base-100 flex flex-col animate-fade-in"> {/* Fullscreen overlay for mobile chat */}
            {/* Back arrow */}
            <button
              className="absolute top-4 left-4 z-50 btn btn-primary btn-circle shadow-lg border-2 border-white"
              onClick={() => setShowChat(false)}
              aria-label="Back to contacts"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <ArrowLeft className="w-7 h-7 text-primary" />
            </button>
            <div className="flex-1 flex flex-col h-full">
              <ChatContainer />
            </div>
          </div>
        ) : null}
        {isMobile && (!showChat || !selectedUser) ? (
          <div className="flex-1 flex flex-col animate-fade-in relative overflow-hidden">
            {/* Full-screen animated SVG background */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-200 via-white to-teal-200 z-0">
              <svg className="absolute left-0 top-0 w-40 h-40 opacity-20 animate-float" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#6366f1" /></svg>
              <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 animate-float-delay" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="#06b6d4" /></svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <img src={BreezeLogo} alt="Breeze Logo" className="w-32 h-32 opacity-10 mb-4" />
                <span className="text-5xl font-extrabold tracking-tight text-indigo-400 opacity-10 drop-shadow-lg">Breeze</span>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
              <Sidebar onUserSelect={() => setShowChat(true)} />
            </div>
          </div>
        ) : null}
        {!isMobile && (
          <>
            {/* Sidebar (hidden on mobile, visible on sm+) */}
            <div className="hidden sm:block h-full w-72 bg-base-100 text-base-content flex-shrink-0 animate-fade-in border-r border-base-300">
              <Sidebar />
            </div>
            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full animate-fade-in bg-gradient-to-br from-indigo-200 via-white to-teal-200 relative overflow-hidden">
              {/* Animated SVG background */}
              <svg className="absolute left-0 top-0 w-60 h-60 opacity-20 animate-float z-0" viewBox="0 0 300 300"><circle cx="150" cy="150" r="150" fill="#6366f1" /></svg>
              <svg className="absolute right-0 bottom-0 w-48 h-48 opacity-10 animate-float-delay z-0" viewBox="0 0 300 300"><rect width="300" height="300" rx="150" fill="#06b6d4" /></svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                <img src={BreezeLogo} alt="Breeze Logo" className="w-40 h-40 opacity-10 mb-4" />
                <span className="text-7xl font-extrabold tracking-tight text-indigo-400 opacity-10 drop-shadow-lg">Breeze</span>
              </div>
              <div className="flex-1 flex flex-col h-full z-10">
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ChatPage; 