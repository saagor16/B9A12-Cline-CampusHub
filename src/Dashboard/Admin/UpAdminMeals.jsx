import axios from 'axios';
import useUpMeals from '../../Hooks/useUpMeals';
const UpAdminMeals  = () => {
    const [upcomingMeals] = useUpMeals()
  

    const handlePublish = async (id) => {
      try {
        await axios.patch(`/upcomingMeals/${id}/publish`);

      } catch (error) {
        console.error('Error publishing upcoming meal:', error);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold mb-6">Upcoming Meals</h2>
        <div className="w-full max-w-4xl">
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Meal Title</th>
                  <th className="py-3 px-6 text-left">Likes</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMeals.map((meal, index) => (
                  <tr key={meal._id} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{meal.title}</td>
                    <td className="py-4 px-6">{meal.likes}</td>
                    <td className="py-4 px-6">
                      <button onClick={() => handlePublish(meal._id)} className="text-green-500 hover:text-green-700">
                        Publish
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
  
export default UpAdminMeals;