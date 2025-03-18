import { NavLink } from "react-router-dom";
import { GuestLink, ProfileLink } from "../../myLinks";
import { Fragment } from "react";
import { nanoid } from "nanoid";

const IconMenuItems = ({ loggedIn }) => {
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

  return (
    <Fragment>
      {loggedIn ? (
        <div className="hidden md:flex">
          {ProfileLink.map((myLink) => (
            <NavLink className="no-underline" key={nanoid()} to={myLink.to}>
              <div className="flex items-center px-3 py-2 text-white hover:bg-gray-700 rounded transition-colors mx-1">
                {myLink.icon && renderIcon(myLink.icon)}
                <span className="ml-2">{myLink.children}</span>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="hidden md:flex">
          {GuestLink.map((myLink) => (
            <NavLink className="no-underline" key={nanoid()} to={myLink.to}>
              <div className="flex items-center px-3 py-2 text-white hover:bg-gray-700 rounded transition-colors mx-1">
                {myLink.icon && renderIcon(myLink.icon)}
                <span className="ml-2">{myLink.children}</span>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default IconMenuItems;
