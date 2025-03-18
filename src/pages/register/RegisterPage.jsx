import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ROUTES from "../../router/ROUTES";
import { validateRegister } from "../../validation/registerValidation";
import { registerNormalization } from "./registerNormalization";
import MyToast from "../../messages/MyToast";
import server from "../../server/server";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const joiResponse = validateRegister(inputsValue);
      if (joiResponse) {
        setErrorsState(joiResponse);
        return;
      }
      const requestBody = registerNormalization(inputsValue);
      await server.users.postCreateUser(requestBody);
      MyToast.success("You have successfully registered");
      navigate(ROUTES.HOME);
    } catch (err) {
      MyToast.error("Something wrong, Please try again later");
    }
  };

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our gaming community today
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first"
                      name="first"
                      autoComplete="given-name"
                      value={inputsValue.first}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.first
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.first && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.first}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="middle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="middle"
                      name="middle"
                      value={inputsValue.middle}
                      onChange={handleInputsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last"
                      name="last"
                      autoComplete="family-name"
                      value={inputsValue.last}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.last
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.last && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.last}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={inputsValue.email}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.email
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      value={inputsValue.password}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.password
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={inputsValue.phone}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.phone
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="country"
                      name="country"
                      autoComplete="country"
                      value={inputsValue.country}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.country
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.country}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      value={inputsValue.state}
                      onChange={handleInputsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={inputsValue.city}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.city
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.city}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="street"
                      name="street"
                      autoComplete="street-address"
                      value={inputsValue.street}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.street
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.street && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.street}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="houseNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    House Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      value={inputsValue.houseNumber}
                      onChange={handleInputsChange}
                      className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 ${
                        errorsState && errorsState.houseNumber
                          ? "border-red-300"
                          : "border"
                      }`}
                    />
                    {errorsState && errorsState.houseNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsState.houseNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      autoComplete="postal-code"
                      value={inputsValue.zip}
                      onChange={handleInputsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Profile Image (Optional)
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="url"
                      name="url"
                      value={inputsValue.url}
                      onChange={handleInputsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="alt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Alt Text
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="alt"
                      name="alt"
                      value={inputsValue.alt}
                      onChange={handleInputsChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <NavLink
              to={ROUTES.LOGIN}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
