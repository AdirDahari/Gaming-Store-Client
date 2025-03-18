import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MainAdminLink, MainLink } from "../myLinks";
import ROUTES from "../../router/ROUTES";
import { authActions } from "../../store/authSlice";
import MobileMenuItems from "./ui/MobileMenuItems";
import IconMenuItems from "./ui/IconMenuItems";
import ProfileMenuItems from "./ui/ProfileMenuItems";
import MyToast from "../../messages/MyToast";
import { nanoid } from "nanoid";
import { clearToken } from "../../service/storeService";
import server from "../../server/server";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuPosition, setUserMenuPosition] = useState({
    top: 0,
    right: 0,
  });
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [userDataFromServer, setUserDataFromServer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (!loggedIn) return;
        const data = await server.users.getUserById(userData._id);
        setUserDataFromServer(data);
      } catch (err) {
        handleLogout();
        MyToast.error("Something wrong, Please try again later");
        console.log("Something wrong, Please try again later", err);
      }
    })();
  }, [loggedIn]);

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleOpenUserMenu = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setUserMenuPosition({
      top: rect.bottom + window.scrollY,
      right: window.innerWidth - rect.right - window.scrollX,
    });
    setUserMenuOpen(!userMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    clearToken();
    dispatch(authActions.logout());
    setUserDataFromServer(null);
    MyToast.info("You have logged out, see you soon");
    navigate(ROUTES.HOME);
  };

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="hidden md:flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
            <span
              onClick={handleHomeClick}
              className="font-mono text-xl tracking-widest font-bold cursor-pointer"
            >
              Gaming Store
            </span>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={handleOpenMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex md:hidden items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
            <NavLink
              to={ROUTES.HOME}
              className="font-mono text-lg tracking-wider font-bold"
            >
              Gaming Store
            </NavLink>
          </div>

          <div className="hidden md:flex flex-grow justify-center mx-4">
            {userDataFromServer && userDataFromServer.isAdmin ? (
              <Fragment>
                {MainAdminLink.map((myLink) => (
                  <NavLink
                    className="no-underline"
                    key={nanoid()}
                    to={myLink.to}
                  >
                    <div className="px-4 py-2 text-white hover:bg-gray-700 rounded transition-colors">
                      {myLink.children}
                    </div>
                  </NavLink>
                ))}
              </Fragment>
            ) : (
              <Fragment>
                {MainLink.map((myLink) => (
                  <NavLink
                    className="no-underline"
                    key={nanoid()}
                    to={myLink.to}
                  >
                    <div className="px-4 py-2 text-white hover:bg-gray-700 rounded transition-colors">
                      {myLink.children}
                    </div>
                  </NavLink>
                ))}
              </Fragment>
            )}
          </div>

          <div className="flex items-center">
            <IconMenuItems loggedIn={loggedIn} />

            {loggedIn && userDataFromServer && (
              <div className="relative ml-4">
                <button
                  onClick={handleOpenUserMenu}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={userDataFromServer.image.url}
                    alt="Profile"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <MobileMenuItems
            isAdmin={userDataFromServer ? userDataFromServer.isAdmin : false}
            loggedIn={loggedIn}
            onCloseNavMenu={handleCloseMobileMenu}
          />
        </div>
      )}

      {userMenuOpen && (
        <div
          className="absolute z-50 bg-white shadow-lg rounded-lg py-1"
          style={{
            top: `${userMenuPosition.top}px`,
            right: `${userMenuPosition.right}px`,
          }}
        >
          <ProfileMenuItems
            loggedIn={loggedIn}
            onCloseUserMenu={handleCloseUserMenu}
            onLogout={handleLogout}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
