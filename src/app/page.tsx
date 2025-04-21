import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import CallToAction from "../components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </>
  );
}
