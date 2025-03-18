import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { ProfileIconLink } from "../../myLinks";
import { nanoid } from "nanoid";

const ProfileMenuItems = ({ loggedIn, onLogout, onCloseUserMenu }) => {
  const renderIcon = (icon) => {
    if (!icon) return null;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={icon.path}
        />
      </svg>
    );
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleCloseUserMenu = () => {
    onCloseUserMenu();
  };

  return (
    <Fragment>
      {loggedIn &&
        ProfileIconLink.map((myLink) => (
          <NavLink
            className="no-underline block"
            key={nanoid()}
            to={myLink.to}
            onClick={
              myLink.children === "Logout" ? handleLogout : handleCloseUserMenu
            }
          >
            <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap">
              {myLink.icon && renderIcon(myLink.icon)}
              <span className="ml-2">{myLink.children}</span>
            </div>
          </NavLink>
        ))}
    </Fragment>
  );
};

export default ProfileMenuItems;
