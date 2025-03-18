import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterLinks from "./ui/FooterLinks";
import ROUTES from "../../router/ROUTES";

const email = "Adir10500@gmail.com";

const Footer = () => {
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleEmailClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom,
      left: rect.left + rect.width / 2,
    });
    setPopoverOpen(!popoverOpen);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
  };

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Fragment>
      <div className="w-full bg-gray-800 py-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <h2 className="text-white text-xl font-medium text-center">
                Contact us
              </h2>
            </div>
            <div className="w-full sm:w-1/2 flex justify-center">
              <div className="flex items-center">
                <a
                  href="https://www.linkedin.com/in/adir-dahari/"
                  className="p-2 mx-2 text-white hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/AdirDahari"
                  className="p-2 mx-2 text-white hover:text-gray-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <button
                  onClick={handleEmailClick}
                  className="p-2 mx-2 text-white hover:text-red-400 transition-colors relative"
                  aria-label="Email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popoverOpen && (
        <div
          className="absolute bg-white rounded shadow-lg z-50"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center p-2">
            <p className="px-2">{email}</p>
            <button
              onClick={handleCopyEmail}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Copy"
            >
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-gray-900 py-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <h1
                className="text-gray-200 text-xl font-mono cursor-pointer imageSmallScale"
                onClick={handleHomeClick}
              >
                Gaming Store
              </h1>
            </div>
            <div>
              <FooterLinks />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
