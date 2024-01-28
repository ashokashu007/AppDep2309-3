import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    if (storeObj && storeObj.loginReducer.loginDetails && storeObj.loginReducer.loginDetails.email) {
    } else {
      navigate("/");
    }
  }, []);

  let highLightActiveLink = (obj) => {
    if (obj.isActive == true) {
      return { backgroundColor: "cyan", color: "black", fontWeight: "550" };
    }
  };

  let deletProfile = async (req, res) => {
    let url = `http://localhost:3456/deleteProfile?email=${storeObj.loginReducer.loginDetails.email}`;

    let reqOptions = {
      method: "Delete",
    };

    let JSONData = await fetch(url, reqOptions);

    let JSOData = await JSONData.json();

    if(JSOData.status=="success"){
      alert(JSOData.msg);
      navigate("/");
    }
  };

  return (
    <nav>
      <NavLink
        to="/Home"
        className="navlink"
        style={(obj) => {
          return highLightActiveLink(obj);
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/DailyStatusUpdate"
        className="navlink"
        style={(obj) => {
          return highLightActiveLink(obj);
        }}
      >
        DailyStatusUpdate
      </NavLink>
      <NavLink
        to="/Tasks"
        className="navlink"
        style={(obj) => {
          return highLightActiveLink(obj);
        }}
      >
        Tasks
      </NavLink>
      <NavLink
        to="/Messages"
        className="navlink"
        style={(obj) => {
          return highLightActiveLink(obj);
        }}
      >
        Messages
      </NavLink>
      <NavLink
        to="/EditProfile"
        className="navlink"
        // style={(obj) => {
        //   return highLightActiveLink(obj);
        // }}
      >
        Edit Profile
      </NavLink>
      <NavLink
        to="/DeletProfile"
        className="navlink"
        style={(obj) => {
          return highLightActiveLink(obj);
        }}
        onClick={() => {
          deletProfile();
        }}
      >
        Delet Profile
      </NavLink>
      <NavLink to="/" className="navlink" 
      onClick={()=>{
        localStorage.clear();
      }}
      >
        LogOut
      </NavLink>
    </nav>
  );
}

export default TopNavigation;
