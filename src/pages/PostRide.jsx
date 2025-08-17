import { useState } from "react";
import { MapPin, Calendar, Clock, User, Phone, Car } from "lucide-react";

const PostRide = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    destination: "",
    date: "",
    time: "",
    eta: "",
    contact: "",
    seats: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ride posted:", formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-secondary rounded-full mb-6 animate-float">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-secondary mb-4">
            Post Your Ride
          </h1>
          <p className="text-glass-foreground text-lg">
            Share your journey and help others reach their destination
          </p>
        </div>

        <div className="glass-card p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Starting Point
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    placeholder="Where are you starting from?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    placeholder="Where are you going?"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warning w-5 h-5" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  ETA (hours)
                </label>
                <input
                  type="number"
                  name="eta"
                  value={formData.eta}
                  onChange={handleChange}
                  className="input-glass w-full"
                  placeholder="2.5"
                  step="0.5"
                  min="0.5"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Available Seats
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-success w-5 h-5" />
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    placeholder="3"
                    min="1"
                    max="8"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Price per Person ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-glass w-full"
                  placeholder="25"
                  min="0"
                  step="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-glass-foreground mb-2">
                  Contact Info
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="input-glass w-full pl-12"
                    placeholder="Phone or email"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Additional Details
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-glass w-full h-24 resize-none"
                placeholder="Any additional information about your ride (meeting point, vehicle type, preferences, etc.)"
              />
            </div>

            <button
              type="submit"
              className="btn-secondary-glass w-full flex items-center justify-center space-x-2 text-lg font-semibold py-4"
            >
              <Car size={24} />
              <span>Post Your Ride</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostRide;
