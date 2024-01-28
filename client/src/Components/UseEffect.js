import React, { useEffect, useState } from "react";

function UseEffect() {
  let [score, setScore] = useState(0);
  let [wickets, setWickets] = useState(0);
  let [balls, setBalls] = useState(0);

  useEffect(() => {
    console.log("component loaded");
  }, []);

  useEffect(() => {
    return () => {
      console.log("component Unloaded");
    };
  }, []);

  useEffect(() => {
    console.log("on score state variable changed");
  }, [score]);

  useEffect(() => {
    console.log("on wickets state variable changed");
  }, [wickets]);

  useEffect(() => {
    console.log("on balls state variable changed");
  }, [balls]);

  useEffect(() => {
    console.log("either score or balls state variable changed");
  }, [score,balls]);

  useEffect(() => {
    console.log("either wickets or balls state variable changed");
  }, [wickets,balls]);

  useEffect(() => {
    console.log("either score or wickets state variable changed");
  }, [score,wickets]);

  useEffect(() => {
    console.log("any state variable changed");
});

  return (
    <center>
      <div className="effect">
        <h1>Score : {score}</h1>
        <button
          onClick={() => {
            setScore(score + 1);
          }}
        >
          score++
        </button>
        <button
          onClick={() => {
            setScore(score - 1);
          }}
        >
          score--
        </button>
        <hr></hr>
        <h1>Wickets : {wickets}</h1>
        <button
          onClick={() => {
            setWickets(wickets + 1);
          }}
        >
          wickets++
        </button>
        <button
          onClick={() => {
            setWickets(wickets - 1);
          }}
        >
          wickets--
        </button>
        <hr></hr>
        <h1>Balls : {balls}</h1>
        <button
          onClick={() => {
            setBalls(balls + 1);
          }}
        >
          balls+1
        </button>
        <button
          onClick={() => {
            setBalls(balls - 1);
          }}
        >
          balls-1
        </button>
      </div>
    </center>
  );
}

export default UseEffect;
