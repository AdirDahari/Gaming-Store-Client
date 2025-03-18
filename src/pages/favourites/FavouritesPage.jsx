import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostComponent from "../../components/PostComponent";
import ROUTES from "../../router/ROUTES";
import MyToast from "../../messages/MyToast";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import server from "../../server/server";

let initData = [];
let userId = "";

const FavouritesPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const [txt, setTxt] = useState("");
  const navigate = useNavigate();

  const handleTxtChange = (e) => {
    setTxt(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const postData = await server.posts.getPosts();
        userId = userData._id;
        initData = postData.filter((post) => post.likes.includes(userId));
        setDataFromServer(initData);
      } catch (err) {
        MyToast.error("Something wrong, Please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!initData.length) return;
    if (txt.length > 1) {
      let tempData = initData;
      setDataFromServer(
        tempData.filter((post) =>
          post.game.name.toLowerCase().startsWith(txt.toLowerCase())
        )
      );
    } else {
      setDataFromServer(initData);
    }
  }, [txt]);

  const handleBuyNowClick = (_id) => {
    navigate(`${ROUTES.POST}/${_id}`);
  };

  const handleEditPostClick = (_id) => {
    navigate(`${ROUTES.EDITPOST}/${_id}`);
  };

  const handleDeletePostClick = async (_id) => {
    try {
      await server.posts.deletePost(_id);
      const postData = await server.posts.getPosts();
      initData = postData.filter((post) => post.likes.includes(userId));
      setDataFromServer(initData);
      MyToast.info("Post Deleted!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleLikePost = async (_id) => {
    try {
      await server.posts.patchLikePost(_id);
      const postData = await server.posts.getPosts();
      initData = postData.filter((post) => post.likes.includes(userId));
      setDataFromServer(initData);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-50 rounded-lg shadow-md min-h-[650px] p-4 sm:p-8 mb-6">
        <div className="bg-red-600 rounded-lg shadow-sm mb-8 mx-auto w-full max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4">
            <div className="hidden sm:block text-white mb-4 sm:mb-0 pl-2">
              <h1 className="text-2xl font-bold mb-1">Favourites</h1>
              <p className="text-white text-opacity-90">
                Find your saved posts
              </p>
            </div>

            <div className="w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  value={txt}
                  onChange={handleTxtChange}
                  placeholder="Search favourites..."
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <>
            {dataFromServer.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {dataFromServer.map((post) => (
                  <div key={nanoid()} className="p-2">
                    <PostComponent
                      color="#FF0000"
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
                      isUser={userId ? post.seller.userId === userId : false}
                      isLike={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-gray-600 mb-2">
                  Your favourites collection is empty
                </h2>
                <p className="text-gray-500">
                  Find games you love and add them to your favourites!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
