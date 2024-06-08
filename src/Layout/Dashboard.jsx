import {
    FaUser, FaUserShield, FaPlus, FaListAlt, FaStar, FaUserCheck,
    FaClock, FaRegListAlt, FaWallet, FaUsersCog, FaHome
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            navigate("/dashboard/adminProfile");
        } else {
            navigate("/dashboard/myProfile");
        }
    }, [isAdmin, navigate]);

    return (
        <div className="">
            <div className="flex">
                {/* Dashboard side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu p-4 pt-20">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <FaUserShield /> Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUser">
                                        <FaUsersCog /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addMeal">
                                        <FaPlus /> Add Meal
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allMeals">
                                        <FaListAlt /> All Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allReviews">
                                        <FaStar /> All Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/serveMeals">
                                        <FaUserCheck /> Serve Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/upcomingMeals">
                                        <FaClock /> Upcoming Meals
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/myProfile">
                                        <FaUser /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestedMeals">
                                        <FaRegListAlt /> Requested Meals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReviews">
                                        <FaStar /> My Reviews
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaWallet /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* Shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/* Dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
