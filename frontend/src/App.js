import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Root from "./components/Root"
import {ToastContainer} from "react-toastify";
const App = () => (
    <>
        <Root />
        <ToastContainer/>
    </>
)
export default App