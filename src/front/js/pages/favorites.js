import React, { useContext } from "react";
import { Context } from "../store/appContext";
export const Favorites = () => {
    const { store, actions } = useContext(Context);
    return (
        <div>
            <h1>Favorited Plants</h1>
            {
                store.favoritePlantList && store.favoritePlantList.map((item, i) => {
                    return (
                        <div key={i} style={{ maxHeight: "350px" }}>
                            <li className="search-box search-results p-0">
                                <div
                                    className="card  "
                                    style={{ maxWidth: "100%", maxHeight: "100%", backgroundColor: "#f9f3c8" }}>
                                    <div className="row g-0" style={{ maxWidth: "100%", maxHeight: "100%" }}>
                                        <div
                                            className="col-md-3 d-flex"
                                            style={{ maxWidth: "100%", maxHeight: "150px" }}>
                                            <img
                                                src={item.plantImage}
                                                className="img-fluid rounded-start align-self-center ml-3 search-results-img"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ color: "green" }}>
                                                    {item.commonName} ({item.scientificName})
                                                </h5>
                                                <p className="card-text d-flex justify-content-between">
                                                    <span>
                                                        Plant:{" "}
                                                        <i style={{ color: "yellowgreen" }}>{item.plantType}</i>
                                                    </span>
                                                    <span>
                                                        Growth:{" "}
                                                        <i style={{ color: "yellowgreen" }}>
                                                            {item.growthCycle}
                                                        </i>
                                                    </span>
                                                    {/* <span>
                                                    Hardiness:{" "}
                                                    <i style={{ color: "yellowgreen" }}>
                                                        {item.hardinessZone.toString()}
                                                    </i>
                                                </span> */}
                                                </p>
                                                <button
                                                    onClick={() => helper(item)}
                                                    className="btn btn-style"
                                                    type="button">
                                                    Read more
                                                </button>
                                                {/* <button
                                                    onClick={() => actions.addFavorite(item, store.user.id)}
                                                    className="btn btn-style"
                                                    type="button">
                                                    Add To Favorites
                                                </button> */}
                                                <button
                                                    onClick={() => actions.removeFavorite(item)}
                                                    className="btn btn-style"
                                                    type="button"
                                                >
                                                    Remove from Favorites
                                                </button>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Last updated 3 mins ago
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    );
                })}</div>
    )
}