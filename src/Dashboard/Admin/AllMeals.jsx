import { Link } from "react-router-dom";
import useMeals from "../../Hooks/useMeals";

const AllMeals = () => {
  const [meals] = useMeals();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6 mt-10">
      <div className="card w-full max-w-6xl shadow-xl bg-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-600">
          All Meals
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => "likes"}
              >
                Likes
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => "reviews"}
              >
                Reviews
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meals.map((meal, index) => (
              <tr key={meal._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{meal.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{meal.likes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{meal.reviews}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {meal.adminName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/single/${meal._id}`}>
                    {" "}
                    {/* Specify the destination URL */}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
