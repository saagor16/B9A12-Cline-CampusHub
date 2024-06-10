import { useEffect, useState } from 'react';

const usePayment = () => {
    const [payment, setPayment] = useState([]);

    useEffect(() => {
      // Fetch meals data from an API or local data
      fetch('http://localhost:5000/payments') // Adjust the URL to your data source
        .then(response => response.json())
        .then(data => setPayment(data))
        .catch(error => console.error('Error fetching meals:', error));
    }, []);
  
    return [payment];
};

export default usePayment;