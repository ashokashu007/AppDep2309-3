import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  let fnInputRef = useRef(); 
  let lnInputRef = useRef();
  let ageInputRef = useRef(); 
  let emailInputRef = useRef();   
  let passwordInputRef = useRef();
  let pPInputRef = useRef();
  let [profilePic, setProfilePic] = useState("./images/pic.png");

  let sendDataToServerThruFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", fnInputRef.current.value);
    dataToSend.append("lastName", lnInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < pPInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", pPInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "Post",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status === "success") {
      alert(JSOData.msg);
    } else {
      alert(JSOData.err);
    }

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h1>SignUp Form</h1>
        <div>
          <label>First Name</label>
          <input ref={fnInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lnInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={pPInputRef}
            type="file"
            onChange={(e) => {
              let selectedPic = URL.createObjectURL(e.target.files[0]);

              setProfilePic(selectedPic);
            }}
          ></input>
        </div>
        <div>
          <img className="profilePic" src={profilePic}></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendDataToServerThruFD();
            }}
          >
            SignUp
          </button>
        </div>
      </form>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
