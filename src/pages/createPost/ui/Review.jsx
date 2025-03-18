import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const Review = ({ handleBack, handleSubmit, userDetails, gameDetails }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (urls.length > 0) {
      return;
    }
    checkDoubles(gameDetails);
    if (gameDetails.url0) {
      setUrls((currentState) => {
        currentState = [gameDetails.url0, gameDetails.url1, gameDetails.url2];
        return currentState;
      });
    }
  }, []);

  const checkDoubles = (gameDetails) => {
    if (gameDetails.cate0 === gameDetails.cate1) {
      gameDetails.cate1 = "";
    }
    if (gameDetails.cate0 === gameDetails.cate2) {
      gameDetails.cate2 = "";
    }
    if (gameDetails.cate1 === gameDetails.cate2) {
      gameDetails.cate1 = "";
    }
  };

  const handleSubmitClick = () => {
    handleSubmit();
  };

  const handleBackClick = () => {
    handleBack();
  };

  const renderDetailItem = (label, value) => (
    <div className="text-sm sm:text-base">
      <span className="font-semibold text-gray-800">{label}: </span>
      <span className="text-gray-700 truncate">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b border-blue-200 pb-2">
          User Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderDetailItem("User name", userDetails.name.first)}
          {renderDetailItem("City", userDetails.address.city)}
          {renderDetailItem("Phone", userDetails.phone)}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center border-b border-gray-200 pb-2">
          Game Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {renderDetailItem("Game", gameDetails.name)}
          {renderDetailItem("Platform", gameDetails.platform)}
          {renderDetailItem("Price", `₪${gameDetails.price}`)}
          {renderDetailItem("Status", gameDetails.productStatus)}
          <div className="col-span-1 sm:col-span-3 text-sm sm:text-base">
            <span className="font-semibold text-gray-800">Categories: </span>
            <span className="text-gray-700">
              {[gameDetails.cate0, gameDetails.cate1, gameDetails.cate2]
                .filter((cat) => cat)
                .join(", ")}
            </span>
          </div>
        </div>

        {urls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Game Images
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {urls.map((url) =>
                url ? (
                  <div
                    key={nanoid()}
                    className="rounded-lg overflow-hidden shadow"
                  >
                    <img
                      src={url}
                      alt={`${gameDetails.name} image`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {gameDetails.description && (
          <div className="mt-6">
            <div className="text-sm sm:text-base">
              <span className="font-semibold text-gray-800">Description: </span>
              <span className="text-gray-700">{gameDetails.description}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={handleBackClick}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmitClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Review;
