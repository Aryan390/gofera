import { Link } from "react-router";
import {
  Car,
  Users,
  MapPin,
  Clock,
  Shield,
  Star,
  AlertTriangle,
} from "lucide-react";
import HyperSpeedFinal from "../components/Hyperspeed/HyperSpeedFinal";

const features = [
  {
    icon: Car,
    title: "Share Your Ride",
    description:
      "Post your journey and connect with passengers heading in the same direction.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Find Companions",
    description:
      "Discover available rides and join fellow travelers for a social journey.",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description:
      "Choose rides that fit your schedule with real-time updates and ETAs.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Community Driven",
    description:
      "Built by travelers, for travelers. Connect safely with verified users.",
    color: "success",
  },
];

const stats = [
  { number: "10K+", label: "Happy Travelers" },
  { number: "5K+", label: "Successful Rides" },
  { number: "50+", label: "Cities Connected" },
  { number: "4.8", label: "Average Rating" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <HyperSpeedFinal />
      {/* Hero Section */}
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4 pt-20 z-300">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-full mb-8 animate-float">
                <Car className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 z-20">
                <span className="text-gradient-primary">Gof</span>
                <span className="text-gradient-secondary">era</span>
              </h1>

              <p className="text-xl md:text-2xl text-glass-foreground mb-12 max-w-3xl mx-auto">
                Connect with fellow travelers, share journeys, and explore the
                world together. Your next adventure is just a ride away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/post-ride"
                  className="btn-primary-glass flex items-center space-x-3 text-lg px-8 py-4 animate-glow"
                  aria-label="Share Your Ride"
                >
                  <Car size={24} />
                  <span>Share Your Ride</span>
                </Link>

                <Link
                  to="/find-rides"
                  className="btn-secondary-glass flex items-center space-x-3 text-lg px-8 py-4"
                  aria-label="Find a Ride"
                >
                  <Users size={24} />
                  <span>Find a Ride</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-gradient-primary mb-4">
                Why Choose RideShare?
              </h2>
              <p className="text-xl text-glass-foreground max-w-2xl mx-auto">
                Join thousands of travelers who trust our platform for safe,
                affordable, and social transportation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-glass-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 animate-scale-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-glass-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 animate-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gradient-primary mb-4">
                About RideShare
              </h1>
              <p className="text-glass-foreground text-lg">
                Connecting travelers and creating communities through shared
                journeys
              </p>
            </div>

            {/* Main Disclaimer */}
            <div className="glass-card p-8 mb-8 animate-scale-in border-2 border-warning/30">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-8 h-8 text-warning animate-glow" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-warning mb-4">
                    Important Disclaimer
                  </h2>
                  <p className="text-glass-foreground text-lg leading-relaxed">
                    Your rides are your responsibility, and we are not liable
                    for anything. We only provide a platform for sharing rides.
                    Please exercise caution, verify driver/passenger details,
                    and ensure your safety at all times.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                className="glass-card p-6 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary">
                    For Drivers
                  </h3>
                </div>
                <p className="text-glass-foreground">
                  Share your journey and offset travel costs by offering rides
                  to fellow travelers. Post your route, set your price, and
                  connect with passengers heading in the same direction.
                </p>
              </div>

              <div
                className="glass-card p-6 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-accent-foreground">
                    For Passengers
                  </h3>
                </div>
                <p className="text-glass-foreground">
                  Find affordable and convenient rides to your destination.
                  Browse available trips, connect with verified drivers, and
                  enjoy a more social way to travel.
                </p>
              </div>
            </div>

            {/* Safety Guidelines */}
            <div
              className="glass-card p-8 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                Safety Guidelines
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground mb-3">
                    For Drivers
                  </h3>
                  <ul className="space-y-2 text-glass-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Verify passenger identity before pickup</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Share trip details with a trusted contact</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Trust your instincts and prioritize safety</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Ensure vehicle insurance is current</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-glass-foreground mb-3">
                    For Passengers
                  </h3>
                  <ul className="space-y-2 text-glass-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Research your driver before booking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Meet in public places when possible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Share trip details with family/friends</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Have emergency contacts readily available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className="glass-card p-6 mt-8 text-center animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <h3 className="text-xl font-semibold text-glass-foreground mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-muted-foreground">
                While we don't provide customer support for individual rides,
                you can reach us for platform-related issues at{" "}
                <span className="text-primary">support@rideshare.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 animate-scale-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-secondary mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-glass-foreground mb-8">
                Join our community of travelers and discover a new way to
                explore the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="btn-accent-glass flex items-center space-x-3 text-lg px-8 py-4"
                  aria-label="Get Started Today"
                >
                  <Star size={24} />
                  <span>Get Started Today</span>
                </Link>

                <Link
                  to="/"
                  className="btn-glass flex items-center space-x-3 text-lg px-8 py-4"
                  aria-label="Learn More"
                >
                  <Shield size={24} />
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
