import React from "react";

const DeleteRideModal = ({
  setDeleteConfirm,
  handleDeleteRide,
  deleteConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-sm w-full">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Delete Ride</h2>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this ride? This action cannot be
              undone.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 border rounded-md hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteRide(deleteConfirm)}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-smooth"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRideModal;
