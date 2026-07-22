import { useState } from "react";
import { motion } from "framer-motion";

interface CinematicVideoBgProps {
  src: string;
  overlayOpacity?: number;
  overlayGradient?: string;
  className?: string;
  poster?: string;
}

export function CinematicVideoBg({
  src,
  overlayOpacity = 0.6,
  overlayGradient = "bg-gradient-to-b from-black/80 via-black/40 to-black/90",
  className = "",
  poster = "",
}: CinematicVideoBgProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {/* The Video Element */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        onCanPlay={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        style={{ filter: "contrast(1.2) brightness(0.9)" }} // Enhances cinematic look
      >
        <source src={src} type="video/mp4" />
      </motion.video>

      {/* The Dark Overlay for Text Readability */}
      <div 
        className={`absolute inset-0 pointer-events-none ${overlayGradient}`}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
