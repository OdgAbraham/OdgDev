// components/ProfilePhoto.tsx
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

export default function ProfilePhoto() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      
      {/* Glow arrière-plan */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full animate-pulse-slow"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Photo */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl">
          <img
            src="/odg.png" // remplace par ta vraie photo
            alt="Obscurité.dev"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 rounded-full ring-4 ring-indigo-400/30 animate-pulse"></div>
        </div>

        {/* Nom + rôle */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Obscurité Ouedraogo
        </h2>
        <p className="text-indigo-400 text-lg md:text-xl text-center">
          Développeur & Architecte Web, Mobile & Blockchain
        </p>

        {/* Slogan court */}
        <p className="text-gray-300 max-w-xl text-center">
          Je transforme des idées en produits numériques sécurisés, performants et évolutifs.
        </p>

        {/* Réseaux */}
        <div className="flex gap-6 mt-4">
          <a href="mailto:contact@tonemail.com" className="text-gray-300 hover:text-indigo-400 transition">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://github.com/tonprofil" target="_blank" className="text-gray-300 hover:text-indigo-400 transition">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/tonprofil" target="_blank" className="text-gray-300 hover:text-indigo-400 transition">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
