import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Auto-minimize sidebar when a user is selected (on mobile only)
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    
    // Check if we're on mobile (not lg screen) before auto-collapsing
    if (window.innerWidth < 1024) {
      setExpandedMobile(false);
    }
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside 
      className={`h-full border-r border-base-300 flex flex-col transition-all duration-300 relative
        ${expandedMobile ? "w-64" : "w-20"} lg:w-72`}
    >
      {/* Enhanced toggle button for mobile */}
      <button 
        onClick={() => setExpandedMobile(!expandedMobile)}
        className="absolute -right-4 top-20 bg-base-100 p-2 rounded-lg shadow-md lg:hidden z-10 border border-base-300 hover:bg-base-200 transition-colors"
        aria-label={expandedMobile ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expandedMobile ? 
          <X className="size-5 text-primary" /> : 
          <Menu className="size-5 text-primary" />
        }
      </button>

      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className={`font-medium ${expandedMobile ? 'block' : 'hidden'} lg:block`}>
            Contacts
          </span>
        </div>
        
        {/* Online filter toggle - show in mobile when expanded */}
        <div className={`mt-3 ${expandedMobile ? 'flex' : 'hidden'} lg:flex items-center gap-2`}>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className={`relative ${expandedMobile ? 'mx-0' : 'mx-auto'} lg:mx-0`}>
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - visible on larger screens and when mobile is expanded */}
            <div className={`${expandedMobile ? 'block' : 'hidden'} lg:block text-left min-w-0`}>
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;