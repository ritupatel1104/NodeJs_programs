import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [data, setData] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 1. If no token exists at all, mark as unauthorized
    if (!token) {
      setIsUnauthorized(true);
      return;
    }

    const FetchData = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response?.data?.user);
      } catch (error) {
        console.log(error.response);
        // 2. If token is invalid or expired
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setIsUnauthorized(true);
        }
      }
    };

    FetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // --- UI FOR UNAUTHORIZED ACCESS ---
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center p-10 border border-red-500/20 bg-red-500/5 rounded-3xl max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Unauthorized Access</h2>
          <p className="text-gray-400 mb-6">Please login to view your profile details.</p>
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
  if (!data) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-indigo-500 font-bold animate-pulse">Fetching Profile...</div>
      </div>
    );
  }

  // --- ACTUAL PROFILE UI ---
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-black border border-white/10 rounded-3xl p-12 w-full max-w-2xl text-white text-center">
          
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all"
            onClick={() => navigate("/editprofile")}                                                                                                                                                 
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
            </svg>
          </button>

          <div className="relative inline-block mb-6">
            <img
              src="https://media.easy-peasy.ai/447638f0-65fd-449c-9a6c-c7840adf9777/44846dbd-7e05-4cab-89db-1d4510e5a89c.png"
              alt="avatar"
              className="w-28 h-28 rounded-3xl object-cover border-2 border-white/10 p-1"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-black"></div>
          </div>

          <h2 className="text-3xl font-bold mb-1">Welcome !!</h2>
          <p className="mb-8 text-indigo-300/60 font-medium tracking-wide">You are a verified user now !!</p>

          <div className="flex flex-col gap-4 mb-8 text-left">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase text-indigo-300 font-bold">Username</p>
              <p className="text-md font-bold">{data?.username || "N/A"}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase text-indigo-300 font-bold">Email</p>
              <p className="text-md font-bold">{data?.email || "N/A"}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full border border-white/10 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all font-bold">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}