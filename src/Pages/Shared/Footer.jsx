import { FaReddit, FaFacebook, FaGithub } from 'react-icons/fa';
import icon from '../../assets/image/iconHub.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white mt-14 w-full">
      <div className="p-6">
        <div className="lg:flex">
          <div className="w-full lg:w-2/5 -mx-6">
            <div className="px-6">
              <div className='flex gap-1'>
                <Link to="/">
                  <img className="h-20 w-24" src={icon} alt="Logo" />
                </Link>
                <h3 className='text-center mt-5 md:text-2xl font-bold'>CampusHub</h3>
              </div>
              <p className="max-w-sm mt-2 text-black">
                Join 31,000+ others and never miss out on new tips, tutorials, and more.
              </p>
              <div className="flex mt-6 -mx-2">
                <a
                  href="https://www.reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-black transition-colors duration-300 hover:text-blue-500"
                  aria-label="Reddit"
                >
                  <FaReddit className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-black transition-colors duration-300 hover:text-blue-500"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-black transition-colors duration-300 hover:text-blue-500"
                  aria-label="Github"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-black uppercase">About</h3>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Company
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Community
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Careers
                </a>
              </div>
              <div>
                <h3 className="text-black uppercase">Blog</h3>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Tech
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Music
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Videos
                </a>
              </div>
              <div>
                <h3 className="text-black uppercase">Products</h3>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Mega cloud
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Aperion UI
                </a>
                <a href="#" className="block mt-2 text-sm text-black hover:underline">
                  Meraki UI
                </a>
              </div>
              <div>
                <h3 className="text-black uppercase">Contact</h3>
                <span className="block mt-2 text-sm text-black hover:underline">
                  +1 526 654 8965
                </span>
                <span className="block mt-2 text-sm text-black hover:underline">
                  example@email.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-none" />
        <div>
          <p className="text-center text-black">© Brand 2020 - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
