import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CaymanMesh from "@/components/CaymanMesh";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Services />
      <CaymanMesh />
      <Contact />
      <Footer />
    </main>
  );
}
