import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GameForm from "./ui/GameForm.jsx";
import Review from "./ui/Review.jsx";
import ROUTE from "../../router/ROUTES.js";
import MyToast from "../../messages/MyToast";
import { nanoid } from "nanoid";
import { createPostNormalization } from "./createPostNoramalization.js";
import server from "../../server/server";

const steps = ["Game details", "Review your post"];

const getStepContent = (
  step,
  funcNext,
  funcBack,
  funcSubmit,
  userDetails,
  gameDetails
) => {
  switch (step) {
    case 0:
      return <GameForm handleNext={funcNext} />;
    case 1:
      return (
        <Review
          handleBack={funcBack}
          userDetails={userDetails}
          gameDetails={gameDetails}
          handleSubmit={funcSubmit}
        />
      );
    default:
      throw new Error("Unknown step");
  }
};

const CreatePostPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const navigate = useNavigate();

  const handleNext = async (gameDetailsValues) => {
    try {
      const myUser = await server.users.getUserById(userData._id);
      setUserDetails(myUser);
      setGameDetails(gameDetailsValues);
      setActiveStep(activeStep + 1);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const request = createPostNormalization(gameDetails, userDetails);
      await server.posts.createPost(request);
      MyToast.info("Post Created!");
      navigate(ROUTE.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Create New Post
          </h1>

          <div className="mt-8 mb-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div
                  className={`w-full border-t-2 ${
                    activeStep === 1 ? "border-blue-500" : "border-gray-300"
                  }`}
                ></div>
              </div>

              <div className="relative flex justify-between">
                {steps.map((label, index) => (
                  <div
                    key={nanoid()}
                    className={`flex flex-col items-center ${
                      index <= activeStep ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        index <= activeStep
                          ? "bg-blue-600 text-white"
                          : "bg-white border-2 border-gray-300"
                      } text-lg font-semibold`}
                    >
                      {index + 1}
                    </span>
                    <span className="mt-2 text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {activeStep === steps.length ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                {getStepContent(
                  activeStep,
                  handleNext,
                  handleBack,
                  handleSubmit,
                  userDetails,
                  gameDetails
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
