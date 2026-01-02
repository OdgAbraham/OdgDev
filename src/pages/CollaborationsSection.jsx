// CollaborationsSection.tsx
import { motion } from "framer-motion";
import { Users, Briefcase, Code2, ShieldCheck } from "lucide-react";

const collaborations = [
  {
    icon: Briefcase,
    title: "Missions freelance",
    description:
      "Développement et accompagnement technique sur des projets web, mobile et backend, avec respect des délais et des exigences.",
  },
  {
    icon: Users,
    title: "Collaborations techniques",
    description:
      "Travail en équipe avec d’autres développeurs, designers et chefs de projet sur des produits numériques complexes.",
  },
  {
    icon: Code2,
    title: "Projets communautaires",
    description:
      "Participation à des projets open-source et communautaires orientés innovation et partage de connaissances.",
  },
  {
    icon: ShieldCheck,
    title: "Missions sensibles & sécurité",
    description:
      "Interventions sur des systèmes nécessitant fiabilité, sécurité et confidentialité accrues.",
  },
];

export default function CollaborationsSection() {
  return (
    <section
      id="collaborations"
      className="relative py-24 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Collaborations & <span className="text-indigo-400">missions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            J’ai collaboré avec des équipes, des porteurs de projets et des
            organisations sur des missions techniques variées, allant du
            développement à l’architecture et à la sécurisation de systèmes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collaborations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-indigo-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
