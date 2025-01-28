import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 z-[999] right-4 p-4 rounded-lg shadow-lg ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {message}
    </div>
  );
}
