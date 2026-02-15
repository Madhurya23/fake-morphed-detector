import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Responsive App Name */}
          <Link 
            to="/" 
            className="font-bold gradient-text text-lg sm:text-xl md:text-2xl"
          >
            Fake/Morphed Detector
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="nav-link text-sm sm:text-base">Home</Link>
            <Link to="/about" className="nav-link text-sm sm:text-base">About</Link>
            <Link to="/contact" className="nav-link text-sm sm:text-base">Contact</Link>

            {/* Shrink toggle slightly on mobile */}
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
