import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { useNavigate, Link } from "react-router-dom";
export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [passw, setPassw] = useState("")
    const [rpassw, setRPassw] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    useEffect(()=>{
        actions.setUser(localStorage.getItem('id'))
    },[])
    return (
        <div className="dashboardback">
        <div className="container dashboardcontainer">
            <div className="row">
                <div className="col-lg-2 col-sm-12">
                    <Link to="/profile">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://i.pinimg.com/originals/20/99/23/2099239a74d0626bd914f2711174327e.jpg" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">My Profile</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <Link to="/favorites">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://img.freepik.com/premium-vector/heart-line-icon-like-dislike-feedback-favorites-rating-popularity-social-networks-photos-feedback-concept-vector-sticker-line-icon-white-background_727385-831.jpg" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">My Favorites</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <Link to="/plantblog">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgB2he3_UKZ1Dt2sgPuwBAEXSrb-xuSCUH8w&s" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">Blogs</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <Link to="/searchplant">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://st.depositphotos.com/57803962/57308/v/450/depositphotos_573087738-stock-illustration-search-web-icon-simple-illustration.jpg" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">My Search</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <Link to="/library">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://i.pinimg.com/736x/35/48/09/354809cd3b95e7dc857de22a3609a0a1.jpg" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">My Library</h5>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <Link to="/my-garden">
                        <div className="card carddashboard">
                            <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZt9BPPBqT_DNvF4zMO_9LZooXsIZU6eqOA&s" alt="Card image cap" />
                            <div className="card-body cbdashboard">
                                <h5 className="card-title">My Garden</h5>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>  
    </div> 
    );
};
