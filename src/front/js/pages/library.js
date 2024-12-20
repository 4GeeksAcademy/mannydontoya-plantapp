import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Library = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getPlantList();
    }, []);
    return (
        <div className="container py-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {store.plantList.map((plant) => (
                    <div className="col" key={plant.id}>
                        <div className="card h-100">
                            {plant.default_image ? (
                                <img
                                    src={plant.default_image.medium_url}
                                    className="card-img-top"
                                    alt={plant.common_name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            ) : (
                                <div
                                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                    style={{ height: "200px" }}
                                >
                                    No Image Available
                                </div>
                            )}
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">{plant.common_name}</h5>
                                    {/* <button
                                        className="btn btn-outline-success"
                                        onClick={() => actions.addToFavorites(plant)}
                                    >
                                        <i className="fa-regular fa-heart"></i>
                                    </button> */}
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {plant.scientific_name.join(', ')}
                                </h6>
                                <div className="card-text">
                                    <p className="mb-1">
                                        <strong>Cycle:</strong> {plant.cycle}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Sunlight:</strong> {plant.sunlight.join(', ')}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Watering:</strong> {plant.watering}
                                    </p>
                                    {plant.other_name && plant.other_name.length > 0 && (
                                        <p className="mb-1">
                                            <strong>Other Names:</strong> {plant.other_name.join(', ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* <div className="card-footer bg-transparent">
                                <Link
                                    to={`/plant/${plant.id}`}
                                    className="btn btn-primary me-2"
                                >
                                    View Details
                                </Link>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => actions.addToFavorites(plant)}
                                >
                                    Add to Favorites */}
                            {/* </button> */}
                            {/* <button onClick={() => actions.addFavorite(plant)}>Add to Favorites</button>
                                <button onClick={() => actions.removeFavorite(plant.id)}>Remove from Favorites</button> */}
                            {/* </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


//                 store.plantList.slice(0, 10).map((plant) =>{
//                     return <div key={plant.id}>
//                         <h1>{plant.common_name}</h1>
//                         <h2>id: {plant.id}</h2>
//                     </div>
//                 })
//             } */}
//         </div >
//     );
// };
