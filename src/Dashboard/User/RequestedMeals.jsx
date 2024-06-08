import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTimes } from 'react-icons/fa';

const RequestedMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // eslint-disable-next-line no-unused-vars
    const { data: meals = [], refetch } = useQuery({
        queryKey: ['requestedMeals', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-meals/${user.email}`);
            return res.data;
        }
    });

    const cancelMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/requested-meals/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['requestedMeals', user.email]);
        }
    });

    const handleCancel = (id) => {
        cancelMutation.mutate(id);
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Requested Meals</h2>
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4">Total Requested Meals: {meals.length}</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white rounded-lg">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Meal Title</th>
                                <th className="py-3 px-6 text-left">Likes</th>
                                <th className="py-3 px-6 text-left">Reviews</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal, index) => (
                                <tr key={meal._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="py-4 px-6">{meal.title}</td>
                                    <td className="py-4 px-6">{meal.likes}</td>
                                    <td className="py-4 px-6">{meal.reviews.length}</td>
                                    <td className="py-4 px-6">{meal.status}</td>
                                    <td className="py-4 px-6">
                                        <button onClick={() => handleCancel(meal._id)} className="text-red-500 hover:text-red-700">
                                            <FaTimes className="w-5 h-5" />
                                        </button>
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

export default RequestedMeals;
