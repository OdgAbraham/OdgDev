import { Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Parlez librement.
          <span className="block text-indigo-400 mt-2">
            Protégez vos mots.
          </span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
          Convertissez vos messages français en un
          <span className="text-white font-medium"> code privé </span>
          pour rendre vos conversations confidentielles et difficiles à comprendre.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/convertisseur"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
          >
            Commencer
            <ArrowRight size={18} />
          </Link>

          
        </div>
      </section>

      {/* CONCEPT */}
      <section
        id="concept"
        className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8"
      >
        {/* MODE NORMAL */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-green-400" />
            <h2 className="text-2xl font-semibold">Mode Normal</h2>
          </div>

          <p className="text-gray-300">
            Transformation linguistique intelligente.
            Les mots sont convertis en un code compréhensible
            uniquement par les personnes initiées.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>• Rapide et simple</li>
            <li>• Idéal pour les discussions quotidiennes</li>
            <li>• Aucun message stocké</li>
          </ul>
        </div>

        {/* MODE ULTRA */}
        <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-red-400" />
            <h2 className="text-2xl font-semibold">Mode Ultra Privé</h2>
          </div>

          <p className="text-gray-300">
            Chiffrement avancé avec clé secrète.
            Sans la clé, le message devient totalement illisible.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>• Chiffrement local (navigateur)</li>
            <li>• Niveau de sécurité élevé</li>
            <li>• Même le site ne peut pas lire vos messages</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>🔐 Aucun message n’est stocké • Confidentialité par conception</p>
        <p className="mt-2">
          © {new Date().getFullYear()} • Code Privé
        </p>
      </footer>
    </main>
  );
}
