import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import { PopupSearch } from "../component/popupSearch";

export const SearchPlant = () => {
	const { store, actions } = useContext(Context);

	const [filterList, setFilterList] = useState([
		{
			id: 105,
			name: "Annual",
			value: "annual"
		},
		{
			id: 106,
			name: "Perennial",
			value: "perennial"
		},
		{
			id: 107,
			name: "Flowers",
			value: "flower"
		},
		{
			id: 111,
			name: "Trees",
			value: "tree"
		},
		{
			id: 113,
			name: "Ground cover",
			value: "ground cover"
		},
		{
			id: 118,
			name: "Shrubs",
			value: "shrub"
		},
		{
			id: 108,
			name: "Blooms in spring",
			value: "spring"
		},
		{
			id: 112,
			name: "Blooms in summer",
			value: "summer"
		},
		{
			id: 114,
			name: "Blooms in fall",
			value: "fall"
		},
		{
			id: 109,
			name: "Plants for full sun",
			value: "sun"
		},
		{
			id: 115,
			name: "Plants for part sun",
			value: "part sun"
		},
		{
			id: 116,
			name: "Plants for filtered shade",
			value: "filtered shade"
		},
		{
			id: 117,
			name: "Plants for shade",
			value: "shade"
		},
		{
			id: 110,
			name: "Edible",
			value: "edible"
		},
		{
			id: 119,
			name: "Blooming",
			value: "blooming"
		}
	]);
	const [searchLists, setSearchLists] = useState(store.plantLibrary);
	const [activeFilter, setActiveFilter] = useState([]);
	const [filteredList, setFilteredList] = useState(null);
	const [searchInputs, setSearchInputs] = useState({
		name: "",
		zone: "",
		color: ""
	});

	const [isOpen, setIsOpen] = useState(false);
	const [readMorePlantInfo, setReadMorePlantInfo] = useState({});

	const helper = el => {
		setIsOpen(!isOpen);
		setReadMorePlantInfo(el);
	};

	const onFilterChange = term => {
		if (term === "ALL") {
			if (activeFilter.length === filterList.length) {
				setActiveFilter([]);
			} else {
				setActiveFilter(filterList.map(filter => filter.value));
			}
		} else {
			if (activeFilter.includes(term)) {
				const filterIndex = activeFilter.indexOf(term);
				const newFilter = [...activeFilter];
				newFilter.splice(filterIndex, 1);
				setActiveFilter(newFilter);
			} else {
				setActiveFilter([...activeFilter, term]);
			}
		}
	};

	useEffect(() => {
		if (activeFilter.length === 0) {
			setFilteredList(null);
		}
		if (activeFilter.length === filterList.length) {
			setFilteredList(searchLists);
		} else {
			setFilteredList(
				searchLists.filter(item => {
					return (
						activeFilter.includes(item.growthCycle) ||
						activeFilter.includes(item.plantType) ||
						activeFilter.includes(item.plantIs) ||
						activeFilter.includes(item.bloomTime ? item.bloomTime[0] : "nothing") ||
						activeFilter.includes(item.bloomTime ? item.bloomTime[1] : "nothing") ||
						activeFilter.includes(item.bloomTime ? item.bloomTime[2] : "nothing") ||
						activeFilter.includes(item.lightExposure ? item.lightExposure[0] : "nothing") ||
						activeFilter.includes(item.lightExposure ? item.lightExposure[1] : "nothing") ||
						activeFilter.includes(item.lightExposure ? item.lightExposure[2] : "nothing") ||
						activeFilter.includes(item.lightExposure ? item.lightExposure[3] : "nothing") ||
						activeFilter.includes(item.commonName) ||
						activeFilter.includes(item.hardinessZone ? item.hardinessZone[0] : "nothing") ||
						activeFilter.includes(item.hardinessZone ? item.hardinessZone[1] : "nothing") ||
						activeFilter.includes(item.hardinessZone ? item.hardinessZone[2] : "nothing") ||
						activeFilter.includes(item.flowerColor ? item.flowerColor[0] : "nothing") ||
						activeFilter.includes(item.flowerColor ? item.flowerColor[1] : "nothing")
					);
				})
			);
		}
	}, [activeFilter]);

	return (
		<div className="container-fluid">
			<h1 className="text-center py-3 heading">Search for a Plant</h1>
			<p className="text-center mb-1">
				<img src="https://i.imgur.com/2cNthnK.png" alt="lens" />
			</p>
			<div className="d-flex my-3 p-5">
				<form
					className="w-50 rounded search-box p-5 "
					style={{
						background: "linear-gradient(to bottom, #f9f3c8, rgba(255,0,0,0))",
						height: "fit-content"
					}}>
					<div className="form-check d-block form-check-inline">
						<input
							className="form-check-input"
							type="checkbox"
							id="all"
							value="all"
							onChange={() => onFilterChange("ALL")}
							checked={activeFilter.length === filterList.length}
						/>
						<label className="form-check-label" htmlFor="all">
							ALL
						</label>
					</div>
					{filterList.map(filter => (
						<div className="form-check d-block form-check-inline" key={filter.id}>
							<input
								className="form-check-input"
								type="checkbox"
								id={filter.id}
								value={filter.value}
								onChange={e => onFilterChange(filter.value)}
								checked={activeFilter.includes(filter.value)}
							/>
							<label className="form-check-label mr-3" htmlFor={filter.id}>
								{filter.name}
							</label>
						</div>
					))}
					<div className="d-flex my-3">
						<input
							className="form-control w-75 me-2"
							type="search"
							value={searchInputs.name}
							placeholder="Search by Common Name"
							aria-label="Search by Common Name"
							onChange={e => setSearchInputs({ ...searchInputs, name: e.target.value })}
						/>
						<button
							className="btn btn-style2"
							type="button"
							onClick={() => onFilterChange(searchInputs.name)}>
							Find plant
						</button>
					</div>
					<div className="d-flex my-3">
						<input
							className="form-control w-75 me-2"
							type="search"
							value={searchInputs.zone}
							placeholder="Search by Zone"
							aria-label="Search by Zone"
							onChange={e => setSearchInputs({ ...searchInputs, zone: e.target.value })}
						/>
						<button
							className="btn btn-style2"
							type="button"
							onClick={e => onFilterChange(searchInputs.zone)}>
							Find plant
						</button>
					</div>
					<div className="d-flex my-3">
						<input
							className="form-control w-75 me-2"
							type="search"
							value={searchInputs.color}
							placeholder="Search by Flower Color"
							aria-label="Search by Flower Color"
							onChange={e => setSearchInputs({ ...searchInputs, color: e.target.value })}
						/>
						<button
							className="btn btn-style2"
							type="button"
							onClick={e => onFilterChange(searchInputs.color)}>
							Find plant
						</button>
					</div>
				</form>
				<ul className="w-50" style={{ listStyleType: "none" }}>
					{filteredList &&
						filteredList.map((item, i) => {
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
														<button
															onClick={() => actions.addFavorite(item, store.user.id)}
															className="btn btn-style"
															type="button">
															<i className="fa-regular fa-heart"></i>
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
						})}
					{isOpen && <PopupSearch plant={readMorePlantInfo} handlePopupSearch={() => setIsOpen(false)} />}
				</ul>
			</div>
		</div>
	);
};