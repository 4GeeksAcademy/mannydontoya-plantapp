import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../img/plantapp.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoff = () => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(store.urlFetchApi + "/logoff", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Logoff response data:", data);
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("id");
            actions.setUser();
            navigate("/");
        })
        .catch(error => {
            console.error("Logout error:", error);
            // Still logout on error
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("id");
            localStorage.removeItem("user");
            actions.setUser();
            navigate("/login");
        });
    };
    useEffect(()=>{
        actions.setUser(localStorage.getItem('id'))
    },[])
    useEffect(()=>{
        console.log("User info0: "+store.user)
    },[])
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">
                        <img 
                            src={logoImg} 
                            className="rounded-circle img-fluid" 
                            style={{ width: '100px' }} 
                            alt="Logo"
                        />
                    </span>
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    {/* { */}
                    {/* (  */}
                        {/* (store.user &&!("username" in store.user)) || store.user==undefined )? ( */}
                    {!localStorage.getItem("jwt-token") ? (
                        <Link to="/signup">
                            <button className="btn btn-success">
                                Sign Up/Register <i className="fas fa-user"></i>
                            </button>
                        </Link>
                    ) : ( 
                        <div className="dropdown">
                            <button
                                className="btn btn-success dropdown-toggle ms-2"
                                type="button"
                                id="userDropdown"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                            >
                                {/* {
                                  (store.user &&("username" in store.user))?                                      
                                  store.user["username"] :
                                    ""
                                } */}
                                <span>{String("")} <i className="fas fa-user"></i></span>
                            </button>
                            <ul 
                                className={`dropdown-menu dropdown-menu-end ms-5 ${dropdownOpen ? 'show' : ''}`}
                                aria-labelledby="userDropdown"
                            >
                                 <li>
                                 <Link to="/dashboard">
                                    <button 
                                        className="dropdown-item text-success"
                                    >
                                        Dashboard
                                    </button>
                                 </Link>   
                                </li>
                                <li>
                                    <button 
                                        className="dropdown-item text-danger"
                                        onClick={handleLogoff}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logoImg from "../../img/plantapp.png";
// import { Context } from "../store/appContext";

// export const Navbar = () => {
//     const { store, actions } = useContext(Context);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();

//     const handleLogoff = () => {
//         fetch(store.urlFetchApi + "/logoff", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + localStorage.getItem("jwt-token")
//             },
//             body: JSON.stringify({ username: store.user })
//         })
//         .then(resp => resp.json())
//         .then(data => {
//             // Clear local storage and store
//             localStorage.removeItem("jwt-token");
//             actions.setUser("");
//             navigate("/login");
//         })
//         .catch(error => {
//             console.error("Logout error:", error);
//         });
//     };

//     return (
//         <nav className="navbar navbar-light bg-light">
//             <div className="container">
//                 <Link to="/">
//                     <span className="navbar-brand mb-0 h1">
//                         <img 
//                             src={logoImg} 
//                             className="rounded-circle img-fluid" 
//                             style={{ width: '100px' }} 
//                             alt="Logo"
//                         />
//                     </span>
//                 </Link>
//                 <div className="ml-auto d-flex align-items-center">
//                     <Link to="/dashboard">
//                         <button className="btn btn-success me-2">Dashboard</button>
//                     </Link>
//                     {store.user === "" ? (
//                         <Link to="/signup">
//                             <button className="btn btn-success">
//                                 Sign Up/Register <i className="fa-solid fa-user"></i>
//                             </button>
//                         </Link>
//                     ) : (
//                         <div className="dropdown">
//                             <button
//                                 className="btn btn-success dropdown-toggle"
//                                 type="button"
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 aria-expanded={dropdownOpen}
//                             >
//                                 {store.user} <i className="fa-solid fa-user"></i>
//                             </button>
//                             <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
//                                 <li>
//                                     <Link to="/profile" className="dropdown-item">
//                                         Profile
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <button 
//                                         className="dropdown-item" 
//                                         onClick={handleLogoff}
//                                     >
//                                         Sign Out
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };


// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logoImg from "../../img/plantapp.png";
// import { Context } from "../store/appContext";
// export const Navbar = () => {
// 	const { store, actions } = useContext(Context);
// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1"><img src={logoImg} className="rounded-circle img-fluid" style={{ width: '100px' }} /></span>
// 				</Link>
// 				<div className="ml-auto">

// 					<Link to="/dashboard">
// 						<button className="btn btn-success me-2">Dashboard </button>
// 					</Link>
// 					{
// 						store.user==""?
// 						<Link to="/signup">
// 						<button className="btn btn-success">Sign Up/Register <i class="fa-solid fa-user"></i></button>
// 						</Link>
// 						:
// 						<Link to="/logoff">
// 						<button className="btn btn-success">{store.user} <i class="fa-solid fa-user"></i></button>
// 						</Link>		
// 					}
					
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

