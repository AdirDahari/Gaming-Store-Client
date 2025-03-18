import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import ROUTES from "../../router/ROUTES";
import RowUserComponent from "./ui/RowUserComponent";
import RowPostsComponent from "./ui/RowPostsComponent";
import MyToast from "../../messages/MyToast";
import server from "../../server/server";

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [usersFromServer, setUsersFromServer] = useState(null);
  const [postsFromServer, setPostsFromServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const usersData = await server.users.getUsers();
        setUsersFromServer(usersData);
        const postsData = await server.posts.getPosts();
        setPostsFromServer(postsData);
      } catch (err) {
        MyToast.error("Something wrong, Please try again later");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteUser = async (_id) => {
    try {
      await server.users.deleteUser(_id);
      setUsersFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((user) => user._id !== _id)
      );
      MyToast.info("User Deleted!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleIsAdmin = async (_id) => {
    try {
      const data = await server.users.pacthIsAdmin(_id);
      let copyData = [...usersFromServer];
      const updatedUsers = copyData.map((user) =>
        user._id === _id ? { ...user, isAdmin: data.isAdmin } : user
      );
      setUsersFromServer(updatedUsers);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleDeletePostClick = async (_id) => {
    try {
      await server.posts.deletePost(_id);
      setPostsFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((post) => post._id !== _id)
      );
      MyToast.info("Post Deleted!");
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleEditPostClick = (_id) => {
    navigate(`${ROUTES.EDITPOST}/${_id}`);
  };

  const handleShowPostClick = (_id) => {
    navigate(`${ROUTES.POST}/${_id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Gaming Store Users and Posts
      </h1>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => handleTabChange("users")}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } transition-colors`}
          >
            Users
          </button>
          <button
            onClick={() => handleTabChange("posts")}
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === "posts"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } transition-colors`}
          >
            Posts
          </button>
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[600px]">
          <table className="min-w-full divide-y divide-gray-200">
            {activeTab === "users" ? (
              <Fragment>
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Options
                    </th>
                  </tr>
                </thead>

                {usersFromServer && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {usersFromServer.map((user) => (
                      <RowUserComponent
                        key={nanoid()}
                        _id={user._id}
                        name={`${user.name.first} ${user.name.last}`}
                        email={user.email}
                        country={user.address.country}
                        phone={user.phone}
                        isAdmin={user.isAdmin}
                        onDeleteUser={handleDeleteUser}
                        onIsAdmin={handleIsAdmin}
                      />
                    ))}
                  </tbody>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Game
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Platform
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Options
                    </th>
                  </tr>
                </thead>

                {postsFromServer && (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {postsFromServer.map((post) => (
                      <RowPostsComponent
                        _id={post._id}
                        name={post.game.name}
                        platform={post.platform}
                        price={post.game.price}
                        userId={post.seller.userId}
                        key={post._id}
                        onShowPostClick={handleShowPostClick}
                        onDeleteCard={handleDeletePostClick}
                        onEditPost={handleEditPostClick}
                      />
                    ))}
                  </tbody>
                )}
              </Fragment>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
