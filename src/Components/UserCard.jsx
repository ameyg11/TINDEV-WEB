import React from "react";

const UserCard = React.forwardRef(({ user, onAction }, ref) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills = [],
  } = user;

  return (
    <div ref={ref} className="absolute">
      <div className="card bg-neutral-800 w-80 md:w-96 shadow-xl relative overflow-hidden">
        <figure className="h-96">
          <img
            src={photoUrl}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
          <h2 className="card-title text-2xl font-bold">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-sm">
              {age} {gender}
            </p>
          )}

          {about && <p className="mt-1">{about}</p>}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-neutral-700 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div
            className="flex justify-center mt-4 gap-3"
            style={{ touchAction: "manipulation", pointerEvents: "auto" }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction("ignored");
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="btn btn-outline btn-error"
            >
              Ignore
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction("interested");
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="btn btn-outline btn-info"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserCard;
