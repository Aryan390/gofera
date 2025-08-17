import { Shield, AlertTriangle, Users, Car } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-24 px-4">
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
                Your rides are your responsibility, and we are not liable for
                anything. We only provide a platform for sharing rides. Please
                exercise caution, verify driver/passenger details, and ensure
                your safety at all times.
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
              Share your journey and offset travel costs by offering rides to
              fellow travelers. Post your route, set your price, and connect
              with passengers heading in the same direction.
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
              Find affordable and convenient rides to your destination. Browse
              available trips, connect with verified drivers, and enjoy a more
              social way to travel.
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
            While we don't provide customer support for individual rides, you
            can reach us for platform-related issues at{" "}
            <span className="text-primary">support@rideshare.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
