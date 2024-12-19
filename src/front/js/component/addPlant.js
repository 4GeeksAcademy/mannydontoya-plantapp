import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddPlant = () => {
    const { store, actions } = useContext(Context);
    const params = useParams(); // Captures route parameters
    const navigate = useNavigate(); // Navigate programmatically
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term

    // Function to add the selected plant to the garden slot
    const addPlantToGrid = (plant) => {
        let localGrid = [...store.grid]; // Create a copy of the existing grid
        localGrid[parseInt(params.ind)].plant = plant; // Update the specific grid slot with the plant
        actions.setGrid(localGrid); // Update the global store with the new grid
        navigate("/my-garden"); // Navigate back to the garden page
    };

    return (
        <div className="container">
            <h1 className="display-4">Adding plant to garden slot: {params.ind}</h1>
            <hr className="my-4" />
            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search for a plant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} // Ensure case-insensitive search
            />

            {/* Search Results */}
            <ul className="search-results list-group">
                {searchTerm &&
                    store.plantLibrary
                        .filter((plant) =>
                            plant.commonName.toLowerCase().startsWith(searchTerm) // Match plant names
                        )
                        .map((plantResult, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                onClick={() => addPlantToGrid(plantResult)}
                                style={{ cursor: "pointer" }}
                            >
                                {plantResult.commonName}
                            </li>
                        ))}
            </ul>

            {/* Back Button */}
            <Link to="/my-garden">
                <button className="btn btn-primary btn-lg mt-4">
                    Back to Grid
                </button>
            </Link>
        </div>
    );
};
