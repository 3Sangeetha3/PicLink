import { useEffect } from "react";
import UploadForm from "./components/UploadForm";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from "typed.js";

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });

    // Initialize Typed.js
    const typed = new Typed("#typed-text", {
      strings: [
        "Upload images and get CDN links instantly",
        "Share your photos with the world",
        "Fast, secure, and reliable image hosting",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
    });

    // Clean up
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#53C7C0]">
            PicLink
          </h1>
          <p className="text-lg text-gray-300 h-8">
            <span id="typed-text"></span>
          </p>
        </header>
        
        <main>
          <UploadForm />
        </main>
        
      </div>
    </div>
  );
}

export default App;