import React from "react";
import "./SearchFilter.css";

const SearchFilter = ({
  searchInput,
  setSearchInput,
  selectedGender,
  setSelectedGender,
  selectedAge,
  setSelectedAge,
  selectedSize,
  setSelectedSize,
  onMoreDogs,
  isAnimating
}) => {
  return (
    <div className="search-filter">
      <div className="search-filter-row">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="🔍 Search by city or breed..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <div className="filter-container">
            <label className="filter-label">Gender:</label>
            <select
              value={selectedGender || "Any"}
              onChange={(e) => setSelectedGender(e.target.value === "Any" ? null : e.target.value)}
              className="filter-select"
            >
              <option value="Any">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="filter-container">
            <label className="filter-label">Age:</label>
            <select
              value={selectedAge || "Any"}
              onChange={(e) => setSelectedAge(e.target.value === "Any" ? null : e.target.value)}
              className="filter-select"
            >
              <option value="Any">Any Age</option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          
          <div className="filter-container">
            <label className="filter-label">Size:</label>
            <select
              value={selectedSize || "Any"}
              onChange={(e) => setSelectedSize(e.target.value === "Any" ? null : e.target.value)}
              className="filter-select"
            >
              <option value="Any">Any Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>
        </div>
        
        <button
          className={`more-dogs-btn ${isAnimating ? "loading" : ""}`}
          onClick={onMoreDogs}
          disabled={isAnimating}
        >
          {isAnimating ? (
            <>
              <span className="spinner"></span>
              Loading...
            </>
          ) : (
            <>
              🐕 More Dogs!
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;