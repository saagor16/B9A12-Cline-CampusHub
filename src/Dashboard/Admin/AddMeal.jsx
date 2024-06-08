import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AddMeal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { user } = useContext(AuthContext);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    if (user) {
      setAdminName(user.displayName || "");
      setAdminEmail(user.email || "");
      setValue("adminName", user.displayName || "");
      setValue("adminEmail", user.email || "");
    }
  }, [setValue, user]);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Meal added successfully");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Meal added successfully.",
        });
      } else {
        throw new Error("Failed to add meal");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while adding the meal.",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6 mt-10">
      <div className="card w-full max-w-4xl shadow-xl bg-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-600">
          Add a New Meal
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.category && (
              <span className="text-red-600">Category is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              {...register("image", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.image && (
              <span className="text-red-600">Image URL is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <textarea
              {...register("ingredients", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.ingredients && (
              <span className="text-red-600">Ingredients are required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.description && (
              <span className="text-red-600">Description is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                $
              </span>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                className="input input-bordered w-full pl-8 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>
            {errors.price && (
              <span className="text-red-600">Price is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              {...register("rating", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.rating && (
              <span className="text-red-600">Rating is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Time
            </label>
            <input
              type="datetime-local"
              {...register("postTime", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.postTime && (
              <span className="text-red-600">Post time is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Likes
            </label>
            <input
              type="number"
              {...register("likes", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.likes && (
              <span className="text-red-600">Likes are required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reviews
            </label>
            <textarea
              {...register("reviews", { required: true })}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.reviews && (
              <span className="text-red-600">Reviews are required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admin Name
            </label>
            <input
              type="text"
              {...register("adminName", { required: true })}
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.adminName && (
              <span className="text-red-600">Admin name is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              type="email"
              {...register("adminEmail", { required: true })}
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="input input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.adminEmail && (
              <span className="text-red-600">Admin email is required</span>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full bg-cyan-600 text-white hover:bg-cyan-700 rounded-md py-2 col-span-full"
          >
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
