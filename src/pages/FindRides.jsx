import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  DollarSign,
  Filter,
} from "lucide-react";

const FindRides = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Mock data for available rides
  const mockRides = [
    {
      id: "1",
      driver: "Sarah M.",
      startLocation: "Downtown Seattle",
      destination: "Portland, OR",
      date: "2024-01-15",
      time: "14:00",
      eta: "3.5",
      seats: 2,
      price: 45,
      contact: "(555) 123-4567",
      description: "Comfortable sedan, non-smoking. Will stop for breaks.",
    },
    {
      id: "2",
      driver: "Mike T.",
      startLocation: "University District",
      destination: "Vancouver, BC",
      date: "2024-01-16",
      time: "08:30",
      eta: "2.5",
      seats: 3,
      price: 35,
      contact: "mike.travels@email.com",
      description: "SUV with plenty of space for luggage.",
    },
    {
      id: "3",
      driver: "Jessica L.",
      startLocation: "Bellevue",
      destination: "San Francisco, CA",
      date: "2024-01-17",
      time: "06:00",
      eta: "12",
      seats: 1,
      price: 120,
      contact: "(555) 987-6543",
      description:
        "Long distance trip with overnight stop in Portland. Share gas costs.",
    },
    {
      id: "4",
      driver: "Alex R.",
      startLocation: "Capitol Hill",
      destination: "Spokane, WA",
      date: "2024-01-18",
      time: "16:30",
      eta: "4.5",
      seats: 2,
      price: 50,
      contact: "alex.rides@email.com",
    },
  ];

  const [rides] = useState(mockRides);

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.startLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || ride.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const handleBookRide = (rideId) => {
    console.log("Booking ride:", rideId);
    // Handle booking logic here
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-accent rounded-full mb-6 animate-float">
            <Search className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-accent mb-4">
            Find Your Ride
          </h1>
          <p className="text-glass-foreground text-lg">
            Discover available rides and book your journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 mb-8 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Search by destination or starting point
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glass w-full pl-12"
                  placeholder="Where do you want to go?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Filter by date
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="input-glass w-full pl-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rides Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredRides.map((ride, index) => (
            <div
              key={ride.id}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {ride.driver}
                  </h3>
                  <div className="flex items-center space-x-2 text-glass-foreground">
                    <User size={16} />
                    <span className="text-sm">Driver</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success">
                    ${ride.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per person
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-secondary w-5 h-5" />
                  <span className="text-glass-foreground">
                    <span className="font-medium">From:</span>{" "}
                    {ride.startLocation}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary w-5 h-5" />
                  <span className="text-glass-foreground">
                    <span className="font-medium">To:</span> {ride.destination}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-accent w-5 h-5" />
                    <span className="text-glass-foreground text-sm">
                      {new Date(ride.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="text-warning w-5 h-5" />
                    <span className="text-glass-foreground text-sm">
                      {ride.time} ({ride.eta}h)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="text-success w-5 h-5" />
                  <span className="text-glass-foreground text-sm">
                    {ride.seats} seat{ride.seats > 1 ? "s" : ""} available
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="text-primary w-5 h-5" />
                  <span className="text-glass-foreground text-sm">
                    {ride.contact}
                  </span>
                </div>
              </div>

              {ride.description && (
                <div className="bg-glass/40 rounded-lg p-3 mb-4">
                  <p className="text-glass-foreground text-sm">
                    {ride.description}
                  </p>
                </div>
              )}

              <button
                onClick={() => handleBookRide(ride.id)}
                className="btn-primary-glass w-full flex items-center justify-center space-x-2"
              >
                <DollarSign size={18} />
                <span>Book This Ride</span>
              </button>
            </div>
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-glass-foreground mb-2">
              No rides found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new
              rides.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindRides;
