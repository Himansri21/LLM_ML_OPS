// src/components/Home/FloatingButton.jsx
import { useNavigate } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 items-end">
      {/* Chatbot Button */}
      <button
        onClick={() => navigate("/chatbot")}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center justify-center"
        title="Chat with us"
      >
        <IoIosChatbubbles size={28} />
      </button>

      {/* Contact Button */}
      <button
        onClick={() => navigate("/contact")}
        className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        Contact Us
      </button>
    </div>
  );
}
