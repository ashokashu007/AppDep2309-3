import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import DailyStatusUpdate from "./Components/DailyStatusUpdate";
import Tasks from "./Components/Tasks";
import Messages from "./Components/Messages";
import EditProfile from "./Components/EditProfile";
import DeletProfile from "./Components/DeletProfile";
import UseEffect from "./Components/UseEffect";
import { useState } from "react";

function App() {

let [show,setShow] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route
          path="/DailyStatusUpdate"
          element={<DailyStatusUpdate />}
        ></Route>
        <Route path="/Tasks" element={<Tasks />}></Route>
        <Route path="/Messages" element={<Messages />}></Route>
        <Route path="/EditProfile" element={<EditProfile />}></Route>
        <Route path="DeletProfile" element={<DeletProfile />}></Route>
      </Routes>
      <br></br>

      <div className="App">
        <button onClick={()=>{
          if(show==true){
            setShow(false)
          }else{
            setShow(true)
          }
        }}>Toggle UseEffect</button>
        <br></br>      <br></br>
    {show==true?<UseEffect/>:null}
      </div>
    </BrowserRouter>
  );
}

export default App;
