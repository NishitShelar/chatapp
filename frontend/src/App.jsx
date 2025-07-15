import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, Suspense, useState, useRef } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
// Add transition group for route transitions
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/ChatPage";

// Top progress bar component
const TopProgressBar = ({ loading }) => (
  <div
    className={`fixed top-0 left-0 w-full h-1 z-[9999] transition-all duration-300 ${loading ? 'opacity-100' : 'opacity-0'}`}
    style={{ background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)' }}
  >
    <div className={`h-full animate-progress-bar`} style={{ width: loading ? '100%' : '0%' }} />
  </div>
);

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen for route changes to show loading bar
  useEffect(() => {
    setRouteLoading(true);
    const timeout = setTimeout(() => setRouteLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <ErrorBoundary>
      <div data-theme={theme}>
        <TopProgressBar loading={routeLoading} />
        <Navbar />
        <TransitionGroup component={null}>
          <CSSTransition key={location.pathname} classNames="fade-page" timeout={350} nodeRef={nodeRef}>
            <div ref={nodeRef} className="min-h-screen">
              <Suspense fallback={<div className="flex items-center justify-center h-[60vh]"><Loader className="size-10 animate-spin text-primary" /></div>}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/chat" />} />
                  <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/chat" />} />
                  <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
                  <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
                  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
};
export default App;

// Add fade-page and progress-bar animation to index.css:
// .fade-page-enter { opacity: 0; transform: translateY(24px); }
// .fade-page-enter-active { opacity: 1; transform: none; transition: opacity 350ms, transform 350ms; }
// .fade-page-exit { opacity: 1; }
// .fade-page-exit-active { opacity: 0; transition: opacity 350ms; }
// .animate-progress-bar { animation: progressBar 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
// @keyframes progressBar { from { width: 0%; } to { width: 100%; } }