import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameForm from "./ui/GameForm.jsx";
import Review from "./ui/Review.jsx";
import ROUTE from "../../router/ROUTES.js";
import MyToast from "../../messages/MyToast";
import { nanoid } from "nanoid";
import { editPostNormalization } from "./editPostNoramalization.js";
import server from "../../server/server";

const steps = ["Game details", "Update your post"];

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
      return <GameForm handleNext={funcNext} postData={gameDetails} />;
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

let initData = {};

const EditPostPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id: _id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await server.posts.getPostById(_id);
        initData = data;
        setUserDetails(data.seller);
        setGameDetails(data);
      } catch (err) {
        MyToast.error("Something wrong, Please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleNext = (gameDetailsValues) => {
    setGameDetails(gameDetailsValues);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setGameDetails(initData);
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const request = editPostNormalization(gameDetails);
      await server.posts.putPost(_id, request);
      MyToast.info("Post Updated!");
      navigate(ROUTE.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Edit Post
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
              {gameDetails && (
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
      )}
    </div>
  );
};

export default EditPostPage;
