import { use, useEffect, useState } from "react";
import { Edit, Save, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useUserActions, useUser } from "../context/UserContext";
import { formatPhone, getYear } from "../utils/helpers";

const Profile = () => {
  const { updateProfile, deleteProfile } = useUserActions();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profile, setProfile] = useState({});
  const [editForm, setEditForm] = useState(profile);

  useEffect(() => {
    setProfile({ ...user });
  }, [user]);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(editForm);
      if (result.success) {
        setProfile((prev) => ({ ...prev, ...editForm }));
        setIsEditing(false);
      }
    } catch (error) {
      alert("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);

    // In a real app, redirect or trigger account deletion here
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen pt-24 mt-4 animate-scale-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero text-accent-glow">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-lg shadow-md p-6 text-white">
          <div className="pb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-semibold">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    profile?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-muted-foreground flex items-center justify-center sm:justify-start mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {getYear(profile.createdAt)}
                  </p>
                </div>
              </div>

              {!isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background hover:bg-accent-foreground cursor-pointer hover:border-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-md bg-background hover:bg-accent-foreground cursor-pointer transition-colors"
                  >
                    {/* <Trash2 className="w-4 h-4" /> */}
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {isEditing ? (
              // Edit Form
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      value={editForm.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {/* <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <input
                      id="address"
                      value={editForm.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter your address"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div> */}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-md bg-background hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {formatPhone(profile.phone)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">Rides Taken</p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-secondary">4.8</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-accent">$245</div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently removed from our
              servers.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-border rounded-md bg-background hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
