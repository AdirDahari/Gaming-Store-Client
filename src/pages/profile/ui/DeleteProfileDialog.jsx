import { Fragment } from "react";

const DeleteProfileDialog = ({ open, handleClose, handleDeleteProfile }) => {
  if (!open) return null;

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-red-50 p-4 border-b border-red-100">
            <h2 className="text-xl font-bold text-red-600 text-center">
              Delete Account
            </h2>
          </div>

          <div className="p-6">
            <p className="text-gray-700">
              Are you sure you want to delete your account? If you delete your
              account, you will permanently lose your profile, posts, and
              favorites.
            </p>

            <div className="my-6 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteProfile}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteProfileDialog;
