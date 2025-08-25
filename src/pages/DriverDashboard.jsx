import { useEffect, useState } from "react";
import {
  Plus,
  Car,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Eye,
  Route,
  X,
} from "lucide-react";
import { rideRequests } from "../utils/rideRequests";
import ViewRides from "../components/ViewRides";
import EditRides from "../components/EditRides";
import DeleteRideModal from "../components/DeleteRideModal";
import Rides from "../components/Rides";

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const [viewingRide, setViewingRide] = useState(null);
  const [editingRide, setEditingRide] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleEditRide = (ride) => {
    setEditingRide(ride);
    // setNewRide(ride);
  };

  const handleUpdateRide = async () => {
    if (!editingRide) return;

    try {
      const response = await rideRequests(`/rides/${editingRide.id}`, {
        method: "PATCH",
        body: JSON.stringify(editingRide),
      });
      setRides((prev) =>
        prev.map((ride) =>
          ride.id === editingRide.id ? { ...ride, ...editingRide } : ride
        )
      );
      setEditingRide(null);
    } catch (error) {
      console.error("Error updating ride:", error);
      return;
    }

    // toast({
    //   title: "Ride Updated",
    //   description: "Your ride has been successfully updated.",
    // });
  };

  const handleDeleteRide = (rideId) => {
    setRides((prev) => prev.filter((ride) => ride.id !== rideId));
    setDeleteConfirm(null);
    // toast({
    //   title: "Ride Deleted",
    //   description: "Your ride has been successfully deleted.",
    // });
  };

  const handleRideLoad = async () => {
    try {
      const data = await rideRequests("/rides/my-rides?role=driver", {
        method: "GET",
      });
      setRides(data.data.rides);
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  useEffect(() => {
    handleRideLoad();
  }, []);

  const activeRides = rides.filter((ride) => ride.status === "active");
  const totalPassengers = rides.reduce((sum, ride) => sum + ride.passengers, 0);
  const totalEarnings = rides
    .filter((ride) => ride.status === "completed")
    .reduce((sum, ride) => sum + ride.price * ride.passengers, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen pt-24 mt-4 animate-scale-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero text-accent">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your rides and track your earnings
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-smooth shadow-elegant"
          >
            <Plus className="w-4 h-4" />
            Post New Ride
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-6 bg-card rounded-lg border border-border shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rides</p>
                <p className="text-2xl font-bold text-primary">
                  {activeRides.length}
                </p>
              </div>
              <Car className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* <div className="p-6 bg-card rounded-lg border border-border shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Passengers
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {totalPassengers}
                </p>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </div> */}

          <div className="p-6 bg-card rounded-lg border border-border shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Expected Earnings
                </p>
                <p className="text-2xl font-bold text-accent">
                  ${totalEarnings}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>

        {/* Rides List */}
        <div className="p-6 bg-card rounded-lg border border-border shadow-elegant text-white">
          <div className="flex items-center gap-2 mb-6">
            <Route className="w-5 h-5" />
            <h2 className="text-xl font-semibold">My Rides</h2>
          </div>

          {rides.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No rides posted yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by creating your first ride posting
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-smooth mx-auto"
              >
                <Plus className="w-4 h-4" />
                Post Your First Ride
              </button>
            </div>
          ) : (
            <Rides
              rides={rides}
              setViewingRide={setViewingRide}
              handleEditRide={handleEditRide}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
        </div>

        {/* View Ride Modal */}
        {viewingRide && (
          <ViewRides
            setViewingRide={setViewingRide}
            viewingRide={viewingRide}
          />
        )}

        {/* Edit Ride Modal */}
        {editingRide && (
          <EditRides
            setEditingRide={setEditingRide}
            editingRide={editingRide}
            handleUpdateRide={handleUpdateRide}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <DeleteRideModal
            setDeleteConfirm={setDeleteConfirm}
            handleDeleteRide={handleDeleteRide}
            deleteConfirm={deleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
