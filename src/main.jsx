import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails.jsx";

createRoot(document.getElementById("root")).render(
<Router>
    <Routes>
        <Route path='/' element ={<App/>}/>
        <Route path='/:id' element ={<MovieDetails/>}/>
    </Routes>
</Router>


);
