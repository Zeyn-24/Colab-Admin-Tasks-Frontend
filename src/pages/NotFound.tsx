import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const NotFound = () => {
    useSEO('404')

    return (
        <div className="flex flex-col items-center justify-center h-screen text-secondary-light">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
            <p className="text-secondary mt-2 text-center px-4">
                We are sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-primary font-semibold rounded-xl hover:bg-primary-light transition duration-300"
            >
                Back to top
            </Link>
        </div>
    );
};

export default NotFound