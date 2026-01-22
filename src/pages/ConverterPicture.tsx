import { useState, useEffect } from "react";
import { Copy, Sparkles } from "lucide-react";
import Share from "../components/share";

/* ===================== UTILS ===================== */
function seedFromName(name: string) {
  return [...name].reduce((a, c) => a + c.charCodeAt(0), 0) || 1;
}

function createPRNG(seed: number) {
  let x = seed >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x & 255;
  };
}

/* ===================== COMPONENT ===================== */
export default function ConverterPicture() {
  const [myName, setMyName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [image, setImage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [info, setInfo] = useState<string | null>(null);
  const [isEncoded, setIsEncoded] = useState(true);

  /* ------------------ LocalStorage ------------------ */
  useEffect(() => {
    const a = localStorage.getItem("veil_myName");
    const b = localStorage.getItem("veil_partnerName");
    if (a) setMyName(a);
    if (b) setPartnerName(b);
  }, []);

  useEffect(() => {
    if (myName) localStorage.setItem("veil_myName", myName);
    if (partnerName) localStorage.setItem("veil_partnerName", partnerName);
  }, [myName, partnerName]);

  /* ------------------ Upload ------------------ */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setImage(r.result as string);
      setResult("");
    };
    r.readAsDataURL(f);
  };

  /* ===================== CORE ===================== */
  const processImage = async () => {
    setInfo(null);

    if (!myName.trim() || !partnerName.trim()) {
      setInfo("❌ Les deux prénoms sont obligatoires.");
      return;
    }

    if (!image) {
      setInfo("❌ Aucune image sélectionnée.");
      return;
    }

    try {
      const img = new Image();
      img.src = image;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      const veilRand = createPRNG(seedFromName(myName));
      const unveilRand = createPRNG(seedFromName(partnerName));

      for (let i = 0; i < data.length; i += 4) {
        if (isEncoded) {
          // 🔒 VOILER (clé A)
          data[i]     ^= veilRand();
          data[i + 1] ^= veilRand();
          data[i + 2] ^= veilRand();
        } else {
          // 🔓 DÉVOILER (clé B)
          data[i]     ^= unveilRand();
          data[i + 1] ^= unveilRand();
          data[i + 2] ^= unveilRand();
        }
        data[i + 3] = 255;
      }

      ctx.putImageData(imgData, 0, 0);
      setResult(canvas.toDataURL("image/png"));

      setInfo(isEncoded
        ? "✔ Image voilée avec votre prénom."
        : "✔ Tentative de dévoilement effectuée."
      );
    } catch {
      setInfo("❌ Erreur lors du traitement.");
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setInfo("✔ Image copiée.");
  };

  /* ===================== UI ===================== */
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-gray-900/80 rounded-3xl p-6 shadow-2xl">

        <div className="text-center mb-6">
          <div className="flex justify-center gap-2">
            <Sparkles className="text-indigo-400 animate-pulse" />
            <h1 className="text-3xl font-extrabold">C’EST BLORR – IMAGE</h1>
            <Sparkles className="text-indigo-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm">
            Deux prénoms • Deux rôles • Une seule vérité
          </p>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            placeholder="Prénom du voileur"
            className="flex-1 p-3 rounded-xl bg-black/70 border border-gray-700"
          />
          <input
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Prénom du destinataire"
            className="flex-1 p-3 rounded-xl bg-black/70 border border-gray-700"
          />
        </div>

        <input type="file" accept="image/*" onChange={handleFile} className="mb-4" />

        <button
          onClick={() => setIsEncoded(!isEncoded)}
          className="w-full mb-3 py-2 rounded-xl bg-gray-800"
        >
          {isEncoded ? "🔒 Voiler l’image" : "🔓 Dévoiler l’image"}
        </button>

        <button
          onClick={processImage}
          className="w-full bg-indigo-600 py-3 rounded-xl font-semibold"
        >
          🔁 EXÉCUTER
        </button>

        {info && <p className="text-center text-gray-300 mt-4">{info}</p>}

        {result && (
          <div className="mt-6 text-center">
            <img src={result} className="rounded-lg mx-auto mb-3" />
            <button
              onClick={handleCopy}
              className="bg-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 mx-auto"
            >
              <Copy size={16} /> Copier
            </button>
          </div>
        )}

        <Share
          message="🔐 Image protégée avec C’EST BLORR"
          url="https://cestblorrr.vercel.app/converterPicture"
        />
      </div>


      
    </main>
    
  );
}
