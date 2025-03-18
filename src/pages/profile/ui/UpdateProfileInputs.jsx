const UpdateProfileInputs = ({
  inputsValue,
  handleInputsChange,
  errorsState,
}) => {
  const renderInputField = (id, label, required = false) => (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={inputsValue[id] || ""}
        onChange={handleInputsChange}
        className={`w-full p-2 border rounded-md focus:ring-2 focus:outline-none ${
          errorsState && errorsState[id]
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
        }`}
      />
      {errorsState && errorsState[id] && (
        <p className="mt-1 text-sm text-red-600">{errorsState[id]}</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="sm:col-span-2 md:col-span-3">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Personal Information
        </h3>
      </div>

      {renderInputField("first", "First Name", true)}
      {renderInputField("middle", "Middle Name")}
      {renderInputField("last", "Last Name", true)}
      {renderInputField("phone", "Phone Number", true)}
      {renderInputField("url", "Profile Image URL")}

      <div className="sm:col-span-2 md:col-span-3">
        <h3 className="text-lg font-medium text-gray-700 mb-3 mt-2">
          Address Information
        </h3>
      </div>

      {renderInputField("state", "State")}
      {renderInputField("country", "Country", true)}
      {renderInputField("city", "City", true)}
      {renderInputField("street", "Street", true)}
      {renderInputField("houseNumber", "House Number", true)}
      {renderInputField("zip", "Zip Code")}
    </div>
  );
};

export default UpdateProfileInputs;
