import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import ROUTES from "../../router/ROUTES";
import {
  fromServerUserNormalization,
  toServerUserNormalization,
} from "../../service/inputsNormalization";
import UpdateProfileForm from "./ui/UpdateProfileForm";
import { authActions } from "../../store/authSlice";
import { validateUpdateProfile } from "../../validation/updateProfileValidation";
import MyToast from "../../messages/MyToast";
import PostComponent from "../../components/PostComponent";
import server from "../../server/server";

let userId = "";
let profileImage = "";
let email = "";

const ProfilePage = () => {
  const [inputsValue, setInputsValue] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userDataFromServer = await server.users.getUserById(userData._id);
        userId = userDataFromServer._id;
        profileImage = userDataFromServer.image.url;
        email = userDataFromServer.email;
        setInputsValue(fromServerUserNormalization(userDataFromServer));

        const postData = await server.posts.getMyPosts();
        setPostsData(postData);
      } catch (err) {
        MyToast.error("Something wrong, Please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEditPostClick = (_id) => {
    navigate(`${ROUTES.EDITPOST}/${_id}`);
  };

  const handleBuyNowClick = (_id) => {
    navigate(`${ROUTES.POST}/${_id}`);
  };

  const handleCreatePostClick = () => {
    navigate(ROUTES.CREATEPOST);
  };

  const handleDeletePostClick = async (_id) => {
    try {
      await server.posts.deletePost(_id);
      const data = await server.posts.getMyPosts();
      setPostsData(data);
      MyToast.info("Post Deleted!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();

      const joiResponse = validateUpdateProfile(inputsValue);
      if (joiResponse) {
        setErrorsState(joiResponse);
        return;
      }
      let request = toServerUserNormalization(inputsValue);

      if (userId) {
        await server.users.putUser(userId, request);
      }
      MyToast.info("Profile Updated!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await server.users.deleteUser(userId);
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      } else if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("token");
      } else return;
      dispatch(authActions.logout());
      MyToast.info("Profile Deleted!");
      navigate(ROUTES.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleLikePost = async (_id) => {
    try {
      await server.posts.patchLikePost(_id);
      const data = await server.posts.getMyPosts();
      setPostsData(data);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {inputsValue && (
        <UpdateProfileForm
          inputsValue={inputsValue}
          profileImage={profileImage}
          errorsState={errorsState}
          email={email}
          handleInputsChange={handleInputsChange}
          handleUpdateProfile={handleUpdateProfile}
          handleDeleteProfile={handleDeleteProfile}
        />
      )}

      <div className="my-8 border-t border-gray-200"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800 pl-4 sm:pl-10 mb-4 sm:mb-0">
          My Posts
        </h2>

        <div className="pl-4 sm:pl-0 pr-0 sm:pr-10">
          <button
            onClick={handleCreatePostClick}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors shadow-md"
          >
            Create New Post
          </button>
        </div>
      </div>

      {postsData && postsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {postsData.map((post) => (
            <div key={nanoid()} className="p-2">
              <PostComponent
                color="#A32CC4"
                _id={post._id}
                name={post.game.name}
                price={post.game.price}
                image={post.game.images[0].url}
                alt={post.game.images[0].alt}
                onBuyNowClick={handleBuyNowClick}
                onEditClick={handleEditPostClick}
                onDeleteClick={handleDeletePostClick}
                onLikeClick={handleLikePost}
                isLoggedIn={true}
                isUser={true}
                isLike={userId ? post.likes.includes(userId) : false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-purple-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Your posts collection is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first post to showcase your games!
          </p>
          <button
            onClick={handleCreatePostClick}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-md"
          >
            Create Post Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
