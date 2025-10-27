import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons

const EditProfile = ({ user }) => {
  if (!user) return <div className="text-white">Loading user data...</div>;

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || 25);
  const [gender, setGender] = useState(user.gender || "Male");
  const [photoUrl, setPhotoUrl] = useState(
    user.photoUrl ||
      "https://i.pinimg.com/736x/21/f6/fc/21f6fc4abd29ba736e36e540a787e7da.jpg"
  );
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills)
      ? user.skills.join(", ")
      : user.skills || "React, Node.js, Express, MongoDB"
  );
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false); // 🆕 upload state

  const dispatch = useDispatch();

  // Prevent background scroll when preview open
  useEffect(() => {
    if (showPreview) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPreview]);

  // Optional: close preview on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowPreview(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // 🆕 handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // ... inside handleImageUpload ...
    try {
      setUploading(true); // 👈 Set uploading true before request
      const res = await axios.post(`${BASE_URL}/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Uploaded URL:", res.data.url);
      setPhotoUrl(res.data.url); // 👈 FIX: Update the photoUrl state
    } catch (error) {
      console.error("❌ Image upload error:", error);
    } finally {
      setUploading(false); // 👈 Set uploading false after completion
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
        skills: skills.split(",").map((s) => s.trim()),
      };

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        updatedProfile,
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(res.data));

      if (res.status === 200) {
        setIsSaved(true);
        setError("");
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
      setIsSaved(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col lg:flex-row items-start gap-8 px-6 md:px-12 py-10 relative transition-all duration-300">
      {/* LEFT: Edit Form */}
      <div className="flex-1 w-full bg-[#121212]/80 backdrop-blur-lg border border-[#1e1e1e] rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-semibold mb-2">Edit Profile</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Customize your profile to share your best self with the community ✨
        </p>

        <div className="space-y-8">
          {/* --- Basic Info Section --- */}
          <section>
            <h2 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-800 pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option className="bg-[#1b1b1b]" value="Male">
                    Male
                  </option>
                  <option className="bg-[#1b1b1b]" value="Female">
                    Female
                  </option>
                  <option className="bg-[#1b1b1b]" value="Others">
                    Others
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* --- About Section --- */}
          <section>
            <h2 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-800 pb-2">
              About You
            </h2>

            {/* 🆕 Image Upload */}
            {/* 🆕 Image Upload */}
<div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
  <img
    src={
      photoUrl ||
      "https://via.placeholder.com/96x96.png?text=Preview"
    }
    alt="Preview"
    className="w-24 h-24 rounded-full object-cover border border-gray-700"
  />

  <div className="flex flex-col sm:flex-row gap-2 items-center">
    <label className="cursor-pointer text-sm text-gray-300 bg-[#1b1b1b] border border-[#333] rounded-md px-3 py-1 hover:bg-[#222] transition">
      Choose Photo
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          // Local preview before upload
          const localUrl = URL.createObjectURL(file);
          setPhotoUrl(localUrl);

          const formData = new FormData();
          formData.append("file", file);

          try {
            setUploading(true);
            const res = await axios.post(`${BASE_URL}/upload/image`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            setPhotoUrl(res.data.url);
          } catch (error) {
            console.error("❌ Image upload error:", error);
          } finally {
            setUploading(false);
          }
        }}
        className="hidden"
      />
    </label>

    {uploading && (
      <p className="text-blue-400 text-sm animate-pulse">Uploading...</p>
    )}
  </div>
</div>


            <label className="block text-gray-300 text-sm mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              maxLength={99}
              className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 h-24 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us a bit about yourself..."
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              {about.length}/99
            </p>
          </section>

          {/* --- Skills Section --- */}
          <section>
            <h2 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-800 pb-2">
              Skills <span className="text-sm font-serif font-light">(comma seperated)</span>
            </h2>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-[#1b1b1b] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </section>
        </div>

        {/* --- Status & Actions --- */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-600/30 text-red-400 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
        {isSaved && (
          <div className="mt-6 bg-green-500/10 border border-green-600/30 text-green-400 px-4 py-2 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-[1.02]"
          >
            Save Changes
          </button>

          {/* 👁️ Preview Button */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-[1.02]"
          >
            {showPreview ? (
              <>
                <EyeOff size={18} /> Hide Preview
              </>
            ) : (
              <>
                <Eye size={18} /> Show Preview
              </>
            )}
          </button>
        </div>
      </div>

      {/* 👁️ INTERACTIVE PREVIEW SECTION */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-b from-[#1b1b1b]/95 to-[#111]/95 border border-[#2a2a2a] rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all duration-300 scale-95 opacity-0 animate-fadeInCard hover:scale-105"
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-transform transform hover:scale-110"
            >
              ✕
            </button>

            <UserCard
              user={{
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about,
                skills: skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }}
            />
          </div>

          <style jsx>{`
            @keyframes fadeInCard {
              0% {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
            .animate-fadeInCard {
              animation: fadeInCard 0.35s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
