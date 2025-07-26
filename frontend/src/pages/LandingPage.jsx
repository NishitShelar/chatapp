import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Spline from '@splinetool/react-spline';

// ScrollSection to show one section at a time with reversible scroll animations
const ScrollSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Corrected: Call controls.start() inside useEffect only after mount and when inView changes
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50, pointerEvents: "none" },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-28 py-20"
    >
      {children}
    </motion.section>
  );
};

// Testimonials data
const testimonials = [
  {
    name: "Sachin S",
    role: "Software Engineer",
    photo: "/person.svg",
    text:
      "Breeze Chat transformed my team's communication. The smooth animations and privacy features make it an absolute joy.",
  },
  {
    name: "Deepa N",
    role: "Product Designer",
    photo: "/person.svg",
    text:
      "The interface of Breeze Chat is both intuitive and beautiful. It lets me focus on collaboration without distractions.",
  },
  {
    name: "ShivSagar S",
    role: "Project Manager",
    photo: "/person.svg",
    text:
      "Real-time synchronization and group tools have boosted our project efficiency tremendously. Highly recommended!",
  },
];

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen z-10 bg-white flex flex-col">
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none" style={{
      transform: "scale(1.05) translate(10%, 10%)",
      transformOrigin: "center center",
    }}>
        <Spline scene="https://prod.spline.design/wyLh-zFlZ88ZgPEp/scene.splinecode" />
      </div>
      {/* Hero Section wrapped in ScrollSection */}
      <ScrollSection>
        <motion.div
          className="relative w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-28 py-8 lg:py-16 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Content */}
          <motion.div
            className="flex-1 w-full lg:max-w-md text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[110%] tracking-[-0.96px] text-black mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect Effortlessly with Breeze Chat App
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base font-medium leading-[120%] lg:leading-[110%] tracking-[-0.32px] text-black mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Breeze offers a seamless chat experience designed for teams and friends alike.
              Engage in meaningful conversations with our intuitive interface and robust features.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-full"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseMove={handleMouseMove}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 rounded-full"
                  style={{
                    background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3), transparent 70%)`,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Link
                  to="/signup"
                  className="relative block px-8 py-4 bg-white border border-black rounded-full text-base font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-full"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseMove={handleMouseMove}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 rounded-full"
                  style={{
                    background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3), transparent 70%)`,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Link
                  to="/login"
                  className="relative block px-8 py-4 border border-black rounded-full text-base font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Right Hero Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <motion.img
              src="/hero.png"
              alt="Breeze Chat Interface"
              className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[771px] h-auto aspect-[771/486] rounded-[20px] lg:rounded-[30px] object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Features Section wrapped */}
      <ScrollSection>
        <motion.div
          className="py-12 lg:py-20 px-4 sm:px-8 lg:px-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-normal leading-[110%] tracking-[-0.96px] text-black mb-6 lg:mb-8 max-w-lg mx-auto px-4">
              Experience Private Messaging Like Never Before
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-20">
            {/* Feature Image */}
            <motion.div
              className="order-2 lg:order-1 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.img
                src="/feature.png"
                alt="Private Messaging Features"
                className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[487px] h-auto aspect-[487/444] rounded-[20px] lg:rounded-[30px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {/* Feature List */}
            <motion.div
              className="order-1 lg:order-2 space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                "Your messages are encrypted for ultimate privacy.",
                "Lightning-fast delivery with real-time synchronization.",
                "Seamless collaboration tools for teams and groups.",
              ].map((text, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src="/breeze2.png" alt="Feature" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div>
                    <p className="text-base sm:text-lg lg:text-xl font-normal leading-[120%] lg:leading-[110%] tracking-[-0.4px] text-black">
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </ScrollSection>

      {/* Steps Section wrapped */}
      <ScrollSection>
        <motion.div
          className="py-12 lg:py-20 px-4 sm:px-8 lg:px-28 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-normal leading-[110%] tracking-[-0.96px] text-black mb-6 lg:mb-8 max-w-lg mx-auto px-4">
              Seamless Conversations with Breeze Chat
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {[
              {
                image: "/step1.png",
                alt: "Get Started",
                title: "Follow these simple steps to maximize your Breeze Chat experience.",
                link: "/signup",
                linkText: "Get Started >",
              },
              {
                image: "/step2.png",
                alt: "Customize Profile",
                title: "Customize your profile for a personalized chat experience with Breeze.",
                link: "/profile",
                linkText: "Customize >",
              },
              {
                image: "/step3.png",
                alt: "Join Groups",
                title: "Engage in group chats to foster collaboration and teamwork.",
                link: "/chat",
                linkText: "Join Now >",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                  delay: 0.4 + index * 0.2,
                }}
                whileHover={{ y: -10 }}
              >
                <motion.img
                  src={step.image}
                  alt={step.alt}
                  className="w-full max-w-[374px] h-[232px] rounded-[30px] object-cover mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.h3
                  className="text-xl font-semibold leading-[110%] tracking-[-0.4px] text-black mb-4 max-w-[375px] mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={step.link}
                    className="text-base font-medium leading-[110%] tracking-[-0.32px] text-black hover:text-blue-600 transition-colors"
                  >
                    {step.linkText}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.div
                className="relative overflow-hidden rounded-full"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseMove={handleMouseMove}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 rounded-full"
                  style={{
                    background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3), transparent 70%)`,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Link
                  to="/login"
                  className="relative block px-8 py-4 border border-black rounded-full text-base font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-full"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseMove={handleMouseMove}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 rounded-full"
                  style={{
                    background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.3), transparent 70%)`,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Link
                  to="/signup"
                  className="relative block px-8 py-4 border border-black rounded-full text-base font-medium text-black hover:bg-gray-50 transition-colors"
                >
                  Sign Up &gt;
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Testimonials Section wrapped */}
      <ScrollSection>
        <motion.div
          className="py-12 sm:py-20 px-4 sm:px-8 lg:px-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-normal leading-[110%] tracking-[-0.96px] text-black mb-6 lg:mb-8 max-w-lg mx-auto">
              What Our Users Say About Breeze Chat
            </h2>
          </motion.div>
          {/* Three testimonial cards as grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map(({ name, role, photo, text }, i) => (
              <motion.div
                key={name}
                className="bg-white rounded-[30px] p-8 shadow-lg flex flex-col items-center"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={photo}
                  alt={`${name} photo`}
                  className="w-20 h-20 rounded-full mb-4 shadow-sm object-cover"
                />
                <p className="italic mb-6 text-gray-700">"{text}"</p>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-gray-500">{role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ScrollSection>

      {/* CTA Section wrapped */}
      <ScrollSection>
        <motion.div
          className="py-12 sm:py-20 px-4 sm:px-8 lg:px-28 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-5xl font-normal leading-[110%] tracking-[-0.96px] text-black mb-6 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join the Breeze Community Today
              </motion.h2>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-full"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseMove={handleMouseMove}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 rounded-full"
                    style={{
                      background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 70%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Link
                    to="/signup"
                    className="relative block px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
                <motion.div
                  className="relative overflow-hidden rounded-full"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseMove={handleMouseMove}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 rounded-full"
                    style={{
                      background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 70%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Link
                    to="/login"
                    className="relative block px-8 py-4 border border-black rounded-full text-base font-medium text-black hover:bg-gray-50 transition-colors"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.img
                src="/prefooter.png"
                alt="Join Community"
                className="w-full max-w-[574px] h-auto rounded-[30px] object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollSection>

      {/* Footer remains unchanged */}
      <motion.footer
        className=" px-4 sm:px-8 lg:px-28 bg-white border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 justify-center md:justify-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.img
              src="/logo.png"
              alt="Breeze Logo"
              className="w-40 h-40 sm:w-40 sm:h-40 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div
            className="flex items-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { to: "/", text: "Home" },
              { to: "/signup", text: "Sign Up" },
              { to: "/login", text: "Login" },
            ].map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  to={link.to}
                  className="text-base font-medium leading-[110%] tracking-[-0.32px] text-black hover:text-blue-600 transition-colors"
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-base font-medium leading-[110%] tracking-[-0.32px] text-black text-center md:text-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            © 2025 Breeze. All rights reserved.
          </motion.div>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
