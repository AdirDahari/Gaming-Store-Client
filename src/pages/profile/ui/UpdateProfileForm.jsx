import { useState } from "react";
import DeleteProfileDialog from "./DeleteProfileDialog";
import UpdateProfileInputs from "./UpdateProfileInputs";

const UpdateProfileForm = ({
  inputsValue,
  errorsState,
  handleInputsChange,
  handleUpdateProfile,
  handleDeleteProfile,
  profileImage,
  email,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-8 order-last md:order-first">
        <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <p className="text-purple-100 mt-1">
              Complete your profile information
            </p>
          </div>

          <div className="p-6">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile(e);
              }}
            >
              <UpdateProfileInputs
                errorsState={errorsState}
                handleInputsChange={handleInputsChange}
                inputsValue={inputsValue}
              />

              <div className="border-t border-gray-200 pt-6 flex justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-md"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>

        <DeleteProfileDialog
          open={open}
          handleClose={handleClose}
          handleDeleteProfile={handleDeleteProfile}
        />
      </div>

      <div className="md:col-span-4 flex flex-col items-center justify-start">
        <div className="w-full max-w-xs flex flex-col items-center">
          <div className="mb-6">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={profileImage || "https://via.placeholder.com/250"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/250?text=No+Image";
                }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800 break-all">
              {email}
            </h3>
            <p className="text-gray-500 mt-1 text-sm">Account Email</p>
          </div>

          <button
            onClick={handleClickOpen}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors w-full"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
