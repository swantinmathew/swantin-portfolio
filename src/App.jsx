import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Leadership from "./components/Leadership";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-page text-ink font-sans antialiased min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
