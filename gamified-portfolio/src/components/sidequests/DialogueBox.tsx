import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface DialogueBoxProps {
  text: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function DialogueBox({ text, onClose, isOpen }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && text) {
      setDisplayedText("");
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
      setIsTyping(false);
    }
  }, [isOpen, text]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 cursor-pointer pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (isTyping) {
              setDisplayedText(text);
              setIsTyping(false);
            } else {
              onClose();
            }
          }}
        >
          <div className="relative w-full h-auto">
            <Image 
              src="/sidequests/dialoguebox.png" 
              alt="Dialogue Box" 
              width={800} 
              height={200}
              className="w-full h-auto drop-shadow-2xl"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute inset-0 p-8 md:p-12 flex items-start">
              <p className="text-white text-sm md:text-xl font-bold leading-relaxed whitespace-pre-wrap" style={{ textShadow: "2px 2px 0px #000" }}>
                {displayedText}
              </p>
            </div>
            {!isTyping && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute bottom-8 right-12 w-6 h-6 md:w-8 md:h-8"
              >
                <Image 
                  src="/sidequests/actionindicator.png" 
                  alt="Continue" 
                  width={32} 
                  height={32}
                  className="w-full h-full"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
