import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-8">
    <div className="mb-8">
      <svg width="120" height="120" viewBox="0 0 64 64" fill="none" className="mx-auto mb-4">
        <rect width="64" height="64" rx="16" fill="#2563EB"/>
        <ellipse cx="32" cy="32" rx="18" ry="18" fill="#fff"/>
        <ellipse cx="32" cy="32" rx="12" ry="12" fill="#2563EB"/>
        <ellipse cx="32" cy="32" rx="6" ry="6" fill="#fff"/>
      </svg>
      <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-base-content/70 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary px-6 py-2 text-lg font-medium rounded-lg shadow hover:shadow-lg transition-all">Go Home</Link>
    </div>
  </div>
);
export default NotFoundPage; 