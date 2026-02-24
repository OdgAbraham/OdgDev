import { useState, useEffect } from "react";
import { Lock, ShieldCheck, RefreshCcw, Copy, LogOut, Sparkles, AlertCircle, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Share from "../components/share";

const UPPER_MARK = "↑";

function generateAlphaMapFromKey(key: string) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const symbols = Array.from("Δβ¢Ð€ƒɢħ!ʝκ|₥η0ρ9®$+υ✓ω✕¥ζ");
  const seed = [...key].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...symbols].sort(
    (a, b) => ((a.charCodeAt(0) + seed) % 7) - ((b.charCodeAt(0) + seed) % 7)
  );
  const map: Record<string, string> = {};
  for (let i = 0; i < letters.length; i++) map[letters[i]] = shuffled[i];
  return map;
}

const ESCAPE = "§";

function isAlpha(char: string) {
  return char.toLowerCase() >= "a" && char.toLowerCase() <= "z";
}


function encodeAlpha(text: string, key: string) {
  const alphaMap = generateAlphaMapFromKey(key.toLowerCase());

  return [...text].map((char) => {
    if (char === " ") return "   ";

    // 🔒 lettres uniquement
    if (isAlpha(char)) {
      const isUpper = char >= "A" && char <= "Z";
      const lower = char.toLowerCase();
      const encoded = alphaMap[lower];
      return isUpper ? UPPER_MARK + encoded : encoded;
    }

    // 🛡️ tout le reste est protégé
    return ESCAPE + char;
  }).join("");
}


function decodeAlpha(text: string, key: string) {
  const alphaMap = generateAlphaMapFromKey(key.toLowerCase());
  const reverse = Object.fromEntries(
    Object.entries(alphaMap).map(([k, v]) => [v, k])
  );

  let result = "";
  let upperNext = false;
  let escapeNext = false;

  for (const char of [...text]) {
    if (escapeNext) {
      result += char;     // restaure le caractère original
      escapeNext = false;
      continue;
    }

    if (char === ESCAPE) {
      escapeNext = true;
      continue;
    }

    if (char === UPPER_MARK) {
      upperNext = true;
      continue;
    }

    const decoded = reverse[char] ?? char;
    result += upperNext ? decoded.toUpperCase() : decoded;
    upperNext = false;
  }

  return result;
}


