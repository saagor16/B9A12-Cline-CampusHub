import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import usePayment from "../../Hooks/usePayment";
import useUpMeals from "../../Hooks/useUpMeals";

const UpcomingMeals = () => {
  const { user } = useAuth();
  const [upMeals] = useUpMeals();
  const paymentData = usePayment();
  console.log(paymentData)

  const handleLike = async (mealId) => {
    try {
      if (!user || !user.isPremium) {
        console.log("Only premium users can like this meal.");
        return;
      }

      if (!paymentData || !paymentData.email || paymentData.email !== user.email) {
        console.log("Only premium users with matching payment email can like this meal.");
        return;
      }

      const response = await axios.post("/likeMeal", { mealId });
      console.log("Meal liked successfully:", response.data);
    } catch (error) {
      console.error("Error liking meal:", error);
    }
  };

  return (
    <div className="py-8 px-4 mt-20">
      <h2 className="text-2xl text-center font-bold mb-4">Upcoming Meals</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {upMeals.map((meal) => (
          <div key={meal._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2">{meal.title}</h3>
            <p className="text-gray-600">{meal.description}</p>
            {user && user.isPremium ? (
              <button
                onClick={() => handleLike(meal._id)}
                disabled={meal.liked}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
              >
                {meal.liked ? "Liked" : "Like"}
              </button>
            ) : (
              <p className="mt-4 text-red-500">Only premium users can like this meal.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
