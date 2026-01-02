// HeroSection.tsx
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Je construis des{" "}
          <span className="text-indigo-400">solutions numériques</span>{" "}
          innovantes et utiles.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Développeur & architecte de solutions web, mobile et blockchain.
          Je transforme des idées en produits concrets, sécurisés et évolutifs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-lg"
          >
             Voir mes projets
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-xl border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 transition font-semibold"
          >
             Me contacter
          </a>
        </div>
      </motion.div>
    </section>
  );
}
