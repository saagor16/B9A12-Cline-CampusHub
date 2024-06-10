import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheackoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { packageName } = useParams();
  const packagePrices = {
    Silver: 20,
    Gold: 50,
    Platinum: 100,
  };
  const packagePrice = packagePrices[packageName];


  if (!packageName || !packagePrice) {
    return <div>Invalid package</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Checkout for {packageName} Package</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm packageName={packageName} packagePrice={packagePrice} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
