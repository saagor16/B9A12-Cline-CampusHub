import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleLogin = async (data) => {
    const { email, password } = data;
    console.log(email, password);

    try {
      const result = await signIn(email, password);
      console.log(result.user);
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate(location?.state?.from || "/");
    } catch (error) {
      console.error("Login failed:", error.message);
      Swal.fire({
        title: 'Login Failed',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleSocialLogin = async () => {
    try {
      const result = await googleSignIn();
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
      };
      const res = await axiosPublic.post('/users', userInfo);
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
      Swal.fire({
        title: 'Google Sign-In Failed',
        text: 'There was an error signing in with Google.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="mt-20 container mx-auto">
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div className="max-md:text-center">
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
                Seamless Login for Exclusive Access
              </h2>
              <p className="text-sm mt-6">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-10">
                Dont have an account?
                <Link to='/register'
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
              <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">
                Sign in
              </h3>
              <div>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  autoComplete="email"
                  className={`bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  autoComplete="current-password"
                  className={`bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    {...register('rememberMe')}
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
              <p className="my-10 text-sm text-gray-400 text-center">
                or continue with
              </p>
              <div className="space-x-6 flex justify-center">
                <button type="button" onClick={handleSocialLogin} className="border-none outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
