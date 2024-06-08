import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash, FaImage, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider"; // Ensure the correct path
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { googleSignIn } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleRegister = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser);
      await updateUserProfile(data.name, data.imageUrl);

      // Create user entry in the database
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.imageUrl,
      };

      const res = await axiosPublic.post('/users', userInfo);
      if (res.data.insertedId) {
        console.log('User added to the database');
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User created successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Registration Failed',
        text: 'There was an error creating your account.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSocialLogin = async () => {
    try {
      const result = await googleSignIn();
      console.log(result.user);

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };

      const res = await axiosPublic.post('/users', userInfo);
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Google Sign-In Failed',
        text: 'There was an error signing in with Google.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="font-[sans-serif] text-gray-800 bg-white max-w-4xl mx-auto md:h-screen p-4 flex items-center">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-white mt-2">
              Welcome to our registration page! Get started by creating your account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-white mt-2">
              Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>
        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Create an account</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                  {...register("name", { required: "Name is required." })}
                />
                <FaUser className="w-4 h-4 absolute right-4 text-gray-500" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required." })}
                />
                <FaEnvelope className="w-4 h-4 absolute right-4 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Image URL</label>
              <div className="relative flex items-center">
                <input
                  name="imageUrl"
                  type="url"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter image URL"
                  {...register("imageUrl", { required: "Image URL is required." })}
                />
                <FaImage className="w-4 h-4 absolute right-4 text-gray-500" />
              </div>
              {errors.imageUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  {...register("password", { required: "Password is required." })}
                />
                {passwordVisible ? (
                  <FaEyeSlash
                    className="w-4 h-4 absolute right-4 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="w-4 h-4 absolute right-4 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("termsAccepted", { required: "You must accept the terms and conditions." })}
              />
              <label htmlFor="termsAccepted" className="ml-3 block text-sm">
                I accept the
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs mt-1">{errors.termsAccepted.message}</p>
            )}
          </div>
          <div className="!mt-10">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <div className="!mt-4">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none flex items-center justify-center"
              onClick={handleSocialLogin}
            >
              <FaGoogle className="w-4 h-4 mr-2" />
              Sign in with Google
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to='/login'
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
