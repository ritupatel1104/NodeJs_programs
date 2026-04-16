import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    oldPassword: "", // Field for user to verify current password
    newPassword: "", // Field for the fresh password
  });

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsUnauthorized(true);
      setInitialFetch(false);
      return;
    }

    const fetchCurrentData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData((prev) => ({
          ...prev,
          username: response.data.user.username,
          email: response.data.user.email,
        }));
      } catch (error) {
        if (error.response?.status === 401) {
            setIsUnauthorized(true);
        }
      } finally {
        setInitialFetch(false);
      }
    };
    fetchCurrentData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        ...(showPasswordField && { 
            oldPassword: formData.oldPassword, 
            newPassword: formData.newPassword 
        }),
      };

      await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.map(err => err.msg).join("\n"));
      } else {
        alert(error.response?.data?.message || "Update failed. Check your old password.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- UI FOR UNAUTHORIZED ACCESS ---
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center p-10 border border-red-500/20 bg-red-500/5 rounded-3xl max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Unauthorized Access</h2>
          <p className="text-gray-400 mb-6">Please login to edit your profile.</p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (initialFetch) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-indigo-500 font-bold animate-pulse text-xl">Fetching Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
      <div className="relative group w-full max-w-xl">
        {/* Decorative Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl blur opacity-25"></div>

        <div className="relative bg-black border border-white/10 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Edit Profile</h2>
          <p className="mb-8 text-indigo-300/60 font-medium tracking-wide">Update your account information</p>

          <form onSubmit={handleSave} className="flex flex-col gap-5 text-left">
            {/* Username */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="text-[10px] uppercase text-indigo-300 font-bold block mb-1">Username</label>
              <input
                type="text"
                required
                className="w-full bg-transparent outline-none text-md font-bold text-white placeholder:text-white/20"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="text-[10px] uppercase text-indigo-300 font-bold block mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-transparent outline-none text-md font-bold text-white placeholder:text-white/20"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password Toggle Button */}
            {!showPasswordField ? (
              <button
                type="button"
                onClick={() => setShowPasswordField(true)}
                className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-all text-left ml-2"
              >
                + Change Password?
              </button>
            ) : (
              <div className="flex flex-col gap-5 animate-in fade-in duration-500">
                {/* Old Password */}
                <div className="bg-white/5 p-4 rounded-2xl border border-indigo-500/30">
                  <label className="text-[10px] uppercase text-indigo-300 font-bold block mb-1">Current Password</label>
                  <input
                    type="password"
                    required={showPasswordField}
                    placeholder="Enter current password to verify"
                    className="w-full bg-transparent outline-none text-md font-bold text-white placeholder:text-white/20"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  />
                </div>

                {/* New Password Field */}
                <div className="bg-white/5 p-4 rounded-2xl border border-pink-500/30">
                  <label className="text-[10px] uppercase text-pink-300 font-bold block mb-1">
                    New Password (Min 6 Characters)
                  </label>
                  <input
                    type="password"
                    required={showPasswordField}
                    minLength={6} 
                    placeholder="Enter new secure password"
                    className="w-full bg-transparent outline-none text-md font-bold text-white placeholder:text-white/20"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordField(false);
                    setFormData({...formData, oldPassword: "", newPassword: ""});
                  }}
                  className="text-red-400 text-xs font-bold ml-2 text-left"
                >
                  Cancel Password Change
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 border border-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/5 transition-all font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-white text-black px-6 py-3 rounded-xl hover:bg-indigo-500 hover:text-white transition-all font-bold disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}