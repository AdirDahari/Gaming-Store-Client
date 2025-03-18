import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import MyToast from "../../messages/MyToast";
import PopupSellerDetails from "./ui/PopupSellerDetails";
import server from "../../server/server";

const PostPage = () => {
  const { id: _id } = useParams();
  const [dataFromServer, setDataFromServer] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await server.posts.getPostById(_id);
        setDataFromServer(data);
        setMainImage(data.game.images[0].url);
        setOpenPopup(false);
      } catch (err) {
        MyToast.error("Something went wrong, please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleImageIndexChange = (index) => {
    setImageIndex(index);
    setMainImage(dataFromServer.game.images[index].url);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!dataFromServer) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-2xl font-semibold text-gray-700">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <div className="flex flex-col-reverse sm:flex-row h-[600px]">
              <div className="flex sm:flex-col sm:w-24 h-auto gap-2 mt-4 sm:mt-0 sm:mr-4 overflow-x-auto sm:overflow-y-auto no-scrollbar">
                {dataFromServer.game.images.map((img, index) => (
                  <div
                    key={nanoid()}
                    onClick={() => handleImageIndexChange(index)}
                    className={`min-w-20 sm:min-w-0 h-20 bg-center bg-no-repeat bg-contain cursor-pointer rounded border-2 transition-all ${
                      index === imageIndex
                        ? "border-blue-600 opacity-100"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                    style={{
                      backgroundImage: `url(${img.url})`,
                    }}
                  ></div>
                ))}
              </div>

              <div
                className="flex-grow h-full bg-center bg-no-repeat bg-contain rounded-lg"
                style={{
                  backgroundImage: `url(${mainImage})`,
                }}
              ></div>
            </div>
          </div>

          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800">
                  {dataFromServer.game.name}
                </h1>
                <div className="bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600">
                    ₪{dataFromServer.game.price}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4">
                  <span className="text-gray-500 text-sm uppercase font-medium">
                    Platform
                  </span>
                  <p className="text-gray-800 font-medium">
                    {dataFromServer.platform}
                  </p>
                </div>

                <div className="mb-4">
                  <span className="text-gray-500 text-sm uppercase font-medium">
                    Categories
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dataFromServer.game.category.map(
                      (cate) =>
                        cate && (
                          <span
                            key={nanoid()}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                          >
                            {cate}
                          </span>
                        )
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-gray-500 text-sm uppercase font-medium">
                    Product Status
                  </span>
                  <p className="text-gray-800 font-medium">
                    {dataFromServer.game.productStatus}
                  </p>
                </div>
              </div>
            </div>

            {dataFromServer.game.description && (
              <div className="py-6 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {dataFromServer.game.description}
                </p>
              </div>
            )}

            <div className="mt-auto pt-4">
              <button
                onClick={handlePopupOpen}
                className="w-full md:w-auto md:ml-auto block md:float-right px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Seller
              </button>

              <PopupSellerDetails
                city={dataFromServer.seller.city}
                name={dataFromServer.seller.firstName}
                phone={dataFromServer.seller.phone}
                open={openPopup}
                onClose={handleClosePopup}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
