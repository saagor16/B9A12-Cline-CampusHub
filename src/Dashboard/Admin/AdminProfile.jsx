import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGithub, FaDribbble, FaTwitter, FaEnvelope } from 'react-icons/fa';

const AdminProfile = () => {
  const { user, userProfile } = useContext(AuthContext);
  const [mealCount, setMealCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchMealCount(user.email);
    }
  }, [user]);

  const fetchMealCount = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/meals/count?adminEmail=${email}`);
      const data = await response.json();
      if (response.ok) {
        setMealCount(data.count);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching meal count:", error);
    }
  };

  const handleUserProfile = async () => {
    userProfile();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-6 text-cyan-600">Admin Profile</h1>
      <form className="flex flex-col gap-5 justify-center items-center w-full" onSubmit={handleUserProfile}>
        <div className="card w-3/4 lg:w-1/3 shadow-xl bg-white rounded-lg overflow-hidden">
          <div className="bg-cyan-600 p-6 text-center">
            <figure className="flex justify-center mb-4">
              <img
                src={user.photoURL || "default-avatar.jpg"}
                alt={user.displayName || "User"}
                className="rounded-full w-48 h-48 border-4 border-white"
              />
            </figure>
            <h2 className="text-3xl font-bold text-white">{user.displayName || "Unknown"}</h2>
            <p className="text-lg text-white">{user.email || "Unknown"}</p>
          </div>
          <div className="card-body p-6 text-center">
            <div className="profile-badges flex flex-wrap justify-center gap-2 mt-4">
              {user.badges && user.badges.map((badge, index) => (
                <span key={index} className={`badge badge-${badge.toLowerCase()} px-4 py-1 rounded-full text-white`}>
                  {badge}
                </span>
              ))}
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold">Meals Added: {mealCount}</h3>
            </div>
          </div>
          <div className="flex justify-center p-6 space-x-4 align-center bg-gray-50">
            <a
              rel="noopener noreferrer"
              href="https://github.com/"
              target="_blank"
              aria-label="GitHub"
              className="p-2 rounded-md text-gray-800 hover:text-cyan-600"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://dribbble.com/"
              target="_blank"
              aria-label="Dribble"
              className="p-2 rounded-md text-gray-800 hover:text-cyan-600"
            >
              <FaDribbble className="w-6 h-6" />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://twitter.com/"
              target="_blank"
              aria-label="Twitter"
              className="p-2 rounded-md text-gray-800 hover:text-cyan-600"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              rel="noopener noreferrer"
              href="https://mail.google.com/mail/"
              target="_blank"
              aria-label="Email"
              className="p-2 rounded-md text-gray-800 hover:text-cyan-600"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
