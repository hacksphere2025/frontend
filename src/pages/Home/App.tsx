import { useState, useEffect } from "react";

const words = ["Fresh", "Organic", "Healthy", "Delicious"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout;

    if (!deleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, deleting, index]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 transition-all duration-500">
      <h1 className="text-5xl sm:text-9xl font-extrabold text-gray-800 dark:text-white mb-4">
        Welcome to{" "}
        <span className="text-green-600 dark:text-green-400">FreshMart</span>
      </h1>
      <h2 className="text-3xl sm:text-7xl font-semibold text-gray-600 dark:text-gray-300">
        <span>Your destination for </span>
        <span className="text-green-500 dark:text-green-300 transition-all duration-300">
          {displayText}
        </span>
      </h2>
    </div>
  );
}
