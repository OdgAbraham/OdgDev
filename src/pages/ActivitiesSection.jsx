// ActivitiesSection.tsx
import { motion } from "framer-motion";
import { Code, Smartphone, Shield, Layers } from "lucide-react";

const activities = [
  {
    icon: Code,
    title: "Développement Web & Backend",
    description:
      "Conception d’applications web modernes, APIs sécurisées, architectures scalables et performantes.",
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description:
      "Développement d’applications mobiles performantes avec une attention particulière à l’UX et à la stabilité.",
  },
  {
    icon: Shield,
    title: "Blockchain & Sécurité",
    description:
      "Intégration blockchain, smart contracts, gestion de transactions et sécurisation des systèmes.",
  },
  {
    icon: Layers,
    title: "Architecture & Conseil",
    description:
      "Analyse, structuration et accompagnement technique pour des projets fiables et durables.",
  },
];

export default function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="relative py-24 bg-gray-950 text-white"
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
            Mes <span className="text-indigo-400">activités</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            J’interviens sur l’ensemble du cycle de développement, de l’idée à
            la mise en production, avec une approche orientée qualité,
            sécurité et impact réel.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-indigo-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {activity.title}
                </h3>

                <p className="text-gray-400">
                  {activity.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
