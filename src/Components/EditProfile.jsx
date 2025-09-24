import React, { useState } from 'react';

const EditProfile = () => {
  // State variables for each editable field
  const [firstName, setFirstName] = useState("Naruto");
  const [lastName, setLastName] = useState("Uzumaki");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [photoUrl, setPhotoUrl] = useState("https://i.pinimg.com/736x/21/f6/fc/21f6fc4abd29ba736e36e540a787e7da.jpg");
  const [about, setAbout] = useState("A shinobi of Konohagakure's Uzumaki clan. He became the jinchuriki of the Nine-Tailed Demon Fox on the day of his birth.");
  const [skills, setSkills] = useState("React, Node.js, Express, MongoDB");
  
  // State for non-editable fields and UI feedback
  const [emailId, setEmailId] = useState("naruto@gmail.com");
  const [password, setPassword] = useState("Ameygawade@11");
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // A generic save function that would typically connect to a backend
  const handleSave = () => {
    // Here, you would send your updated data to a server.
    // For this example, we'll just log the data to the console
    // and show a success message.
    const updatedProfile = {
      firstName,
      lastName,
      age,
      gender,
      photoUrl,
      about,
      skills: skills.split(',').map(s => s.trim()),
    };
    console.log("Saving profile data:", updatedProfile);
    setIsSaved(true);
    // You could also add a timer to hide the message automatically
    setTimeout(() => setIsSaved(false), 3000); 
  };

  return (
    <div className="flex justify-center min-h-screen bg-neutral-900 text-neutral-content p-4 font-sans">
      <div className="w-full max-w-4xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="avatar">
            <div className="bg-primary text-primary-content rounded-full w-20 h-20 flex items-center justify-center">
              {/* User icon from SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="text-4xl w-10 h-10 fill-current">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.4 304 0 383.4 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.4 368.6 304 269.7 304H178.3z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">Edit Profile</h1>
        <p className="text-center text-neutral-400 mb-8">Update your public profile details and save your changes.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* First and Last Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          {/* Age and Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Age</span>
            </label>
            <input
              type="number"
              placeholder="Age"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Gender</span>
            </label>
            <select
              className="select select-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          {/* Email (disabled) */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">Email (Cannot be changed)</span>
            </label>
            <label className="input input-bordered flex items-center gap-3 bg-neutral-700 border-neutral-600 focus-within:border-primary opacity-50 cursor-not-allowed">
              {/* Envelope icon from SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              <input
                type="email"
                placeholder="Email"
                className="grow"
                value={emailId}
                disabled
              />
            </label>
          </div>

          {/* Photo URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Photo URL"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          
          {/* About section */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">About</span>
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              maxLength={99}
              className="textarea textarea-bordered h-24 w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <p className="text-xs text-neutral-400 text-right mt-1">{about.length} / 99</p>
          </div>

          {/* Skills */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">Skills (comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="alert alert-error my-4 rounded-lg shadow-md md:col-span-2">
            <span>{error}</span>
          </div>
        )}
        
        <div className="form-control mt-8">
          <button
            className="btn btn-primary btn-block text-lg font-bold py-3 transition-transform transform hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        
        {isSaved && (
          <div className="alert alert-success my-4 rounded-lg shadow-md">
            <span>Profile updated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
