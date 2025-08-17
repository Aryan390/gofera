import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Car, Users, LogIn, Info } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/post-ride", label: "Post Ride", icon: Car },
    { path: "/find-rides", label: "Find Rides", icon: Users },
    { path: "/about", label: "About", icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="nav-glass fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 hidden md:block">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-gradient-primary">
            Gofera
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-glass-foreground hover:bg-glass/60 hover:text-primary"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="nav-glass fixed top-4 left-4 right-4 z-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gradient-primary">
              Gofera
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-glass p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <div className="absolute right-4 top-20 nav-glass p-6 w-64 animate-slide-up">
              <div className="space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-glass-foreground hover:bg-glass/60 hover:text-primary"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
