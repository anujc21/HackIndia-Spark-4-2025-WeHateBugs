import React, {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {Client, Storage} from "appwrite";
import {GoogleAuthProvider, getAuth, onAuthStateChanged} from "firebase/auth";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import {ThemeProvider, createTheme, CssBaseline, Box} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Create from "./Create.jsx";
import View from "./View.jsx";
import Explore from "./Explore.jsx";
import Presentations from "./Presentations.jsx";
import Profile from "./Profile";
import EditProfile from "./EditProfile.jsx";
import Loader from "./Loader.jsx";
import Chatbot from "./Chatbot.jsx";
import About from "./About.jsx";
import Pricing from "./Pricing.jsx";
import "./App.css";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(app);

const auth = getAuth();

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_KEY)
;

const storage = new Storage(client);

const storeKey = import.meta.env.VITE_APPWRITE_STORAGE;

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff148a"
        },
        secondary: {
            main: "#ffffff"
        },
        error: {
            main: "#ff295e"
        }
    }
});

const endpoint = "http://localhost:3000";

function App(){
    const navigate = useNavigate();

    const [page, setPage] = useState("");

    const [user, setUser] = useState({});

    const [userChecked, setUserChecked] = useState(false);

    const [currentPresentation, setCurrentPresentation] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userChecked){
            if (user.uid === "UNDEFINED" && page !== "home"){
                navigate("/login");
            }
        }
    }, [page]);

    useEffect(() => {
        if (userChecked){
            if (user.uid === "UNDEFINED" && page !== "home"){
                navigate("/login");
            }
        }
    }, [userChecked]);

    useEffect(() => {
        axios.get(`${endpoint}/`).then((res) => {
            const data = res.data;

            if (data.message === "connected"){
                setLoading(false);
            }
        });

        onAuthStateChanged(auth, (user) => {
            setUserChecked(true);

            if (user){
                axios.get(`${endpoint}/getUser`, {
                    headers: {
                        "x-user-data": JSON.stringify(user)
                    }
                }).then((res) => {
                    const data = res.data;

                    setUser(data.user);
                });
            }
            else{
                setUser({
                    uid: "UNDEFINED"
                });
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Box sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: "#000",
                overflowY: "auto"
            }}>
                <Header page={page}/>

                <Routes>
                    <Route path="/" element={<Home setPage={setPage} />}/>

                    <Route path="/login" element={<Login setPage={setPage} endpoint={endpoint} provider={provider} auth={auth} setUser={setUser}/>}/>

                    <Route path="/dashboard" element={<Dashboard setPage={setPage} user={user}/>}/>
 
                    <Route path="/create" element={<Create setPage={setPage} endpoint={endpoint} storeKey={storeKey} storage={storage} setCurrentPresentation={setCurrentPresentation} setLoading={setLoading}/>}/>
               
                    <Route path="/view" element={<View setPage={setPage} endpoint={endpoint} currentPresentation={currentPresentation} setCurrentPresentation={setCurrentPresentation} user={user}/>}/>

                    <Route path="/explore" element={<Explore setPage={setPage} endpoint={endpoint} storeKey={storeKey} user={user} storage={storage} setLoading={setLoading}/>}/>

                    <Route path="/presentations" element={<Presentations setPage={setPage} endpoint={endpoint} storeKey={storeKey} user={user} storage={storage} setLoading={setLoading}/>}/>

                    <Route path="/profile" element={<Profile setPage={setPage} auth={auth} user={user}/>}/>

                    <Route path="/about" element={<About setPage={setPage}/>}/>
                
                    <Route path="/pricing" element={<Pricing setPage={setPage}/>}/>

                    <Route path="/editProfile" element={<EditProfile setPage={setPage} endpoint={endpoint} user={user} setUser={setUser}/>}/>
                </Routes>

                <Chatbot/>

                {(loading) &&
                    <Loader loading={loading}/>
                }
            </Box>
        </ThemeProvider>
    );
}

window.oncontextmenu = (event) => {
    event.preventDefault();
};

export default App;