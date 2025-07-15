import { useState } from 'react';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-teal-100 px-4 py-8 animate-fade-in">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-indigo-100 animate-fade-in">
        {/* Left: Product Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-blue-500 text-white px-10 py-12 w-1/2 animate-fade-in">
          <img src="/breeze1.png" alt="Breeze Logo" className="w-14 h-14 mb-4 animate-float" />
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight drop-shadow">Join Breeze</h1>
          <p className="mb-6 text-lg text-blue-100 text-center">Create your free account and start chatting securely with friends and teams.</p>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>• End-to-end encrypted messaging</li>
            <li>• Group chats & file sharing</li>
            <li>• Fast, modern, and beautiful UI</li>
          </ul>
        </div>
        {/* Right: Signup Form */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 animate-fade-in">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:hidden">
              <img src="/breeze1.png" alt="Breeze Logo" className="w-12 h-12 mx-auto mb-2 animate-float" />
              <h1 className="text-2xl font-bold text-indigo-700">Join Breeze</h1>
              <p className="text-gray-500">Create your free account and start chatting.</p>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Create your account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-indigo-700">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 bg-white/80"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
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
              <button type="submit" className="btn w-full bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow hover:shadow-lg transition-all" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="link text-indigo-600 font-medium">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;