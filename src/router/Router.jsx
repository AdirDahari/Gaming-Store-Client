import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ROUTES from "./ROUTES.JS";
import AboutPage from "../pages/about/AboutPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ShopPage from "../pages/shop/ShopPage";
import Error404Page from "../pages/error/Error404Page";
import CreatePostPage from "../pages/createPost/CreatePostPage";
import AuthGuard from "../guard/AuthGuard";
import AdminGuard from "../guard/AdminGuard";
import EditPostPage from "../pages/editPost/editPostPage";
import FavouritesPage from "../pages/favourites/FavouritesPage";
import PostPage from "../pages/post/PostPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ManagementPage from "../pages/management/ManagementPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.SHOP} element={<ShopPage />} />
      <Route path={`${ROUTES.POST}/:id`} element={<PostPage />} />

      <Route
        path={ROUTES.CREATEPOST}
        element={
          <AuthGuard>
            <CreatePostPage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITPOST}/:id`}
        element={
          <AuthGuard>
            <EditPostPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.FAVOURITES}
        element={
          <AuthGuard>
            <FavouritesPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MANAGMENT}
        element={
          <AdminGuard>
            <ManagementPage />
          </AdminGuard>
        }
      />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
