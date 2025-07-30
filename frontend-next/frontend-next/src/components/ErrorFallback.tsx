'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

const funnyMessages = [
  "Oops! Something broke. 🤖",
  "Well, this is awkward... 😅",
  "Even the best pages take a break sometimes.",
  "404% effort, 0% success. Try again!",
  "The server went on a coffee break ☕",
];

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  message,
  onRetry = () => window.location.reload(),
}) => {
  const [randomMessage, setRandomMessage] = useState<string>("");

  useEffect(() => {
    const getRandomMessage = () =>
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setRandomMessage(getRandomMessage());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <motion.img
        src="/error.png"
        alt="Error"
        className="w-36 h-36 mb-4"
        loading="lazy"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
      />

      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
        {message ?? (randomMessage || "Something went wrong")}
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        Let’s give it another shot!
      </p>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
      >
        <span className="text-lg">🔄</span>
        <span>Retry</span>
      </motion.button>
    </motion.div>
  );
};

export default ErrorFallback;