export default function Convertisseur() {
  const [mode, setMode] = useState<"normal" | "ultra">("normal");
const [input, setInput] = useState("");
const [output, setOutput] = useState("");
const [myName, setMyName] = useState("");
const [partnerName, setPartnerName] = useState("");
const [isEncoded, setIsEncoded] = useState(true);
const [copied, setCopied] = useState(false);
const [fade, setFade] = useState(false);
const navigate = useNavigate();

const [messageInfo, setMessageInfo] =
  useState<{ text: string; type: "error" | "success" } | null>(null);

/* ===================== LOCAL STORAGE ===================== */
useEffect(() => {
  const savedMyName = localStorage.getItem("myName");
  const savedPartnerName = localStorage.getItem("partnerName");
  if (savedMyName) setMyName(savedMyName);
  if (savedPartnerName) setPartnerName(savedPartnerName);
}, []);

useEffect(() => {
  if (myName) localStorage.setItem("myName", myName);
  if (partnerName) localStorage.setItem("partnerName", partnerName);
}, [myName, partnerName]);

/* ===================== MODE ULTRA ===================== */
const ULTRA_EMOJIS = ["😈","🔥","💀","🛡️","🗝️","💥"];

function base64EncodeUtf8(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function base64DecodeUtf8(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
}


const ESCAPE = "§";

function escapeText(text: string): string {
  return [...text].map(c => {
    if (/[a-zA-Z0-9 ]/.test(c)) return c;
    return ESCAPE + c;
  }).join("");
}

function unescapeText(text: string): string {
  let result = "";
  let escapeNext = false;

  for (const c of [...text]) {
    if (escapeNext) {
      result += c;
      escapeNext = false;
      continue;
    }
    if (c === ESCAPE) {
      escapeNext = true;
      continue;
    }
    result += c;
  }

  return result;
}


function xorEncryptUltraSafe(text: string, key: string): string {
  if (!key) throw new Error("Clé vide");

  // 1️⃣ Escape les caractères spéciaux
  const escaped = escapeText(text);

  // 2️⃣ Transformer en code points pour éviter btoa problème Unicode
  const bytes = new Uint8Array([...escaped].map((c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length)));

  // 3️⃣ Base64 safe
  let binary = "";
  for (let b of bytes) binary += String.fromCharCode(b);
  const base64 = btoa(binary);

  // 4️⃣ Camouflage emoji
  return [...base64]
    .map(c => c + ULTRA_EMOJIS[Math.floor(Math.random() * ULTRA_EMOJIS.length)])
    .join("");
}

function xorDecryptUltraSafe(encoded: string, key: string): string {
  if (!key) throw new Error("Clé vide");

  // 1️⃣ Nettoyage emojis
  const cleaned = encoded.replace(new RegExp(ULTRA_EMOJIS.join("|"), "g"), "");

  // 2️⃣ Base64 decode
  const binary = atob(cleaned);

  // 3️⃣ XOR inverse
  const bytes = new Uint8Array([...binary].map((c, i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length)));

  // 4️⃣ Reconstituer le texte
  const decrypted = String.fromCharCode(...bytes);

  // 5️⃣ Unescape
  return unescapeText(decrypted);
}



/* ===================== CONVERSION ===================== */
const handleConvert = () => {
  setMessageInfo(null);

  if (!myName.trim() || !partnerName.trim()) {
    setMessageInfo({
      text: "❌ Veuillez renseigner votre prénom et celui de votre ami(e).",
      type: "error",
    });
    return;
  }

  if (!input.trim()) {
    setMessageInfo({
      text: "❌ Veuillez saisir un message à transformer.",
      type: "error",
    });
    return;
  }

  try {
    let result = "";

    if (mode === "normal") {
      result = isEncoded
        ? encodeAlpha(input, myName.trim())
        : decodeAlpha(input, partnerName.trim());
    }

    if (mode === "ultra") {
      result = isEncoded
        ? xorEncryptUltraSafe(input, myName.trim())
        : xorDecryptUltraSafe(input, partnerName.trim());
    }

    setOutput(result);
    setMessageInfo({ text: "✔ Transformation réussie !", type: "success" });
  } catch {
    setMessageInfo({
      text: "❌ Le message Ultra est invalide ou la clé est incorrecte.",
      type: "error",
    });
  }
};

useEffect(() => {
  if (!messageInfo) return;

  // Démarrer le fade
  setFade(true);

  // Timer pour faire disparaître le message
  const timer = setTimeout(() => {
    setFade(false);           // commence le fade-out
    setTimeout(() => setMessageInfo(null), 300); // enlève le message après fade
  }, 3500);

  return () => clearTimeout(timer);
}, [messageInfo]);




  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
    setMessageInfo({ text: "✔ Message copié dans le presse-papiers", type: "success" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-gray-950 text-white px-4 sm:px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md sm:max-w-3xl bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
{/* BOUTON RETOUR */}
<button
  onClick={() => navigate("/")}
  className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
>
<LogOut size={16} /> Sortie
</button>

        {/* HEADER */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Sparkles className="text-indigo-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">C'EST BLORR !</h1>
            <Sparkles className="text-indigo-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">Fait bien ton gbêrê et proprement 😈</p>
        </div>

        {/* MODE SWITCH */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <button
            onClick={() => setMode("normal")}
            className={`px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition ${mode === "normal" ? "bg-indigo-600 shadow-lg" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            <ShieldCheck size={16} /> Alpha
          </button>
          <button
            onClick={() => setMode("ultra")}
            className={`px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition ${mode === "ultra" ? "bg-red-600 shadow-lg" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            <Lock size={16} /> Ultra
          </button>
        </div>

        {/* PRÉNOMS */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={myName}
            onChange={e => setMyName(e.target.value)}
            placeholder="Votre prénom"
            className="w-full sm:w-1/2 p-3 rounded-xl bg-black/60 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base"
          />
          <input
            type="text"
            value={partnerName}
            onChange={e => setPartnerName(e.target.value)}
            placeholder="Prénom de l'ami(e) 👤"

            className="w-full sm:w-1/2 p-3 rounded-xl bg-black/60 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base"
          />
         {/* INFO PRÉNOM AMI */}
<div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
  <button
    type="button"
    onClick={() =>
      setMessageInfo({
        text: "⚠️ IMPORTANT : pour décoder un message, le prénom de l’ami(e) doit être exactement le même que celui utilisé pour le coder.",
        type: "error",
      })
    }
    className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition font-semibold"
  >
    <AlertCircle size={14} />
    Pourquoi ce prénom ?
  </button>
</div>


        </div>

       

        {/* DIRECTION */}
<div className="flex justify-center mb-4">
  <button
    onClick={() => setIsEncoded(!isEncoded)}
    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
               bg-gray-800 text-white hover:bg-gray-700 transition"
  >
    <RefreshCcw size={16} />
    {isEncoded ? "Français → Code" : "Code → Français"}
  </button>
</div>


        {/* INPUT */}
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Écris ton message secret ici..."
          className="w-full h-24 sm:h-28 p-4 rounded-2xl bg-black/60 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base resize-none transition"
        />

        {/* BOUTON CONVERTIR */}
        <button
          onClick={handleConvert}
          className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold tracking-wide text-sm sm:text-base hover:scale-[1.02] transition"
        >
          🔁 TRANSFORMER
        </button>

        {/* MESSAGES D'INFO */}
        {messageInfo && (
  <p className={`mt-3 text-center text-sm sm:text-base 
      ${messageInfo.type === "error" ? "text-red-400" : "text-green-400"} 
      flex justify-center items-center gap-2
      transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
    {messageInfo.type === "error" && <AlertCircle size={16} />}
    {messageInfo.text}
  </p>
)}


        {/* RESULTAT PROFESSIONNEL */}
{output && (
  <div className="mt-6 p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl shadow-2xl border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeIn">
    <div className="flex-1 break-words text-indigo-100 font-mono text-sm sm:text-base">
      {output}
    </div>

    <div className="flex gap-3 mt-3 sm:mt-0">
      <button
        onClick={handleCopy}
        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm flex items-center gap-2 transition"
      >
        <Copy size={16} /> Copier
      </button>

    </div>
  </div>
)}

        {mode === "ultra" && (
          <p className="text-center text-red-400 text-xs sm:text-sm mt-4">
  ⚠️ Mode Ultra : chiffrement avancé — version expérimentale.
</p>
 )}
 
      </div>
      
    </main>

  );
}
