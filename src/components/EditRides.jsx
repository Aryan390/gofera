import { X } from "lucide-react";
import React from "react";
import { formatDateForInput, formatTimeForInput } from "../utils/helpers";

const EditRides = ({ setEditingRide, editingRide, handleUpdateRide }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 text-white">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Edit Ride</h2>
              <p className="text-sm text-muted-foreground">
                Update the details for your ride posting.
              </p>
            </div>
            <button
              onClick={() => setEditingRide(null)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-from" className="text-sm font-medium">
                  Start Location
                </label>
                <input
                  id="edit-from"
                  type="text"
                  placeholder="Starting location"
                  value={editingRide.startLocation || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      startLocation: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-to" className="text-sm font-medium">
                  Destination
                </label>
                <input
                  id="edit-to"
                  type="text"
                  placeholder="Destination"
                  value={editingRide.destination || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-date" className="text-sm font-medium">
                  Date
                </label>
                <input
                  id="edit-date"
                  type="date"
                  value={formatDateForInput(editingRide.date) || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-time" className="text-sm font-medium">
                  Time
                </label>
                <input
                  id="edit-time"
                  type="time"
                  value={formatTimeForInput(editingRide.time) || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-price" className="text-sm font-medium">
                  Price ($)
                </label>
                <input
                  id="edit-price"
                  type="number"
                  placeholder="0"
                  value={editingRide.price || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-seats" className="text-sm font-medium">
                  Available Seats
                </label>
                <input
                  id="edit-seats"
                  type="number"
                  min="1"
                  max="8"
                  value={editingRide.availableSeats || ""}
                  onChange={(e) =>
                    setEditingRide((prev) => ({
                      ...prev,
                      totalSeats: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description (Optional)
              </label>
              <textarea
                id="edit-description"
                placeholder="Add any additional details about your ride..."
                value={editingRide.description || ""}
                onChange={(e) =>
                  setEditingRide((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground min-h-[80px]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setEditingRide(null)}
                className="px-4 py-2 border rounded-md hover:bg-muted transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRide}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
              >
                Update Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRides;
