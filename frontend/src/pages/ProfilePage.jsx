import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-teal-100 pt-20 animate-fade-in">
      <div className="w-full max-w-2xl mx-auto p-4 sm:py-10 flex-1 flex flex-col justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-4 sm:p-8 space-y-8 border border-indigo-100 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>
          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 border-2 border-white shadow-lg ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Tap the camera to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-base break-words">{authUser?.fullName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border text-base break-words">{authUser?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-100 rounded-xl p-4 sm:p-6 border border-base-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-primary">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-base-200">
                <span>Member Since</span>
                <span className="font-medium text-base-content/80">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;