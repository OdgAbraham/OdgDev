// ProjectsSection.tsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "Doubehi",
    subtitle: "Wallet & transactions blockchain",
    description:
      "Une passerelle crypto pensée pour les vrais besoins du terrain : commerçants, freelancers, diaspora, intégrant sécurité, traçabilité et automatisation des transactions.",
    tags: ["Blockchain", "Web3", "Security"],
    status: "En cours",
    link: "https://doubehi.vercel.app"
  },
  {
    title: "M.E.G.A",
    subtitle: "Plateforme audio moderne",
    description:
      "Application dédiée à la diffusion et à la gestion de contenus audio avec backend scalable et API sécurisée.",
    tags: ["Backend", "API", "Streaming"],
    status: "Disponible",
    link: "https://www.messagedegrace.org"
  },
  {
    title: "INAUVE+",
    subtitle: "Solution digitale pour restaurants",
    description:
      "La solution digitale qui modernise et optimise l'expérience de vos clients en restaurant.",
    tags: ["Web App", "UX/UI", "Optimisation"],
    status: "Disponible",
    link: "https://resto.inauveplus.com"
  },
  {
    title: "OnEstCalé",
    subtitle: "Application mobile de mise en relation prestataire-client",
    description:
      "Projet mobile innovant permettant de connecter facilement prestataires et clients pour des services fiables et rapides.",
    tags: ["Mobile App", "UX/UI", "Marketplace"],
    status: "Disponible",
    link: "/apk/OnEstCalé_V1.0.0.apk"
  },
  {
    title: "Infrastructure Backend",
    subtitle: "Systèmes sécurisés & performants",
    description:
      "Conception d’architectures backend robustes avec gestion des accès, logs, sécurité réseau et performance.",
    tags: ["Node.js", "PostgreSQL", "Security"],
    status: "Actif",
    link: "https://doubehi.onrender.com"
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 bg-black text-white">
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
            Projets & <span className="text-indigo-400">développements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Des produits réels, pensés pour résoudre des problèmes concrets,
            avec une attention particulière à la sécurité, la performance et
            l’évolutivité.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500 hover:scale-105 transition transform shadow-lg flex flex-col justify-between"
            >
              {/* Header: title + status */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-indigo-400">
                  {project.title}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300">
                  {project.status}
                </span>
              </div>

              {/* Subtitle & description */}
              <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
              <p className="text-gray-300 mb-6">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Call to Action */}
              <a
                href={project.link}
                {...(project.title === "OnEstCalé" ? { download: true } : {})}
                target="_blank"
                className="mt-auto inline-block px-6 py-3 text-center bg-indigo-600 hover:bg-indigo-700 transition rounded-xl font-semibold shadow-lg"
              >
                {project.title === "OnEstCalé" ? "Télécharger l’APK" : "Voir le projet"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
