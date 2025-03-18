import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/ROUTES";

const Error404Page = () => {
  const navigate = useNavigate();

  const handleBackHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
              Oops! The page you're looking for doesn't exist.
            </h2>
            <p className="text-gray-500 mb-8">
              It seems like you've ventured into uncharted territory. Let's get
              you back on track.
            </p>
            <button
              onClick={handleBackHomeClick}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </button>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt="404 Error Illustration"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-70 z-[-1]"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-100 rounded-full opacity-70 z-[-1]"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
          </svg>
          <p className="mt-2">Page not found</p>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
