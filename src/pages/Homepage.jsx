import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Products from "../components/Products";
import News from "../components/News";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}
