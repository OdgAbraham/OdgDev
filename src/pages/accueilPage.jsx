// app/page.tsx
import Header from "../components/Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ActivitiesSection from "./ActivitiesSection";
import CollaborationsSection from "./CollaborationsSection";
import ContactSection from "./ContactSection";

export default function HomePage() {
  return (
    <main className="bg-black text-white scroll-smooth">
      
      {/* Navigation */}
      <Header />

      {/* Hero */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Mission */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Projets */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Activités */}
      <section id="activities">
        <ActivitiesSection />
      </section>

      {/* Collaborations */}
      <section id="collaborations">
        <CollaborationsSection />
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>

    </main>
  );
}
