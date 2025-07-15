import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100 rounded-2xl shadow-xl animate-fade-in">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative animate-float">
            <div
              className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-primary">Welcome to Breeze!</h2>
        <p className="text-base-content/70">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;