// src/components/Header.jsx
import { Link } from 'react-router-dom';

export default function Header({ isAuthenticated }) {
  return (
    <header className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Finance Collab
          </Link>
          <nav>
            {isAuthenticated ? (
              <Link
                to="/logout"
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                Logout
              </Link>
            ) : (
              <div className="flex space-x-6">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
