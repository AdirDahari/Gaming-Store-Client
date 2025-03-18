import { useState } from "react";

const OptionsButtonUsers = ({ onDeleteClick, onIsAdminClick, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminChecked, setAdminChecked] = useState(isAdmin);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleIsAdminClick = () => {
    setAdminChecked(!adminChecked);
    onIsAdminClick();
  };

  const handleDeleteClick = () => {
    onDeleteClick();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-white hover:bg-gray-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-20"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-2 px-4" role="none">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Is Admin</span>
                <button
                  type="button"
                  onClick={handleIsAdminClick}
                  className={`${
                    adminChecked ? "bg-purple-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  role="switch"
                  aria-checked={adminChecked}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      adminChecked ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="py-1" role="none">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete User
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OptionsButtonUsers;
