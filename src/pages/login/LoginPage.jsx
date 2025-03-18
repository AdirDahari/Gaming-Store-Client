import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ROUTES from "../../router/ROUTES.js";
import { validateLogin } from "../../validation/loginValidation.js";
import { storeToken } from "../../service/storeService.js";
import useAutoLogin from "../../hooks/useAutoLogin.jsx";
import MyToast from "../../messages/MyToast.js";
import server from "../../server/server";

const mode = import.meta.env.VITE_MODE;
const isDemoMode = mode === "demo";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const autoLogin = useAutoLogin();

  const handleEmailInputChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const joiResponse = validateLogin({
        email: emailValue,
        password: passwordValue,
      });
      if (joiResponse) {
        setErrorsState(joiResponse);
        return;
      }
      const data = await server.users.postLoginUser({
        email: emailValue,
        password: passwordValue,
      });

      if (!data.jwt) {
        setErrorsState({
          invalid: "Email or Password Invalid",
        });
        MyToast.warning("Email or Password Invalid");
        return;
      }
      storeToken(data.jwt, rememberMe);
      await autoLogin();
      MyToast.success("You've logged in successfully");
      navigate(ROUTES.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  const handleDemoSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = await server.users.postLoginUser({
        email: "test@gmail.com",
        password: "Abc123456!",
      });

      if (!data.jwt) {
        setErrorsState({
          invalid: "Email or Password Invalid",
        });
        MyToast.warning("Email or Password Invalid");
        return;
      }
      storeToken(data.jwt, rememberMe);
      await autoLogin();
      MyToast.success("You've logged in successfully");
      navigate(ROUTES.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to Gaming Store
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  (errorsState && errorsState.email) ||
                  (errorsState && errorsState.invalid)
                    ? "border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={emailValue}
                onChange={handleEmailInputChange}
              />
              {errorsState && errorsState.email && (
                <p className="mt-1 text-sm text-red-600">{errorsState.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${
                  (errorsState && errorsState.password) ||
                  (errorsState && errorsState.invalid)
                    ? "border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={passwordValue}
                onChange={handlePasswordInputChange}
              />
              {errorsState && errorsState.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errorsState.password}
                </p>
              )}
              {errorsState && errorsState.invalid && (
                <p className="mt-1 text-sm text-red-600">
                  {errorsState.invalid}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isDemoMode}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDemoMode
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>

          {isDemoMode && (
            <div className="mt-4 space-y-4">
              <p className="text-center text-sm text-gray-600">
                You are currently in view-only mode. To log in, click "Login as
                a guest." Any creations, changes, or deletions will not be saved
                in this mode. Enjoy!
              </p>
              <button
                type="button"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleDemoSubmit}
              >
                Login as a guest
              </button>
            </div>
          )}

          <div className="text-center mt-4">
            <RouterLink
              to={ROUTES.REGISTER}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Sign Up
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
