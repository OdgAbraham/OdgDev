import { useState } from "react";
import { Copy, Share2 } from "lucide-react";

interface ShareProps {
  message?: string;
  url?: string;
}

export default function Share({ message, url }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `${message || "🔐 Découvrez mon message secret !\nParlez en code avec ALPHA CONVERTER 😈"}\n\n${url || "https://ton-site.com"}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="mt-6 p-5 sm:p-6 bg-gray-800/70 rounded-3xl border border-gray-700 flex flex-col gap-4 text-center sm:text-left">
      
      {/* Message */}
      <p className="text-gray-200 text-sm sm:text-base break-words whitespace-pre-wrap">
        {shareMessage}
      </p>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 flex-wrap">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none px-4 py-2 bg-green-600 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] transition text-sm sm:text-base"
        >
          <Share2 size={16} /> Partager sur WhatsApp
        </a>

        <button
          onClick={handleCopy}
          className="flex-1 sm:flex-none px-4 py-2 bg-gray-700 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition text-sm sm:text-base"
        >
          <Copy size={16} /> {copied ? "Copié !" : "Copier le message"}
        </button>
      </div>
    </div>
  );
}
