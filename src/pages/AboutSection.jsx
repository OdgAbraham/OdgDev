// AboutSection.tsx
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gray-950 text-white overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ma <span className="text-indigo-400">mission</span>
          </h2>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Je développe des solutions numériques pensées pour durer, résoudre
            de vrais problèmes et créer de la valeur réelle. Mon approche repose
            sur la persévérance, l’innovation constante et une compréhension
            profonde des besoins techniques et humains.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-400">
            « Les grandes choses ne se produisent pas par la force, mais par la
            persévérance et l’innovation constante. »  
            <span className="block mt-2 text-sm text-gray-500">
              — Bouddha (adapté)
            </span>
          </blockquote>
        </motion.div>

        {/* Visual / Values */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-6"
        >
          {[
            { title: "Innovation", desc: "Créer des solutions modernes et évolutives." },
            { title: "Persévérance", desc: "Aller au bout des idées, même complexes." },
            { title: "Impact réel", desc: "Construire utile, pas juste technique." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
