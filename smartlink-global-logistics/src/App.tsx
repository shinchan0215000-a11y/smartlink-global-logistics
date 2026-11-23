import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GlobalNetworkSection from './components/GlobalNetworkSection';
import CustomersSection from './components/CustomersSection';
import ContactSection from './components/ContactSection';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080B10] text-[#DCE3E8]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GlobalNetworkSection />
        <CustomersSection />
        <ContactSection />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
}
