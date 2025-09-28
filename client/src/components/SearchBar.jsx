const SearchBar =({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search blogs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg hover:shadow-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
    />
  );
};

export default SearchBar;
