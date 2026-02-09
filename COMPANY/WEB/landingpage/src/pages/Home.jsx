import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero"; // keep Hero in initial bundle (above-the-fold)

// Lazy-load below-the-fold sections to reduce initial JS
const ProcessSteps = lazy(() => import("../components/ProcessSteps"));
const RolesSection = lazy(() => import("../components/RolesSection"));
const ImpactSection = lazy(() => import("../components/ImpactSection"));

const Placeholder = ({ height = 240 }) => (
  <div style={{ minHeight: height }} aria-hidden="true" />
);

export default function Home() {
  return (
    <div>
      <Hero />

      <Suspense fallback={<Placeholder height={200} />}>
        <ProcessSteps />
      </Suspense>

      <Suspense fallback={<Placeholder height={320} />}>
        <RolesSection />
      </Suspense>

      <Suspense fallback={<Placeholder height={420} />}>
        <ImpactSection />
      </Suspense>
    </div>
  );
}
