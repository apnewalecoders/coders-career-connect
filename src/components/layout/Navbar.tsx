
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when a link is clicked
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Jobs", path: "/jobs" },
    { name: "Study Material", path: "/study-material" },
  ];

  const exploreItems = [
    { name: "Mock Test", path: "/mock-test" },
    { name: "Mock Assessment", path: "/mock-assessment" },
    { name: "Practice Problems", path: "/practice-problems" },
    { name: "Interview Preparation", path: "/interview-preparation" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-red">Apne Wale Coders</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-brand-red"
                    : "text-gray-700 hover:text-brand-red"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Explore Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-red flex items-center gap-1"
                >
                  Explore
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white shadow-lg border">
                {exploreItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.path}
                      className="w-full px-3 py-2 text-sm hover:bg-gray-50 hover:text-brand-red transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Navigation - Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
                <Link to="/post-job">
                  <Button className="bg-brand-red hover:bg-red-500 text-white">
                    Post a Job
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-brand-red hover:bg-red-500 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "text-brand-red"
                    : "text-gray-700 hover:text-brand-red"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Explore Items */}
            <div className="border-t border-gray-200 pt-2">
              <div className="text-sm font-medium text-gray-500 px-3 py-1">Explore</div>
              {exploreItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-6 py-2 text-base font-medium text-gray-700 hover:text-brand-red"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="border-t border-gray-200 my-2 pt-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-red"
                  >
                    Dashboard
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-red"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-red"
                  >
                    Logout
                  </button>
                  <Link
                    to="/post-job"
                    className="block px-3 py-2 text-base font-medium bg-brand-red text-white rounded-md text-center"
                  >
                    Post a Job
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-red"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="block px-3 py-2 text-base font-medium bg-brand-red text-white rounded-md text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
