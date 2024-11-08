import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Library = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getPlantList();
    }, []);

    return (
        <div className="container d-flex gap-5">
            {store.plantList.slice(0, 10).map((plant) => (
                <div key={plant.id}>
                    <h1>{plant.common_name}</h1>
                    <h2>id: {plant.id}</h2>
                    <button onClick={() => actions.addFavorite(plant)}>Add to Favorites</button>
                    <button onClick={() => actions.removeFavorite(plant.id)}>Remove from Favorites</button>
                </div>
            ))}
        </div>
    );
};