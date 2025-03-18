const Search = ({ txt, onTxtChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
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
      <input
        value={txt}
        onChange={onTxtChange}
        type="text"
        placeholder="Search…"
        className="py-2 pl-10 pr-4 w-full sm:w-auto bg-white bg-opacity-20 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-70 focus:w-56 transition-all duration-300"
      />
    </div>
  );
};

export { Search };
