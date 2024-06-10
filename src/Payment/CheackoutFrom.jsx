/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CheckoutForm = ({ packageName, packagePrice, badge }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (packagePrice > 0) {
          const response = await axiosSecure.post("/create-payment-intent", {
            price: packagePrice,
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error);
        setError("Error fetching payment intent: " + error.message);
      }
    };

    fetchPaymentIntent();
  }, [axiosSecure, packagePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    try {
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("Payment error:", error);
        setError(error.message);
        return;
      }

      setError(""); // Clear any previous errors

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: packagePrice,
          packageName: packageName,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "pending",
          badge: badge,
        };

        const res = await axiosSecure.post("/payments", payment);

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your purchase!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/paymentHistory");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-yellow-500 to-black p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Package: {packageName}</h2>
      <h3 className="text-xl mb-4 text-white">Price: ${packagePrice}</h3>
      <div className="bg-white p-4 rounded-md shadow-inner">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-yellow-700 transition-colors w-full"
        type="submit"
      >
        Pay ${packagePrice}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-2">
          Your transaction id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
