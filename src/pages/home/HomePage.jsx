import { nanoid } from "nanoid";
import CategoryComponent from "./ui/CategoryComponent";
import { platforms } from "../../layout/myLists";
import SwiperHomeImages from "./ui/SwiperHomeImages";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-blue-900 opacity-5 z-0 clip-diagonal"></div>
        <div className="absolute w-48 h-48 -left-12 -top-12 bg-blue-500 rounded-full mix-blend-multiply opacity-10"></div>
        <div className="absolute w-64 h-64 -right-12 top-32 bg-purple-500 rounded-full mix-blend-multiply opacity-10"></div>

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-24 max-w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
              Welcome to <span className="text-blue-600">Gaming Store</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Find second-hand games & trade your old ones!
            </p>
          </div>

          <div className="max-w-7xl mx-auto shadow-xl rounded-xl overflow-hidden">
            <SwiperHomeImages />
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Choose Your Platform
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-lg mx-auto">
              Browse our extensive collection of games categorized by your
              favorite gaming platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {platforms.map((platform) => (
              <div
                key={nanoid()}
                className="transform transition hover:-translate-y-2 duration-300"
              >
                <div className="p-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="platform-image-container">
                    <CategoryComponent>{platform}</CategoryComponent>
                  </div>
                  <div className="text-center py-3 font-medium text-gray-800">
                    {platform.name || platform.alt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-white w-full">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-300">
                Get great deals on pre-owned games at prices that won't break
                your budget.
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade & Sell</h3>
              <p className="text-gray-300">
                Trade in your old games or sell them directly to other gamers in
                our marketplace.
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-300">
                All pre-owned games are tested and guaranteed to work perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
