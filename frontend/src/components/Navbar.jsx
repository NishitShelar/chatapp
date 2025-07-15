import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Menu } from "lucide-react";
import { useState, useRef } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-sm animate-fade-in"
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Home */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-all" aria-label="Go to home page">
          <img src="/breeze1.png" alt="Breeze Logo" className="w-9 h-9 rounded-lg shadow-md" />
          <span className="text-xl font-bold tracking-tight text-primary">Breeze</span>
        </Link>
        {/* Desktop Navigation & Actions */}
        <nav className="hidden md:flex items-center gap-4" aria-label="Main navigation">
          {/* Home always visible except on home page */}
          {location.pathname !== "/" && (
            <Link to="/" className="btn btn-outline px-5 py-2 rounded-lg font-semibold text-primary border-primary">Home</Link>
          )}
          {authUser && (
            <Link to="/chat" className="btn btn-primary px-5 py-2 rounded-lg font-semibold text-white">Chat</Link>
          )}
          {!authUser && location.pathname === "/" && (
            <>
              <Link to="/signup" className="btn btn-primary px-5 py-2 rounded-lg font-semibold text-white">Get Started</Link>
              <Link to="/login" className="btn btn-outline px-5 py-2 rounded-lg font-semibold text-primary border-primary">Login</Link>
            </>
          )}
          <Link to={"/settings"} className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors" aria-label="Settings" tabIndex={0} role="link">
            <Settings className="w-5 h-5 text-primary" />
          </Link>
          {authUser && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="btn btn-ghost btn-circle flex items-center justify-center hover:bg-base-200 transition-colors focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="User menu"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                tabIndex={0}
                role="button"
              >
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border border-primary shadow-sm object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 border border-base-300 rounded-lg shadow-lg py-2 z-50 animate-fade-in" role="menu" aria-label="User menu dropdown">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 transition-colors text-sm"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-base-200 transition-colors text-sm"
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-base-200 transition-colors text-sm text-left"
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
        {/* Mobile Hamburger - move to right */}
        <button
          className="md:hidden btn btn-ghost btn-circle flex items-center justify-center hover:bg-base-200 transition-colors focus:outline-none ml-auto"
          onClick={() => setMobileNavOpen((open) => !open)}
          aria-label="Open mobile menu"
        >
          <Menu className="w-7 h-7 text-primary" />
        </button>
        {/* Mobile Nav Drawer - smaller width */}
        {mobileNavOpen && (
          <div
            className="fixed inset-y-0 right-0 z-[9999] flex flex-col md:hidden w-72 h-80 bg-base-100 dark:bg-base-900 shadow-2xl border-l border-base-300"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Dropdown sheet content */}
            <div className="relative z-10 w-full flex-1 flex flex-col min-h-screen">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src="/breeze1.png" alt="Breeze Logo" className="w-8 h-8 rounded-lg shadow-md" />
                  <span className="text-lg font-bold tracking-tight text-primary">Breeze</span>
                </div>
                <button
                  className="btn btn-ghost btn-circle flex items-center justify-center hover:bg-base-200 transition-colors focus:outline-none"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <Menu className="w-7 h-7 text-primary" />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-6 pb-6">
                {location.pathname !== "/" && (
                  <Link to="/" className="btn btn-outline w-full" onClick={() => setMobileNavOpen(false)}>Home</Link>
                )}
                {authUser && <Link to="/chat" className="btn btn-primary w-full" onClick={() => setMobileNavOpen(false)}>Chat</Link>}
                {!authUser && location.pathname === "/" && (
                  <>
                    <Link to="/signup" className="btn btn-primary w-full" onClick={() => setMobileNavOpen(false)}>Get Started</Link>
                    <Link to="/login" className="btn btn-outline w-full" onClick={() => setMobileNavOpen(false)}>Login</Link>
                  </>
                )}
                {authUser && (
                  <Link to="/profile" className="btn btn-ghost w-full" onClick={() => setMobileNavOpen(false)}>Profile</Link>
                )}
                <Link to={"/settings"} className="btn btn-ghost w-full" onClick={() => setMobileNavOpen(false)}>Settings</Link>
                {authUser && (
                  <button
                    className="btn btn-ghost w-full flex items-center gap-2 mt-2"
                    onClick={() => { setMobileNavOpen(false); logout(); }}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;