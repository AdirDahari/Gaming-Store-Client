import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SortComponent from "./ui/SortComponent";
import ROUTES from "../../router/ROUTES";
import { useSelector } from "react-redux";
import MyToast from "../../messages/MyToast";
import PostComponent from "../../components/PostComponent";
import { nanoid } from "nanoid";
import { categories } from "../../layout/myLists";
import server from "../../server/server";

let initData = [];

const ShopPage = () => {
  const [dataFromServer, setDataFromServer] = useState(null);
  const [filterDataToShow, setFilterDataToShow] = useState(null);
  const [filterInputs, setFilterInputs] = useState(null);
  const [searchTxt, setSearchTxt] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [userId, setUserId] = useState(null);
  const loggedIn = useSelector((bigPie) => bigPie.auth.loggedIn);
  const userData = useSelector((bigPie) => bigPie.auth.userData);
  const [numberOfPages, setNumberOfPage] = useState(null);
  const [page, setPage] = useState(null);
  const [minPost, setMinPost] = useState(0);
  const [maxPost, setMaxPost] = useState(6);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const postData = await server.posts.getPostPlatform(
          state.name.toLowerCase()
        );

        if (loggedIn === true) {
          setUserId(userData._id);
        }
        initData = postData;

        setDataFromServer(postData);
        findMaxPrice(postData);
        dataToShow(postData, 0, 6);
      } catch (err) {
        MyToast.error("Something wrong, Please try again later");
      }
    })();
  }, []);

  useEffect(() => {
    if (!initData.length) return;
    if (filterInputs || searchTxt.length > 1) {
      filterPostToShow();
    } else {
      setFilterDataToShow(null);
      dataToShow(initData, 0, 6);
      return;
    }
  }, [filterInputs, searchTxt]);

  const filterPostToShow = (min = 0, max = 6, page = 1) => {
    let tempData = initData;
    if (filterInputs) {
      if (filterInputs.categories && filterInputs.categories !== "all") {
        tempData = tempData.filter((post) =>
          post.game.category.includes(filterInputs.categories)
        );
      }
      if (filterInputs.priceRange.length) {
        tempData = tempData.filter(
          (post) =>
            post.game.price >= filterInputs.priceRange[0] &&
            post.game.price <= filterInputs.priceRange[1]
        );
      }
      if (filterInputs.productStatus && filterInputs.productStatus !== "all") {
        tempData = tempData.filter(
          (post) => post.game.productStatus === filterInputs.productStatus
        );
      }
    }
    if (searchTxt) {
      if (searchTxt.length > 1) {
        tempData = tempData.filter((post) =>
          post.game.name.toLowerCase().startsWith(searchTxt.toLowerCase())
        );
      }
    }
    setFilterDataToShow(tempData);
    dataToShow(tempData, min, max, page);
  };

  const findMaxPrice = (data) => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].game.price > max) {
        max = data[i].game.price;
      }
    }
    setMaxPrice(max + 50);
  };

  const filterData = (inputs) => {
    setFilterInputs(inputs);
  };

  const handleSearchTxt = (txt) => {
    setSearchTxt(txt);
  };

  const handleBuyNowClick = (_id) => {
    navigate(`${ROUTES.POST}/${_id}`);
  };

  const handleEditPostClick = (_id) => {
    navigate(`${ROUTES.EDITPOST}/${_id}`);
  };

  const handleDeletePostClick = async (_id) => {
    try {
      await server.posts.deletePost(_id);
      const data = await server.posts.getPostPlatform(state.name.toLowerCase());
      initData = data;
      if (filterInputs || searchTxt) {
        filterPostToShow(minPost, maxPost, page);
        return;
      }
      dataToShow(data, minPost, maxPost, page);
      MyToast.info("Post Deleted!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleLikePost = async (_id) => {
    try {
      await server.posts.patchLikePost(_id);
      const data = await server.posts.getPostPlatform(state.name.toLowerCase());

      initData = data;
      if (filterInputs || searchTxt) {
        filterPostToShow(minPost, maxPost, page);
        return;
      }
      dataToShow(data, minPost, maxPost, page);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const dataToShow = (data, fromNum = 0, toNum = 6, page = 1) => {
    setMaxPost(toNum);
    setMinPost(fromNum);
    if (data.length > 6) {
      setNumberOfPage(Math.ceil(data.length / 6));
      setPage(page);
      let tempData = data.slice(fromNum, toNum);
      setDataFromServer(tempData);
    } else {
      setDataFromServer(data);
      setNumberOfPage(null);
      setPage(null);
    }
  };

  const handlePageChange = (value) => {
    let min = value * 6 - 6;
    let max = value * 6;
    if (max > initData.length) max = initData.length;
    if (filterInputs || searchTxt) {
      dataToShow(filterDataToShow, min, max, value);
    } else {
      dataToShow(initData, min, max, value);
    }

    setPage(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="min-h-[650px] bg-gray-50 rounded-lg shadow-lg p-4 sm:p-8 mb-8">
        <div className="w-full md:w-4/5 mx-auto rounded-lg">
          <SortComponent
            platform={state.name}
            onInputsChange={filterData}
            onSearchChange={handleSearchTxt}
            priceRange={maxPrice ? [0, maxPrice] : [0, 10]}
            categoriesData={["all", ...categories]}
            color={state.color}
          />
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {dataFromServer && dataFromServer.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {dataFromServer.map((post) => (
              <div key={nanoid()} className="p-2">
                <PostComponent
                  color={state.color}
                  _id={post._id}
                  name={post.game.name}
                  price={post.game.price}
                  image={post.game.images[0].url}
                  alt={post.game.images[0].alt}
                  onBuyNowClick={handleBuyNowClick}
                  onEditClick={handleEditPostClick}
                  onDeleteClick={handleDeletePostClick}
                  onLikeClick={handleLikePost}
                  isLoggedIn={loggedIn}
                  isUser={userId ? post.seller.userId === userId : false}
                  isLike={userId ? post.likes.includes(userId) : false}
                />
              </div>
            ))}
          </div>
        ) : (
          <Fragment>
            <h2 className="text-xl p-4 pl-4 sm:pl-8 md:pl-12">
              No posts found
            </h2>
          </Fragment>
        )}

        {numberOfPages && page && (
          <div className="flex justify-center p-4">
            <div className="flex space-x-2">
              {[...Array(numberOfPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  } flex items-center justify-center transition-colors duration-300`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
