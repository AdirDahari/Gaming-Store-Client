import { useState } from "react";
import { validateGameDetails } from "../../../validation/gameDetails";
import {
  categories as categoryOptions,
  platformNames as platforms,
  productStatus as status,
} from "../../../layout/myLists";

const GameForm = ({ handleNext, postData }) => {
  const [gameDetails, setGameDetails] = useState({
    platform: postData.platform,
    name: postData.game.name,
    description: postData.game.description ? postData.game.description : "",
    cate0: postData.game.category[0],
    cate1: postData.game.category[1] ? postData.game.category[1] : "",
    cate2: postData.game.category[2] ? postData.game.category[2] : "",
    productStatus: postData.game.productStatus,
    url0: postData.game.images[0].url,
    url1: postData.game.images[1] ? postData.game.images[1].url : "",
    url2: postData.game.images[2] ? postData.game.images[2].url : "",
    price: postData.game.price,
  });

  const [errorsState, setErrorsState] = useState(null);

  const handleNextClick = () => {
    const joiResponse = validateGameDetails(gameDetails);
    if (joiResponse) {
      setErrorsState(joiResponse);
      return;
    }

    handleNext(gameDetails);
  };

  const handleInputsChange = (e) => {
    setGameDetails((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOptionChange = (e) => {
    setGameDetails((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  };

  const renderTextField = (id, label, type = "text", required = true) => (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={gameDetails[id]}
        onChange={handleInputsChange}
        className={`w-full p-2 border rounded-md ${
          errorsState && errorsState[id]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } focus:border-blue-500 focus:outline-none focus:ring-2`}
      />
      {errorsState && errorsState[id] && (
        <p className="mt-1 text-sm text-red-600">{errorsState[id]}</p>
      )}
    </div>
  );

  const renderSelectField = (name, label, options, required = true) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={gameDetails[name]}
        onChange={handleOptionChange}
        className={`w-full p-2 border rounded-md ${
          errorsState && errorsState[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } focus:border-blue-500 focus:outline-none focus:ring-2`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errorsState && errorsState[name] && (
        <p className="mt-1 text-sm text-red-600">{errorsState[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Edit Game Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>{renderSelectField("platform", "Platform", platforms)}</div>
        <div>{renderTextField("name", "Game Name")}</div>

        <div>
          {renderSelectField("cate0", "Primary Category", categoryOptions)}
        </div>
        <div>
          {renderSelectField(
            "cate1",
            "Secondary Category",
            categoryOptions,
            false
          )}
        </div>
        <div>
          {renderSelectField(
            "cate2",
            "Additional Category",
            categoryOptions,
            false
          )}
        </div>
        <div>
          {renderSelectField("productStatus", "Product Status", status)}
        </div>

        <div>{renderTextField("price", "Price", "number")}</div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Game Images</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {renderTextField("url0", "Main Image URL")}
          {renderTextField("url1", "Additional Image URL", "text", false)}
          {renderTextField("url2", "Additional Image URL", "text", false)}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={gameDetails.description}
          onChange={handleInputsChange}
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={handleNextClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GameForm;
