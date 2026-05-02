import { useState, useEffect } from "react"; // Added useEffect
import api from "../utils/api";
import { MessageSquare, Send, X } from "lucide-react";

// Accept isOpen and onClose from About.jsx props
export default function ChatDrawer({ isOpen: externalOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([{ role: "bot", text: "Hello! How can I help you today?" }]);

  // --- NEW LOGIC TO CONNECT TO ABOUT PAGE ---
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpen(externalOpen);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); 
  };
  // --- END OF NEW LOGIC ---

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = { role: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    
    try {
      const res = await api.post('/bot/chat', { message }); 
      setChat(prev => [...prev, { role: "bot", text: res.data.reply }]);
    } catch (err) {
      console.log(err)
      setChat(prev => [...prev, { role: "bot", text: "Error connecting to AI." }]);
    }
    setMessage("");
  };

  return (
    <>
      {/* Floating trigger remains functional */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 p-5 bg-indigo-600 text-white rounded-full z-50">
        <MessageSquare />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-black border border-white/10 rounded-3xl flex flex-col z-50 overflow-hidden shadow-2xl">
          <div className="p-5 bg-indigo-600 flex justify-between items-center text-white font-bold">
            <span>AI Support</span>
            {/* Updated to use handleClose */}
            <X className="cursor-pointer hover:opacity-70 transition-opacity" onClick={handleClose} />
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input 
              value={message} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Helpful addition for desktop users
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500 transition-colors"
              placeholder="Ask anything..."
            />
            <button onClick={handleSend} className="p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}