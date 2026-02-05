import React, { use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="team" element={<Team />} />
            <Route path="partners" element={<Partners />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
