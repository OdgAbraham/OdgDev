import { useEffect, useState } from "react";
import { Copy, Share2, X } from "lucide-react";

interface UltraResultProps {
  message: string;
  onClose: () => void;
  url?: string;
}

export default function UltraResult({ message, onClose, url }: UltraResultProps) {
  const [displayed, setDisplayed] = useState("");
  const [copied, setCopied] = useState(false);

  // Effet “décryptage” : affiche lettre par lettre
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + message[index]);
      index++;
      if (index >= message.length) clearInterval(interval);
    }, 30); // vitesse d’affichage
    return () => clearInterval(interval);
  }, [message]);

  const shareMessage = `${message}\n\n${url || "https://cestblorrr.vercel.app/convertisseur"}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/90 border border-gray-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full flex flex-col gap-4 shadow-2xl relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-400 text-center mb-2 animate-pulse">
          🔐 Mode Ultra
        </h2>

        <div className="bg-black/60 p-4 rounded-2xl border border-gray-700 font-mono text-indigo-300 text-sm sm:text-base leading-relaxed overflow-x-auto animate-fadeIn">
          {displayed}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] transition"
          >
            <Share2 size={16} /> Partager sur WhatsApp
          </a>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition"
          >
            <Copy size={16} /> {copied ? "Copié !" : "Copier"}
          </button>
        </div>
      </div>
    </div>
  );
}
