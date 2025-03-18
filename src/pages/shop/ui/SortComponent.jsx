import { useState } from "react";
import { nanoid } from "nanoid";
import { productStatus as status } from "../../../layout/myLists";

const SortComponent = ({
  onSearchChange,
  onInputsChange,
  platform,
  categoriesData,
  priceRange,
  color,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [txt, setTxt] = useState("");
  const [filterInputs, setFilterInputs] = useState({
    categories: "all",
    productStatus: "all",
    priceRange: [],
  });

  const handleTxtChange = (e) => {
    setTxt(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isFilterOpen) {
      onInputsChange(null);
      setFilterInputs({
        categories: "all",
        productStatus: "all",
        priceRange: [],
      });
    }
  };

  const handleOptionChange = (e) => {
    setFilterInputs((currentState) => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
    onInputsChange({ ...filterInputs, [e.target.name]: e.target.value });
  };

  const handleRangeChange = (range) => {
    setFilterInputs((currentState) => ({
      ...currentState,
      priceRange: range,
    }));
    onInputsChange({ ...filterInputs, priceRange: range });
  };

  const headerStyle = {
    backgroundColor: color || "#3B82F6",
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 text-white" style={headerStyle}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
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
            </div>
            <div>
              <h2 className="text-xl font-bold capitalize">{platform}</h2>
              <p className="text-sm text-white text-opacity-80">
                Browse all games
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                value={txt}
                onChange={handleTxtChange}
                placeholder="Search games..."
                className="w-full sm:w-48 pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:text-gray-800"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={handleFilterClick}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                isFilterOpen
                  ? "bg-white text-gray-900"
                  : "bg-gray-100 text-gray-800 border-2 border-white"
              }`}
              aria-expanded={isFilterOpen}
              aria-controls="filter-panel"
            >
              <div className="flex items-center gap-2">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        id="filter-panel"
        className={`overflow-hidden transition-all duration-300 ${
          isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Game Category
              </label>
              <select
                id="categories"
                name="categories"
                value={filterInputs.categories}
                onChange={handleOptionChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {categoriesData.map((option) => (
                  <option key={nanoid()} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="productStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Status
              </label>
              <select
                id="productStatus"
                name="productStatus"
                value={filterInputs.productStatus}
                onChange={handleOptionChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {["all", ...status].map((option) => (
                  <option key={nanoid()} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="px-2 py-1">
                {priceRange && (
                  <CustomRangeSlider
                    range={priceRange}
                    onRangeChange={handleRangeChange}
                    color={color}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Active Filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {filterInputs.categories !== "all" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Category: {filterInputs.categories}
                  </span>
                )}
                {filterInputs.productStatus !== "all" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Status: {filterInputs.productStatus}
                  </span>
                )}
                {filterInputs.priceRange.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Price: ₪{filterInputs.priceRange[0]} - ₪
                    {filterInputs.priceRange[1]}
                  </span>
                )}
                {filterInputs.categories === "all" &&
                  filterInputs.productStatus === "all" &&
                  filterInputs.priceRange.length === 0 && (
                    <span className="text-sm text-gray-500">
                      No active filters
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomRangeSlider = ({ range, onRangeChange, color }) => {
  const [value, setValue] = useState(range[1]);
  const min = range[0];
  const max = range[1];

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    onRangeChange([min, newValue]);
  };

  const rangeColor = color || "#3B82F6";

  return (
    <div className="pt-1 pb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">₪{min}</span>
        <span className="text-sm font-medium text-gray-800">₪{value}</span>
        <span className="text-sm font-medium text-gray-500">₪{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${rangeColor} 0%, ${rangeColor} ${
            ((value - min) * 100) / (max - min)
          }%, #e5e7eb ${((value - min) * 100) / (max - min)}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
};

export default SortComponent;
