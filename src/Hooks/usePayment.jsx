import { useEffect, useState } from 'react';

const usePayment = () => {
    const [paymentData, setPaymentData] = useState({});

    useEffect(() => {
        // Fetch payment data from an API or local data
        fetch('http://localhost:5000/payments') // Adjust the URL to your data source
            .then(response => response.json())
            .then(data => {
                setPaymentData(data);
            })
            .catch(error => console.error('Error fetching payment data:', error));
    }, []);
  
    return paymentData;
};

export default usePayment;
