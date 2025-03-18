import About from "@/components/About";
import Hero from "@/components/Hero";
import Media from "@/components/Media";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Media />
      <Testimonials />
    </main>
  );
}
