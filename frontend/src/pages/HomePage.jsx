import { Link } from "react-router-dom";

const features = [
  {
    title: "Secure Messaging",
    description: "End-to-end encrypted conversations to keep your chats private and safe.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366f1"/><path d="M12 17a5 5 0 0 0 5-5V9a5 5 0 1 0-10 0v3a5 5 0 0 0 5 5Zm0 0v2m-3 0h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Easy and Simple UI",
    description: "A clean, modern interface that makes chatting effortless for everyone.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366f1"/><path d="M8 12h8M8 16h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Quick, Effortless Chat",
    description: "Get started instantly and chat with anyone, anytime, with no hassle.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#6366f1"/><path d="M12 19V5m0 0-4 4m4-4 4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

const testimonials = [
  {
    name: "Sachin S",
    text: "Breeze is so easy to use and just works. Love the simplicity!",
  },
  {
    name: "Deepa N",
    text: "The UI is clean and modern. I can chat with anyone instantly!",
  },
  {
    name: "Varsha S",
    text: "No distractions, just quick and secure messaging. Perfect for me!",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-teal-100 animate-fade-in">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 px-4 bg-gradient-to-br from-indigo-400/30 via-white/80 to-teal-200/40 animate-fade-in relative overflow-hidden">
        {/* Animated background SVGs for hero */}
        <svg className="absolute left-0 top-0 w-40 h-40 opacity-20 animate-float hidden sm:block" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#6366f1" /></svg>
        <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-10 animate-float-delay hidden sm:block" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="#06b6d4" /></svg>
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <img src="/breeze1.png" alt="Breeze Logo" className="w-16 h-16 mb-4 animate-float" />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-indigo-700 mb-4 drop-shadow-lg animate-fade-in">Breeze</h1>
          <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl animate-fade-in">
            Chat securely, connect instantly. Breeze is the next-generation messaging platform for teams, friends, and everyone in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in w-full sm:w-auto">
            <Link to="/signup" className="btn px-8 py-3 text-lg font-semibold rounded-lg shadow-lg bg-indigo-600 text-white border-none hover:bg-indigo-700 transition-all w-full sm:w-auto">Get Started</Link>
            <Link to="/login" className="btn btn-outline px-8 py-3 text-lg font-semibold rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all w-full sm:w-auto">Login</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-transparent animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-indigo-800">Why Choose Breeze?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center border border-indigo-100 hover:shadow-2xl transition-all animate-fade-in">
                <div className="mb-4 animate-float-delay" style={{ animationDelay: `${i * 0.2}s` }}>{f.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700">{f.title}</h3>
                <p className="text-gray-500 text-sm sm:text-base">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat UI Mockup Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-100/60 via-white/80 to-teal-100/60 animate-fade-in">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-indigo-800 animate-fade-in">See Breeze in Action</h2>
          <div className="w-full max-w-2xl rounded-2xl shadow-2xl p-4 sm:p-8 border border-indigo-100 bg-white/80 backdrop-blur-lg animate-fade-in">
            {/* Simple chat mockup */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-end">
                <img src="/avatar.png" alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow" />
                <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-2 text-left max-w-[70vw] sm:max-w-xs shadow bg-indigo-100 text-indigo-900 text-sm sm:text-base">Hey! Is this the new Breeze chat app?</div>
              </div>
              <div className="flex gap-2 items-end justify-end">
                <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-2 text-right max-w-[70vw] sm:max-w-xs shadow bg-indigo-600 text-white text-sm sm:text-base">Yes! It’s fast, secure, and beautiful. 🚀</div>
                <img src="/avatar.png" alt="You" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow" />
              </div>
              <div className="flex gap-2 items-end">
                <img src="/avatar.png" alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow" />
                <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-2 text-left max-w-[70vw] sm:max-w-xs shadow bg-indigo-100 text-indigo-900 text-sm sm:text-base">How do I get started?</div>
              </div>
              <div className="flex gap-2 items-end justify-end">
                <div className="rounded-2xl px-3 py-2 sm:px-4 sm:py-2 text-right max-w-[70vw] sm:max-w-xs shadow bg-indigo-600 text-white text-sm sm:text-base">Just sign up and start chatting!</div>
                <img src="/avatar.png" alt="You" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border shadow" />
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-500 text-xs sm:text-sm animate-fade-in">A modern, lively chat experience.</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 px-4 bg-transparent animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-indigo-800">What Our Users Say</h2>
          <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide justify-center items-stretch">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col justify-between bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-indigo-100 animate-fade-in min-w-[220px] max-w-xs flex-shrink-0">
                <p className="text-base sm:text-lg mb-4 text-gray-700">“{t.text}”</p>
                <div className="font-semibold text-indigo-700">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-indigo-50/80 py-8 mt-auto border-t border-indigo-100 animate-fade-in">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <img src="/breeze1.png" alt="Breeze Logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-indigo-700">Breeze</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-indigo-500 items-center justify-center">
            <Link to="/" className="hover:text-indigo-700 transition">Home</Link>
            <Link to="/signup" className="hover:text-indigo-700 transition">Sign Up</Link>
            <Link to="/login" className="hover:text-indigo-700 transition">Login</Link>
          </div>
          <div className="text-indigo-400 text-xs sm:text-sm mt-4 md:mt-0">© {new Date().getFullYear()} Breeze. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;