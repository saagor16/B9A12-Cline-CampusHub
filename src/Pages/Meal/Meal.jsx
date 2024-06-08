import { useState, useEffect } from "react";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    fetch("http://localhost:5000/meals")
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error fetching meals:", error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: parseFloat(value) }));
  };

  const filteredMeals = meals.filter((meal) => {
    return (
      meal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || meal.category === selectedCategory) &&
      parseFloat(meal.price) >= priceRange.min &&
      parseFloat(meal.price) <= priceRange.max
    );
  });

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center">All Meals</h1>
      <div className="mt-8 flex justify-center">
        <div className="w-96">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full p-3 text-sm border rounded-md"
          />
        </div>
        <div className="ml-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-52 p-3 text-sm border rounded-md"
          >
            <option value="All">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="ml-4">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
            name="min"
            className="w-20 p-3 text-sm border rounded-l-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            name="max"
            className="w-20 p-3 text-sm border rounded-r-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredMeals.map((meal) => (
          <div key={meal.id} className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold">{meal.title}</h2>
            <p className="mt-2 text-gray-600">{meal.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">{`$${meal.price}`}</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meal;