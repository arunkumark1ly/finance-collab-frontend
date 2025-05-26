// src/components/Breadcrumbs.jsx
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="mb-4">
      <ol className="list-reset flex text-grey-dark">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>} {/* Separator */}
            {item.path ? (
              <Link to={item.path} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span> // Current item
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}