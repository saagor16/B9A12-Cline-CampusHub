import { useState, useEffect, useContext, useRef } from 'react';
import navIcon from '../../assets/image/iconHub.svg';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { user, logOut } = useContext(AuthContext); // Using context for auth state

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleLogOut = () => {
        logOut();
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const navLinks = (
        <>
            <Link
                to='/'
                onClick={() => handleLinkClick('Home')}
                className={`px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 lg:text-orange-800 text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${activeLink === 'Home' ? 'bg-green-500' : ''}`}
            >
                Home
            </Link>
            <Link
                to='/meals'
                onClick={() => handleLinkClick('Meals')}
                className={`px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 lg:text-black text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${activeLink === 'Meals' ? 'bg-green-500' : ''}`}
            >
                Meals
            </Link>
            <Link
                to='/upcoming-meals'
                onClick={() => handleLinkClick('Upcoming Meals')}
                className={`px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 lg:text-black text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${activeLink === 'Upcoming Meals' ? 'bg-green-500' : ''}`}
            >
                Upcoming Meals
            </Link>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 shadow bg-gray-700 lg:bg-transparent">
            <div className="px-6 py-4">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to='/' className="flex items-center">
                            <img className="w-auto h-6 sm:h-7" src={navIcon} alt="Logo" />
                            <span className="ml-2 text-gray-200 lg:text-black">CampusHub</span>
                        </Link>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu"
                            >
                                {isOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out 
                        bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                            isOpen ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col items-center -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            {navLinks}

                            <div className="flex flex-col items-center mt-4 lg:mt-0 lg:flex-row">
                                {/* Notification button */}
                                <button
                                    className="mx-4 transition-colors duration-300 transform text-gray-200 
                                    lg:text-black
                                    hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                                    aria-label="show notifications"
                                >
                                    <FaBell />
                                </button>

                                {!user && (
                                    <Link
                                        to='/login'
                                        onClick={() => handleLinkClick('Join Us')}
                                        className={`px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 lg:text-black text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${activeLink === 'Join Us' ? 'bg-green-500' : ''}`}
                                    >
                                        Join Us
                                    </Link>
                                )}

                                {user && (
                                    <div className="relative mt-2 lg:mt-0" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            className="flex items-center focus:outline-none"
                                            onClick={toggleDropdown}
                                            aria-label="toggle profile dropdown"
                                        >
                                            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">{user.displayName}</h3>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                                <span className="block px-4 py-2 text-gray-800">{user.displayName}</span>
                                                <Link to='/dashboard' className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
                                                <button
                                                    className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={handleLogOut}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
