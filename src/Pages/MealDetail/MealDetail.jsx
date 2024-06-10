import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const MealDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchMeal = async () => {
      try {
        console.log(`Fetching meal with id: ${id}`);
        const response = await fetch(`http://localhost:5000/meals/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meal");
        }
        const data = await response.json();
        console.log("Fetched meal data:", data);
        setMeal(data);
        setLikeCount(data.likes || 0);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching meal data:", error);
        setError("Failed to fetch meal data");
      }
    };
  
    if (id) {
      fetchMeal();
    }
  }, [id]);

  const handleLike = () => {
    if (!user) {
      alert("Please login to like the meal.");
      return;
    }

    const newLikeStatus = !isLiked;
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
    setIsLiked(newLikeStatus);

    fetch(`http://localhost:5000/meals/${meal._id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, isLiked: newLikeStatus }),
    });
  };

  const handleChangeReview = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }

    if (review.trim() === "") return;

    const newReview = {
      text: review,
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
    };

    try {
      const response = await fetch(`http://localhost:5000/meals/${meal._id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
      const data = await response.json();
      setReviews([...reviews, data]);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleMealRequest = async () => {
    if (!user) {
      alert("Please login to request the meal.");
      return;
    }

    try {
      await fetch("http://localhost:5000/mealRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          mealId: meal._id,
          status: "pending",
        }),
      });
      setRequestSubmitted(true);
    } catch (error) {
      console.error("Error submitting meal request:", error);
    }
  };

 
  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!meal) {
    return <div>Meal not found.</div>; // Show a message if no meal is found
  }

  return (
    <div className="container mx-auto mt-16">
      <div className="bg-cream dark:bg-gray-600 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <figure>
                  <img
                    src={meal.image}
                    alt="Meal"
                    className="object-cover object-center w-full h-56"
                  />
                </figure>
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full bg-teal-900 dark:bg-teal-600 text-white py-2 px-4 rounded-full font-bold hover:bg-teal-800 dark:hover:bg-teal-700"
                    onClick={handleLike}
                  >
                    {isLiked ? (
                      <FaHeart className="inline-block mr-2" />
                    ) : (
                      <FaThumbsUp className="inline-block mr-2" />
                    )}
                    {isLiked ? `Liked (${likeCount})` : `Like (${likeCount})`}
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-teal-800 dark:text-white mb-2">
                {meal.title}
              </h2>
              <p>Description: {meal.description}</p>
              <p>Ingredients: {meal.ingredients}</p>
              <p>Posted Time: {new Date(meal.postTime).toLocaleString()}</p>
              <p>Rating: {meal.rating}</p>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">
                  Reviews ({Array.isArray(reviews) ? reviews.length : 0})
                </h3>
                {Array.isArray(reviews) && reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  <ul>
                    {Array.isArray(reviews) && reviews.map((review, index) => (
                      <li key={index}>{review.text} - {review.userName}</li>
                    ))}
                  </ul>
                )}
              </div>

              <form className="mt-4" onSubmit={handleSubmitReview}>
                <textarea
                  value={review}
                  onChange={handleChangeReview}
                  placeholder="Write your review..."
                  className="w-full px-3 py-2 border border-teal-300 dark:border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  disabled={!user}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600"
                  disabled={!user}
                >
                  Submit Review
                </button>
              </form>

              <div className="mt-4">
                <button
                  onClick={handleMealRequest}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600"
                  disabled={!user}
                >
                  Meal Request
                </button>
                {requestSubmitted && (
                  <p className="mt-2 text-green-600">
                    Your meal request has been submitted and is pending approval.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
