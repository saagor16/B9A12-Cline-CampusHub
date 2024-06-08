import { useEffect, useState } from 'react';

const useMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch meals data from an API or local data
    fetch('http://localhost:5000/meals') // Adjust the URL to your data source
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error => console.error('Error fetching meals:', error));
  }, []);

  return [meals];
};

export default useMeals;
