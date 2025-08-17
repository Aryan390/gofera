import { Link } from "react-router";
import { Car, Users, MapPin, Clock, Shield, Star } from "lucide-react";

const Home = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-full mb-8 animate-float">
              <Car className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
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
              >
                <Car size={24} />
                <span>Share Your Ride</span>
              </Link>

              <Link
                to="/find-rides"
                className="btn-secondary-glass flex items-center space-x-3 text-lg px-8 py-4"
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
                  <p className="text-muted-foreground">{feature.description}</p>
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-secondary mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-glass-foreground mb-8">
              Join our community of travelers and discover a new way to explore
              the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-accent-glass flex items-center space-x-3 text-lg px-8 py-4"
              >
                <Star size={24} />
                <span>Get Started Today</span>
              </Link>

              <Link
                to="/about"
                className="btn-glass flex items-center space-x-3 text-lg px-8 py-4"
              >
                <Shield size={24} />
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
