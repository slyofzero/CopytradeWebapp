import { LuCopy } from "react-icons/lu";
import { useState } from "react";

interface CopyProps {
  value: string;
}

export const Copy = ({ value }: CopyProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setIsClicked(true); // Set the button state to clicked
        setTimeout(() => setIsClicked(false), 1000); // Reset state after 2 seconds
      })
      .catch(() => {
        setIsClicked(false);
      });
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`p-2 rounded-md ${
        isClicked ? "bg-green-500" : "bg-primary"
      } transition duration-300`}
    >
      <LuCopy />
    </button>
  );
};
