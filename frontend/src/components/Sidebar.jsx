import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Menu, X, User } from "lucide-react";

const Sidebar = ({ onUserSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (onUserSelect) onUserSelect(user);
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
      className={`h-full flex flex-col transition-all duration-300 relative bg-base-100 text-base-content shadow-xl animate-fade-in ${expandedMobile ? "w-64" : "w-20"} lg:w-72 rounded-r-2xl border-r border-base-300`}
      style={{ minWidth: expandedMobile ? 256 : 80 }}
      role="complementary"
      aria-label="Sidebar with contacts"
    >
      {/* Enhanced toggle button for mobile */}
      <button
        onClick={() => setExpandedMobile(!expandedMobile)}
        className="absolute -right-4 top-20 bg-base-100 text-primary p-2 rounded-lg shadow-md lg:hidden z-10 border border-base-300 hover:bg-base-200 transition-colors animate-fade-in"
        aria-label={expandedMobile ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expandedMobile ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div className="border-b border-base-300 w-full p-5 flex items-center gap-2 animate-fade-in">
        <Users className="size-6 text-primary/80" />
        <span className={`font-semibold tracking-wide text-primary/90 ${expandedMobile ? 'block' : 'hidden'} lg:block`}>Contacts</span>
      </div>

      {/* Online filter toggle - show in mobile when expanded */}
      <div className={`mt-3 px-5 ${expandedMobile ? 'flex' : 'hidden'} lg:flex items-center gap-2 animate-fade-in`}> 
        <label className="cursor-pointer flex items-center gap-2" title="Show only online users">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm border-base-300"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-base-content/70">({onlineUsers.length - 1} online)</span>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1 animate-fade-in" role="listbox" aria-label="User contacts">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`w-full p-3 flex items-center gap-3 group hover:bg-base-200 focus:bg-base-200 transition-colors rounded-xl mb-1 ${selectedUser?._id === user._id ? "bg-base-200 ring-2 ring-primary/40" : ""}`}
            title={user.fullName}
            role="option"
            aria-selected={selectedUser?._id === user._id}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') handleUserSelect(user);
            }}
          >
            <div className={`relative ${expandedMobile ? 'mx-0' : 'mx-auto'} lg:mx-0`}>
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-base-300 shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-emerald-400 rounded-full ring-2 ring-base-100" title="Online" />
              )}
            </div>
            {/* User info - visible on larger screens and when mobile is expanded */}
            <div className={`${expandedMobile ? 'block' : 'hidden'} lg:block text-left min-w-0 flex-1`}> 
              <div className="font-medium truncate flex items-center gap-1">
                <User className="w-4 h-4 text-primary/70 mr-1" />
                {user.fullName}
              </div>
              <div className="text-xs text-base-content/70">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/70 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;