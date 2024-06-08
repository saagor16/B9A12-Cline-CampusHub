import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGithub, FaDribbble, FaTwitter, FaEnvelope } from 'react-icons/fa';

const MyProfile = () => {
    const { user, userProfile } = useContext(AuthContext);

    const handleUserProfile = async () => {
        userProfile();
    };

    return (
        <div className="min-h-screen  flex justify-center items-center">
            <form className="flex gap-5 flex-col justify-center items-center w-full" onSubmit={handleUserProfile}>
                <div className="card w-3/4 lg:w-1/3 shadow-xl bg-cyan-600">
                    <div>
                        <figure className="px-10 pt-10">
                            <img
                                src={user.photoURL || "default-avatar.jpg"}
                                alt={user.displayName || "User"}
                                className="rounded-full w-48 h-48"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl font-bold">Name: {user.displayName || "Unknown"}</h2>
                            <p className="text-lg">Email: {user.email || "Unknown"}</p>
                            <div className="profile-badges flex gap-2 mt-4">
                                {user.badges && user.badges.map((badge, index) => (
                                    <span key={index} className={`badge badge-${badge.toLowerCase()} px-4 py-1 rounded-full text-white`}>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center mb-6">
                        <a
                            rel="noopener noreferrer"
                            href="https://github.com/"
                            target="_blank"
                            aria-label="GitHub"
                            className="p-2 rounded-md text-gray-800 hover:text-violet-600"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            href="https://dribbble.com/"
                            target="_blank"
                            aria-label="Dribble"
                            className="p-2 rounded-md text-gray-800 hover:text-violet-600"
                        >
                            <FaDribbble className="w-6 h-6" />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            href="https://twitter.com/"
                            target="_blank"
                            aria-label="Twitter"
                            className="p-2 rounded-md text-gray-800 hover:text-violet-600"
                        >
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            href="https://mail.google.com/mail/"
                            target="_blank"
                            aria-label="Email"
                            className="p-2 rounded-md text-gray-800 hover:text-violet-600"
                        >
                            <FaEnvelope className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
