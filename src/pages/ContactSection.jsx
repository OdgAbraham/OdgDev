// ContactSection.tsx
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // icône WhatsApp moderne

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-28 bg-gradient-to-br from-indigo-900 via-black to-black text-white flex flex-col items-center"
    >
      {/* Glow derrière la photo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full animate-pulse-slow"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl px-6"
      >
        {/* Photo */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl">
          <img
            src="/t.jpg" 
            alt="Odg Abraham"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 rounded-full ring-4 ring-indigo-400/30 animate-pulse"></div>
        </div>

        {/* Nom et rôle */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Odg Abraham
        </h2>
        <p className="text-indigo-400 text-lg md:text-xl">
          Développeur & Architecte Web, Mobile & Blockchain
        </p>

        {/* Message */}
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Vous avez un projet, une idée ou une collaboration en tête ?<br />
          Discutons-en et voyons comment transformer cela en une solution concrète et efficace.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {/* Email */}
          <a
            href="mailto:ouedraogoabraham.reel@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl font-semibold shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/OdgAbraham"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 transition rounded-xl font-semibold"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEScpbZrZywtQAAAZt93oJISQhZQVeSyg4FtOQ_DMLUfhy41-ffm8-f9zhYAbgKeqqwMZTG5aUGN8sgX2FhqCm3bZZV2G1eJNGBkRa92X1KOZKKm3_FYVzVKHYC7rQxg9t-trs=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fabraham-ouedraogo-9376ab318%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 transition rounded-xl font-semibold"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/2250501995516" // remplace par ton numéro
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-xl font-semibold shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp
          </a>

          {/* Téléphone direct */}
          <a
            href="tel:+2250787348088" // remplace par ton numéro
            className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-indigo-400 hover:text-indigo-400 transition rounded-xl font-semibold"
          >
            <Phone className="w-5 h-5" />
            Appel
          </a>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Disponible pour missions, collaborations et projets long terme.
        </p>
      </motion.div>
    </section>
  );
}
