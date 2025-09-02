import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-5">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} AgriSure. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link to="#" className="hover:text-green-400">
            Facebook
          </Link>
          <Link to="#" className="hover:text-green-400">
            Twitter
          </Link>
          <Link to="#" className="hover:text-green-400">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;