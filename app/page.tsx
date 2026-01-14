import About from "./components/about/About";
import Hero from "./components/hero/Hero";
import Services from "./components/Services/Services";

export default function Main() {
  return (
    <>
      <section className="min-h-screen">
        <Hero />
        <About />
        <Services/>
      </section>
    </>
  );
}
