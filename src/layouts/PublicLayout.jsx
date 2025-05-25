// src/layouts/PublicLayout.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer isAuthenticated={false} />
    </div>
  );
}