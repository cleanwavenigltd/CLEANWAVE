import React from "react";
import Hero from "../components/Hero";
import ProcessSteps from "../components/ProcessSteps";
import RolesSection from "../components/RolesSection";
import ImpactSection from "../components/ImpactSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProcessSteps />
      <RolesSection />
      <ImpactSection />
    </div>
  );
}
