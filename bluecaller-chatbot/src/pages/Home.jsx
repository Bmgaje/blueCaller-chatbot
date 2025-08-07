import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Home() {
  document.title = "BlueCaller Clone — Skilled Trades Network";
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <Pricing />
      <Footer />
      <ChatbotWidget />
    </>
  );
}
