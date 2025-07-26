import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const ease = (scrollY, max = 1500) => {
  const clamped = Math.min(scrollY, max);
  return (1 - Math.cos(Math.PI * clamped / max)) / 2;
};

const BackgroundAnimation = () => {
  // Instead of useState for scroll, use useMotionValue for smooth motion in framer-motion
  const scrollY = useMotionValue(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollY.set(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollY]);

  // Derive eased value from scrollY using useTransform
  const e = useTransform(scrollY, (value) => ease(value, 1500));

  // Derive layerY positions from eased progress
  const layer1Y = useTransform(e, (val) => val * 120);
  const layer2Y = useTransform(e, (val) => val * 80);
  const layer3Y = useTransform(e, (val) => val * 40);

  // Oscillations based on scrollY value for horizontal motion
  // Compute oscillation as transforms
  const oscX1 = useTransform(scrollY, (val) => Math.sin(val * 0.005) * 60);
  const oscX2 = useTransform(scrollY, (val) => Math.cos(val * 0.007 + 1) * 50);
  const oscX3 = useTransform(scrollY, (val) => Math.sin(val * 0.008 + 2) * 20);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Large slow-moving gradient */}
      <motion.div
        style={{
          y: layer1Y,
          x: oscX1,
        }}
        className="absolute top-[-10%] left-[-8%] w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] bg-gradient-to-tr from-indigo-500 via-blue-400 to-pink-500 rounded-full opacity-40 blur-[120px]"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
      />

      {/* Medium cinematic blob */}
      <motion.div
        style={{
          y: layer2Y,
          x: oscX2,
        }}
        className="absolute bottom-[-8%] right-[-12%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gradient-to-br from-yellow-400 via-pink-400 to-teal-400 rounded-full opacity-30 blur-[100px]"
        animate={{ rotate: [0, -360] }}
        transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
      />

      {/* Small, sharp motion central blob */}
      <motion.div
        style={{
          y: layer3Y,
          x: oscX3,
        }}
        className="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] max-w-[380px] max-h-[380px] bg-gradient-to-r from-purple-400 via-teal-300 to-blue-400 rounded-full opacity-25 blur-[80px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 160, ease: "linear" }}
      />

      {/* Floating orbs */}
      <motion.span
        className="absolute top-[45%] left-[68%] w-16 h-16 rounded-full bg-pink-300 opacity-55 blur-2xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 32, 0],
          rotate: [0, 48, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="absolute top-[26%] right-[44%] w-20 h-20 rounded-full bg-green-300 opacity-40 blur-2xl"
        animate={{
          y: [0, 35, 0],
          x: [0, -40, 0],
          rotate: [0, -42, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
