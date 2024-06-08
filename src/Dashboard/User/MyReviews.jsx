import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // eslint-disable-next-line no-unused-vars
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user.email}`);
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/reviews/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', user.email]);
        }
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4">Total Reviews: {reviews.length}</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Meal Title</th>
                                <th className="py-3 px-6 text-left">Likes</th>
                                <th className="py-3 px-6 text-left">Review</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={review._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="py-4 px-6">{review.mealTitle}</td>
                                    <td className="py-4 px-6">{review.likes}</td>
                                    <td className="py-4 px-6">{review.review}</td>
                                    <td className="py-4 px-6 flex space-x-4">
                                        <Link to={`/edit-review/${review._id}`} className="text-blue-500 hover:text-blue-700">
                                            <FaEdit className="w-5 h-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt className="w-5 h-5" />
                                        </button>
                                        <Link to={`/meal/${review.mealId}`} className="text-green-500 hover:text-green-700">
                                            <FaEye className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyReviews;
