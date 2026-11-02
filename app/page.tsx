import { HomeClientShell } from "@/components/home-client-shell";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { About } from "@/components/about";
import { Stack } from "@/components/stack";
import { Leadership } from "@/components/leadership";
import { Education } from "@/components/education";
import { LiveStatsStrip } from "@/components/widgets/live-stats-strip";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SectionReveal } from "@/components/section-reveal";

export default function Home() {
  return (
    <HomeClientShell>
      <main id="main-content" className="flex-1">
        <Hero />
        <SectionReveal>
          <ProjectsSection />
        </SectionReveal>
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Stack />
        </SectionReveal>
        <SectionReveal>
          <Leadership />
        </SectionReveal>
        <SectionReveal>
          <Education />
        </SectionReveal>
        <LiveStatsStrip />
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </HomeClientShell>
  );
}
