import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() { 
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  useEffect(() => {
    // emailInputRef.current.value = localStorage.getItem("email");

    // passwordInputRef.current.value = localStorage.getItem("password");

    if (localStorage.getItem("token")) {
      validateLoginOnLoad();
    }
  }, []);

  let validateLoginOnLoad = async () => {
    let dataToSend = new FormData();

    dataToSend.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "Post",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3456/validateToken", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status === "failure") {
      alert(JSOData.msg);
    } else {
      // localStorage.setItem("email", emailInputRef.current.value);

      // localStorage.setItem("password", passwordInputRef.current.value);

      dispatch({ type: "login", data: JSOData.data });
      navigate("/Home");
    }
  };

  let sendDataToServerThruFD = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "Post",
      body: dataToSend, 
    };

    let JSONData = await fetch("http://localhost:3456/login", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status === "failure") {
      alert(JSOData.msg);
    } else {
      // localStorage.setItem("email", emailInputRef.current.value);

      // localStorage.setItem("password", passwordInputRef.current.value);
      
      localStorage.setItem("token", JSOData.data.token);

      dispatch({ type: "login", data: JSOData.data });
      navigate("/Home");
    }
  };

  let validateLogin = ()=>{

    return async ()=>{

 
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "Post",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3456/login", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status === "failure") {
      alert(JSOData.msg);
    } else {
      // localStorage.setItem("email", emailInputRef.current.value);

      // localStorage.setItem("password", passwordInputRef.current.value);
      
      localStorage.setItem("token", JSOData.data.token);

      dispatch({ type: "login", data: JSOData.data });
      navigate("/Home");
    }
  }
  }

  return (
    <div className="App">
      <form>
        <h1>Login Form</h1>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="Password" ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              // sendDataToServerThruFD();
              dispatch(validateLogin());
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <Link to="/SignUp">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
