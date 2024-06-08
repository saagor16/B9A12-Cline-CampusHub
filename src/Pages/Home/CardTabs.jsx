/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CardTabs = ({ item }) => {
  const { _id, image, title, rating, price } = item;

  return (
    <div className="border rounded-lg p-4 shadow-md text-center">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="mb-1">Rating: {rating}</p>
      <p className="mb-2">Price: ${price}</p>
      <Link to={`/meal/${_id}`}> {/* Specify the destination URL */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Details
        </button>
      </Link>
    </div>
  );
};

export default CardTabs;
