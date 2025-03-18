import { useState } from "react";

const PostComponent = ({
  _id,
  name,
  price,
  image,
  color,
  onBuyNowClick,
  onEditClick,
  onDeleteClick,
  onLikeClick,
  isUser,
  isLoggedIn,
  isLike,
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleBuyNowClick = () => {
    onBuyNowClick(_id);
  };

  const handleEditClick = () => {
    onEditClick(_id);
  };

  const handleToggleDeleteConfirm = () => {
    setDeleteConfirmOpen(!deleteConfirmOpen);
  };

  const handleDeleteClick = () => {
    onDeleteClick(_id);
    setDeleteConfirmOpen(false);
  };

  const handleLikeClick = () => {
    onLikeClick(_id);
  };

  const buttonHoverStyle = {
    backgroundColor: color || "#4F46E5",
  };

  return (
    <div className="relative group h-[400px] max-w-[350px] mx-auto rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>

      {isLoggedIn && (
        <div className="absolute top-4 right-4 flex space-x-2 z-20">
          {isUser && (
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-100"
                title="Edit post"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <div className="relative">
                <button
                  onClick={handleToggleDeleteConfirm}
                  className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-100"
                  title="Delete post"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                {deleteConfirmOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30 animate-fade-in">
                    <div className="py-2 px-3">
                      <p className="text-sm text-gray-700 mb-2">
                        Delete this post?
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleToggleDeleteConfirm}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleLikeClick}
            className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-100"
            title={isLike ? "Unlike" : "Like"}
          >
            {isLike ? (
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-md">
          <h3 className="text-gray-800 font-bold text-lg truncate mb-2">
            {name}
          </h3>

          <div className="flex justify-between items-center">
            <button
              onClick={handleBuyNowClick}
              className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-opacity-90 text-white rounded transition-colors duration-300"
              style={{ "--hover-bg-color": color }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  buttonHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#282C35")
              }
            >
              MORE DETAILS
            </button>

            <span className="text-gray-800 font-bold">₪{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
