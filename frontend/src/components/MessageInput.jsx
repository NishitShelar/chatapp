import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from 'browser-image-compression';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    try {
      // Compress and resize image to fit under 40KB and max 800x800px, higher quality
      const options = {
        maxSizeMB: 0.04, // 40KB
        maxWidthOrHeight: 800,
        useWebWorker: true,
        maxIteration: 10,
        fileType: 'image/jpeg',
        initialQuality: 0.85,
      };
      const compressedFile = await imageCompression(file, options);
      if (compressedFile.size > 41000) {
        toast.error("Image is too large even after compression. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      toast.error("Failed to compress image. Try a different one.");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center shadow hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-primary transition-all"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Image upload input - hidden */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={galleryInputRef}
          onChange={handleImageChange}
        />
        {/* Image upload input - hidden for camera */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          ref={cameraInputRef}
          onChange={handleImageChange}
        />
        {/* Image upload button - visible on all screens */}
        <button
          type="button"
          className={`btn btn-sm btn-circle border border-base-300 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary transition-all ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={() => {
            if (galleryInputRef.current) {
              galleryInputRef.current.click();
            }
          }}
          aria-label="Attach image"
        >
          <Image size={18} />
        </button>
        {/* Add a visible camera button */}
        <button
          type="button"
          className="btn btn-sm btn-circle border border-base-300 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary transition-all text-primary"
          onClick={() => {
            if (cameraInputRef.current) {
              cameraInputRef.current.click();
            }
          }}
          aria-label="Take photo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h2l2-3h6l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2zm9 4a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
        {/* Text input */}
        <div className="flex-1">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-all"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* Send button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle border border-base-300 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary transition-all"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;