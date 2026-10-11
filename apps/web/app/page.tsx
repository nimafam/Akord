import {
  Experience,
  ServicesTakeover,
  ServicesToWorkJourney,
  ServicesEntryJourney,
} from "@/components/experience";
import {
  ServicesExperience,
  ServicesOverviewJourney,
} from "@/components/experience/services";

import {
  Hero,
  About,
  Services,
  Work,
  Contact,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <Experience />

      <ServicesTakeover />
      <ServicesToWorkJourney />
      <ServicesEntryJourney />

      {/* <AboutMotionDebug />
      <ServicesMotionDebug /> */}


      <Hero />

      <About />

      <Services />

      <ServicesExperience />
      <ServicesOverviewJourney />

      <Work />

      <Contact />

    </main>
  );
}
