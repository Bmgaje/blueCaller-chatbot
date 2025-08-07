import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Close mobile menu on resize ≥ lg
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BlueCaller
        </Link>
        {/* Desktop links */}
        <ul className="hidden gap-8 lg:flex">
          <li>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-blue-600">
              Pricing
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-blue-600">
              Testimonials
            </a>
          </li>
        </ul>
        {/* Auth buttons */}
        <div className="hidden lg:block">
          {user ? (
            <button
              onClick={signOut}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                to="/auth?mode=signin"
                className="mr-2 text-sm hover:text-blue-600"
              >
                Sign in
              </Link>
              <Link
                to="/auth?mode=signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        {/* Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </nav>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="space-y-4 bg-white px-4 py-6 shadow lg:hidden">
          <a href="#features" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>
            Pricing
          </a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)}>
            Testimonials
          </a>
          <hr />
          {user ? (
            <button
              onClick={() => {
                signOut();
                setMobileOpen(false);
              }}
            >
              Sign out
            </button>
          ) : (
            <>
              <Link to="/auth?mode=signin" onClick={() => setMobileOpen(false)}>
                Sign in
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
