import React, { useEffect, useState } from 'react';
import "./wheel.css";
import Coin from "./btc.png";
import User from "./user.png";

export default function RandomVal() {
      var date1 = new Date("06/26/2018"); // mm/dd/yyyy format
  var date2 = new Date(); // current date
  var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
  var timeDiffInSecond = Math.ceil(timeDiff / 10); // in second
  const [usersRegistered,setUsersRegistered] = useState(timeDiffInSecond);
  const [bitcoinsWon,setBitcoinsWon] = useState((timeDiff/500000));
  useEffect(()=>{
  var interval = setInterval( ()=>{
    // var date2 = new Date(); // current date
    // var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
    // var timeDiffInSecond = Math.ceil(timeDiff / 1000); // in second
    setUsersRegistered(prev => prev+1);
    setBitcoinsWon(prevv => (prevv) + 0.00000005);
  },390)
  return ()=>{
    clearInterval(interval);
  }
},[])
  return (
    <div id="stats">
      <div id="foot">
      <img src={User} style={{ "width": "37%" }}/>
      <h3 id='randomvals'>Total Users Registered : {usersRegistered}</h3>
      </div>
    
    {/* <br/> */}
    <div id="foot">
    <img src={Coin}  style={{ "width": "37%" }}/>
    <h3 id='randomvals'>
    Total Bitcoins Won : {bitcoinsWon}
    </h3>
    </div>
    
  </div>  
  )
}

