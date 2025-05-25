// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-52 bg-white shadow-md p-3 flex flex-col h-full"> {/* Updated styles */}
      <div className="flex-grow">  
        <h2 className="text-base font-semibold text-gray-800 mb-4">Sidebar</h2>
        <nav>
          <ul className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
            <li>
              <Link to="/dashboard" className="flex items-center p-1.5 text-sm text-gray-800 rounded-lg transition-colors duration-200 hover:bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2 2 4-4 4 4 6-6" />
                </svg>
                Dashboard
              </Link>
            </li>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Operations</h3>
            <li>
              <Link to="/teams" className="flex items-center p-1.5 text-sm text-gray-800 rounded-lg transition-colors duration-200 hover:bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Teams
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-3">
        &copy; {new Date().getFullYear()} Finance Collab. All rights reserved.
      </p>
    </aside>
  );
}