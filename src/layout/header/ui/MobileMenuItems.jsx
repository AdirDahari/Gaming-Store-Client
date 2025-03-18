import { Fragment } from "react";
import {
  GuestMobileLink,
  ProfileMobileLink,
  ProfileMobileAdminLink,
} from "../../myLinks";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";

const MobileMenuItems = ({ loggedIn, isAdmin, onCloseNavMenu }) => {
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

  const handleCloseNavMenu = () => {
    onCloseNavMenu();
  };

  return (
    <div className="py-2">
      {isAdmin ? (
        <div>
          {ProfileMobileAdminLink.map((myLink) => (
            <NavLink
              className="no-underline"
              key={nanoid()}
              to={myLink.to}
              onClick={handleCloseNavMenu}
            >
              <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                {myLink.icon && renderIcon(myLink.icon)}
                <span className="ml-2">{myLink.children}</span>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <Fragment>
          {loggedIn
            ? ProfileMobileLink.map((myLink) => (
                <NavLink
                  className="no-underline"
                  key={nanoid()}
                  to={myLink.to}
                  onClick={handleCloseNavMenu}
                >
                  <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {myLink.icon && renderIcon(myLink.icon)}
                    <span className="ml-2">{myLink.children}</span>
                  </div>
                </NavLink>
              ))
            : GuestMobileLink.map((myLink) => (
                <NavLink
                  className="no-underline"
                  key={nanoid()}
                  to={myLink.to}
                  onClick={handleCloseNavMenu}
                >
                  <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                    {myLink.icon && renderIcon(myLink.icon)}
                    <span className="ml-2">{myLink.children}</span>
                  </div>
                </NavLink>
              ))}
        </Fragment>
      )}
    </div>
  );
};

export default MobileMenuItems;
