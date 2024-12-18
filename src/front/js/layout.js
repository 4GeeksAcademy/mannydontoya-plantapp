import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Login } from "./pages/login";
import { Singup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { SearchPlant } from "./pages/searchPlant";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import WelcomeSection from "./pages/landingPage";
import { Library } from "./pages/library";
import PlantBlog from "./pages/plantblog";
import BlogDetails from "./component/blogDetails";
import { Dashboard } from "./pages/dashboard";
import { Favorites } from "./pages/favorites";
import { MyGarden } from "./pages/myGarden";
import { AddPlant } from "./component/addPlant";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route element={<Singup />} path="/signup" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<WelcomeSection />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Library />} path="/library" />
                        <Route element={<SearchPlant />} path="/searchplant" />
                        <Route element={<PlantBlog />} path="/plantblog" />
                        <Route element={<BlogDetails />} path="/blog/:id" />
                        <Route element={<Favorites />} path="/favorites" />
                        <Route element={ <MyGarden />} path="/my-garden" />
                        <Route element={ <AddPlant />} path="/addplant/:ind" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
