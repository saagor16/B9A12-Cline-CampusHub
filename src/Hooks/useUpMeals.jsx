import { useEffect, useState } from 'react';
const useUpMeals = () => {
    const [upMeals, setUpMeals] = useState([]);

  useEffect(() => {
    // Fetch meals data from an API or local data
    fetch('http://localhost:5000/upMeals') // Adjust the URL to your data source
      .then(response => response.json())
      .then(data => setUpMeals(data))
      .catch(error => console.error('Error fetching meals:', error));
  }, []);

  return [upMeals];
};

export default useUpMeals;