import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function DashboardHeader() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b border-base fixed top-0 left-0 w-full z-50">
      <nav className="mx-auto flex items-center justify-between p-1.5 lg:px-6" aria-label="Global">
        <button id="toggle-sidebar" className="flex flex-col items-center justify-center w-8 h-8 focus:outline-none">
          <svg className="w-4 h-4 text-base" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <div className="flex lg:flex-1">
          <h2 className="ml-2 text-center text-2xl text-black">Finance Collab - Dashboard</h2>
        </div>

        <div className="flex flex-1 justify-end">
          <div className="relative">
            <button className="flex items-center text-xs leading-6 text-gray-900 focus:outline-none" id="user-menu-button" aria-expanded={menuOpen} aria-haspopup="true" onClick={toggleMenu}>
              <span className="mr-1.5">User Name</span>
              <svg className="-mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`absolute right-0 z-50 mt-1.5 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${menuOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" id="user-menu">
              <div className="py-1" role="none">
                <button className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200" onClick={() => { /* Navigate to edit profile */ }}>Edit Profile</button>
                <button className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-red-500 hover:text-white transition duration-200" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}