import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground";
    case "completed":
      return "bg-secondary text-secondary-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Rides = ({ rides, setViewingRide, handleEditRide, setDeleteConfirm }) => {
  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <div
          key={ride.id}
          className="border rounded-lg p-4 hover:shadow-md transition-smooth"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{ride.startLocation}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium">{ride.destination}</span>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    ride.status
                  )}`}
                >
                  {ride.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(ride.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {ride.time}
                </div>

                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />${ride.price} per seat
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewingRide(ride)}
                className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-muted transition-smoothn cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleEditRide(ride)}
                disabled={ride.status === "completed"}
                className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Edit className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDeleteConfirm(ride.id)}
                className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-muted transition-smooth cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rides;
