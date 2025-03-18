import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { GuestMobileLink, ProfileMobileLink } from "../../myLinks";
import { nanoid } from "nanoid";

const FooterLinks = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const renderIcon = (icon) => {
    if (!icon) return null;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
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
    <div className="flex flex-wrap justify-center mt-2">
      {loggedIn
        ? ProfileMobileLink.map((myLink) => (
            <NavLink className="no-underline" key={nanoid()} to={myLink.to}>
              <div className="px-3 py-1 hover:bg-gray-800 rounded transition-colors">
                <span className="text-gray-200 hover:text-white flex items-center">
                  {myLink.icon && renderIcon(myLink.icon)}
                  {myLink.children}
                </span>
              </div>
            </NavLink>
          ))
        : GuestMobileLink.map((myLink) => (
            <NavLink className="no-underline" key={nanoid()} to={myLink.to}>
              <div className="px-3 py-1 hover:bg-gray-800 rounded transition-colors">
                <span className="text-gray-200 hover:text-white flex items-center">
                  {myLink.icon && renderIcon(myLink.icon)}
                  {myLink.children}
                </span>
              </div>
            </NavLink>
          ))}
    </div>
  );
};

export default FooterLinks;
