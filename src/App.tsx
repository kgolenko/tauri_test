import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [progress, setProgress] = useState(51);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 30);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => setLoadingComplete(true), 500);
    }
  }, [progress]);

  const reset = () => {
    setLoadingComplete(false);
    setProgress(0);
  };

  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-center h-screen"
    >
      <AnimatePresence>
        {!loadingComplete ? (
          <motion.div
            className="relative bg-white rounded-full flex flex-col items-center space-y-4"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {/* Круговой прогресс */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>

              {/* Левая половина прогресса */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-600"
                style={{
                  clipPath: "inset(0 50% 0 0)",
                  transform:
                    progress >= 50
                      ? "rotate(180deg)"
                      : `rotate(${(progress / 50) * 180}deg)`,
                }}
                animate={{
                  transform:
                    progress >= 50
                      ? "rotate(180deg)"
                      : `rotate(${(progress / 50) * 180}deg)`,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Правая половина прогресса */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-600"
                style={{
                  clipPath: "inset(0 0 0 50%)",
                  transform:
                    progress >= 50
                      ? `rotate(${(progress - 50) * 3.6}deg)`
                      : "rotate(0deg)",
                  opacity: progress >= 50 ? 1 : 0,
                }}
                animate={{
                  transform:
                    progress >= 50
                      ? `rotate(${(progress - 50) * 3.6}deg)`
                      : "rotate(0deg)",
                  opacity: progress >= 50 ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Процент прогресса */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-blue-600">
                {progress}%
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            data-tauri-drag-region
            className="p-6 rounded-lg shadow-lg bg-white w-full h-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Загрузка завершена!
            </h2>
            <button
              onClick={() => reset()}
              className="bg-blue-400 px-6 py-2 rounded-lg"
            >
              Reset
            </button>
            <p className="text-gray-600">Добро пожаловать!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
