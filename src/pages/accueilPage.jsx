import { Lock, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import CodeLoupe from "../components/CodeLoupe";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* HERO */}
<section className="max-w-6xl mx-auto px-6 py-24 text-center">
  <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
    Confidentialité locale • Sans inscription
  </span>
 {/* SLOGAN */}
<p className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight 
              bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              animate-pulse">
  Fait bien ton gbêrê et proprement
</p>

  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
    <span className="block text-indigo-400 mt-3">
      Protégez vos mots.
    </span>
    Parlez librement.
    
  </h1>

 

  <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
    Transformez vos messages en un
    <span className="text-white font-semibold"> code privé </span>
    lisible uniquement par les personnes qui connaissent la clé.
  </p>

  <CodeLoupe />

  <div className="mt-10 flex justify-center gap-4 flex-wrap">
    <Link
      to="/convertisseur"
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
    >
      Commencer maintenant
      <ArrowRight size={18} />
    </Link>

    <a
      href="#concept"
      className="px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500 transition text-gray-300"
    >
      Comprendre le fonctionnement
    </a>
  </div>

  {/* TRUST / USAGE BADGES */}
  <div className="mt-12 flex justify-center gap-6 flex-wrap text-sm text-gray-400">
    <span className="flex items-center gap-2">
      <CheckCircle size={16} className="text-green-400" />
      Aucun message stocké
    </span>
    <span className="flex items-center gap-2">
      <CheckCircle size={16} className="text-green-400" />
      Traitement local (navigateur)
    </span>
    <span className="flex items-center gap-2">
      <CheckCircle size={16} className="text-green-400" />
      Sans compte
    </span>
    <span className="flex items-center gap-2">
      <CheckCircle size={16} className="text-green-400" />
      Messages confidentiels ou secrets
    </span>
  </div>
</section>

      

      {/* CONCEPT */}
      <section
        id="concept"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8"
      >
        {/* MODE NORMAL */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-green-400" />
            <h2 className="text-2xl font-semibold">Mode Alpha</h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Transformation linguistique intelligente basée sur une clé simple.
            Idéal pour masquer vos messages sans complexité.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-400">
            <li>• Rapide et intuitif</li>
            <li>• Parfait pour les échanges quotidiens</li>
            <li>• Aucun stockage de données</li>
          </ul>
        </div>

        {/* MODE ULTRA */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8 hover:border-red-500/40 transition">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-red-400" />
            <h2 className="text-2xl font-semibold">Mode Ultra Privé</h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Chiffrement avancé avec clé secrète.
            Sans la clé exacte, le message devient totalement illisible.
          </p>

          <p className="text-gray-400 text-sm mt-3">
            💬 Idéal pour vos messages les plus sensibles — même vos amis curieux ne pourront pas déchiffrer sans la clé.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-400">
            <li>• Chiffrement local (navigateur)</li>
            <li>• Niveau de confidentialité élevé</li>
            <li>• Même le site ne peut pas lire vos messages</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10 text-center text-sm text-gray-500">
        <p>🔐 Confidentialité par conception • Aucune donnée conservée</p>
        <p className="mt-2">
          © {new Date().getFullYear()} • C’EST BLORR
        </p>
      </footer>
    </main>
  );
}
