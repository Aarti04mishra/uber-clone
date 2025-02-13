import React from "react";

const LocationSearchPanel = ({ suggestions, handleSelectLocation }) => {
  return (
    <div>
      {suggestions.length === 0 ? (
        <p className="text-center text-gray-500">No suggestions available.</p>
      ) : (
        suggestions.map((elem, idx) => (
          <div
            key={elem.place_id || idx} // Use a unique key like place_id if available
            onClick={() => handleSelectLocation(elem.description, "pickup")} // Pass only the description
            role="button"
            tabIndex={0}
            className="flex items-center gap-3 my-5 active:border-black border-2 p-2 rounded-2xl cursor-pointer"
          >
            <div>
              {/* Render the description or any other property */}
              <h2 className="font-medium text-gray-700">{elem.description}</h2>
              {/* Render additional details like secondary text */}
              {elem.secondary_text && (
                <p className="text-sm text-gray-500">{elem.secondary_text}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
