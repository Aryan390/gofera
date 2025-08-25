import { X } from "lucide-react";
import React from "react";

const ViewRides = ({ setViewingRide, viewingRide }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 text-white">
      <div className="bg-card rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Ride Details</h2>
            <button
              onClick={() => setViewingRide(null)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Start Location
                </label>
                <p className="font-medium">{viewingRide.startLocation}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Destination
                </label>
                <p className="font-medium">{viewingRide.destination}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date
                </label>
                <p className="font-medium">
                  {new Date(viewingRide.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Time
                </label>
                <p className="font-medium">{viewingRide.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Price per seat
                </label>
                <p className="font-medium">${viewingRide.price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Available seats
                </label>
                <p className="font-medium">{viewingRide.availableSeats}</p>
              </div>
            </div>
            {viewingRide.description && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <p className="font-medium">{viewingRide.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRides;
