import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";

// Lazy-load pages to reduce index bundle
const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Fallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="team" element={<Team />} />
              <Route path="partners" element={<Partners />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  );
}

export default App;
