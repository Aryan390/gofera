import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Menu,
  X,
  Car,
  Users,
  LogIn,
  Info,
  CircleUser,
  LogOut,
  SquareChartGantt,
} from "lucide-react";
import { useUser, useUserActions } from "../context/UserContext";

const items = [
  { path: "/find-rides", label: "Find Rides", icon: Users },
  // { path: "/post-ride", label: "Post Ride", icon: Car },
  { path: "/login", label: "Login", icon: LogIn },
];

const toggleLogin = (isAuthenticated, tempNavItems) => {
  if (isAuthenticated) {
    const userNavItem = {
      path: "/profile",
      label: "Profile",
      icon: CircleUser,
    };

    const logoutNavItem = {
      path: "/",
      label: "Logout",
      icon: LogOut,
    };

    if (!tempNavItems.find((item) => item.path === "/profile")) {
      tempNavItems.push(userNavItem);
    }

    if (!tempNavItems.find((item) => item.path === "/")) {
      tempNavItems.push(logoutNavItem);
    }
    // remove login item
    const loginIndex = tempNavItems.findIndex((item) => item.path === "/login");
    if (loginIndex !== -1) {
      tempNavItems.splice(loginIndex, 1);
    }
  } else {
    // remove profile item
    const profileIndex = tempNavItems.findIndex(
      (item) => item.path === "/profile"
    );
    if (profileIndex !== -1) {
      tempNavItems.splice(profileIndex, 1);
    }

    // remove logout item
    const logoutIndex = tempNavItems.findIndex((item) => item.path === "/");
    if (logoutIndex !== -1) {
      tempNavItems.splice(logoutIndex, 1);
    }

    const loginNavItem = { path: "/login", label: "Login", icon: LogIn };
    if (!tempNavItems.find((item) => item.path === "/login")) {
      tempNavItems.push(loginNavItem);
    }
  }
  return tempNavItems;
};

const toggleDriver = (isAuthenticated, tempNavItems, isDriver = false) => {
  if (isAuthenticated && isDriver) {
    const postRideNavItem = {
      path: "/post-ride",
      label: "Post Ride",
      icon: Car,
    };

    const editRideNavItem = {
      path: "/manage-rides",
      label: "Dashboard",
      icon: SquareChartGantt,
    };

    if (!tempNavItems.find((item) => item.path === "/post-ride")) {
      tempNavItems = [postRideNavItem, ...tempNavItems];
    }
    if (!tempNavItems.find((item) => item.path === "/manage-rides")) {
      tempNavItems = [editRideNavItem, ...tempNavItems];
    }
  } else {
    const postRideIndex = tempNavItems.findIndex(
      (item) => item.path === "/post-ride"
    );
    if (postRideIndex !== -1) {
      tempNavItems.splice(postRideIndex, 1);
    }
    const editRideNavItem = tempNavItems.findIndex(
      (item) => item.path === "/manage-rides"
    );
    if (editRideNavItem !== -1) {
      tempNavItems.splice(editRideNavItem, 1);
    }
  }
  return tempNavItems;
};

const Navigation = () => {
  const { isLoading, error, isAuthenticated, user } = useUser();
  const { logout } = useUserActions();
  const [navItems, setNavItems] = useState(items);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // const isDriver = user?.isDriver || false;
  useEffect(() => {
    let tempNavItems = [...navItems];
    tempNavItems = toggleLogin(isAuthenticated, tempNavItems);
    console.log(user?.isDriver);
    tempNavItems = toggleDriver(isAuthenticated, tempNavItems, user?.isDriver);
    setNavItems(tempNavItems);
  }, [isAuthenticated, user]);

  // console.log("Nav Items:", navItems);
  const isActive = (path) =>
    location.pathname !== "/" && location.pathname === path;

  const logoutHandler = () => {
    // Call logout action here
    logout();
  };
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
                  onClick={item.label === "Logout" ? logoutHandler : null}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
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
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
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
                      onClick={
                        item.label === "Logout"
                          ? () => {
                              logoutHandler();
                              setIsOpen(false);
                            }
                          : () => setIsOpen(false)
                      }
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
