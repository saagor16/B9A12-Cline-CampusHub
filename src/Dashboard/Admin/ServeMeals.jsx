import { useState, useEffect } from 'react';

const ServeMeals = () => {
  const [mealRequests, setMealRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealRequests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/serveMeals?search=${search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meal requests');
        }
        const data = await response.json();
        setMealRequests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal requests:', error);
        setLoading(false);
      }
    };
    fetchMealRequests();
  }, [search]);

  const handleServe = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/serveMeals/${id}/delivered`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update meal request status');
      }
      const updatedRequest = await response.json();
      setMealRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    } catch (error) {
      console.error('Error updating meal request status:', error);
    }
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="bg-cream dark:bg-gray-600 py-8 text-orange-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by username or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-teal-300 dark:border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                      User Email
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                      User Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                      Serve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mealRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        {request.meal.title}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        {request.user.email}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        {request.user.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        {request.status}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        {request.status !== 'delivered' && (
                          <button
                            onClick={() => handleServe(request._id)}
                            className="bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600"
                          >
                            Serve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServeMeals;
