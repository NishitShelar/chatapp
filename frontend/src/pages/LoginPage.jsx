import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-teal-100 px-4 py-8 animate-fade-in">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-indigo-100 animate-fade-in">
        {/* Left: Product Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-blue-500 text-white px-10 py-12 w-1/2 animate-fade-in">
          <img src="/breeze1.png" alt="Breeze Logo" className="w-14 h-14 mb-4 animate-float" />
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight drop-shadow">Welcome to Breeze</h1>
          <p className="mb-6 text-lg text-blue-100 text-center">Chat securely, connect instantly. Join the next-generation messaging platform.</p>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>• End-to-end encrypted messaging</li>
            <li>• Group chats & file sharing</li>
            <li>• Fast, modern, and beautiful UI</li>
          </ul>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 animate-fade-in">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:hidden">
              <img src="/breeze1.png" alt="Breeze Logo" className="w-12 h-12 mx-auto mb-2 animate-float" />
              <h1 className="text-2xl font-bold text-indigo-700">Welcome to Breeze</h1>
              <p className="text-gray-500">Chat securely, connect instantly.</p>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Sign in to your account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-indigo-700">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 bg-white/80"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-indigo-700">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 bg-white/80"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-indigo-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-indigo-300" />
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn w-full bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow hover:shadow-lg transition-all" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-500">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="link text-indigo-600 font-medium">Create account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;