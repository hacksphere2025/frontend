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

  return <></>;
}
