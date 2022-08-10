import "./Back2.css";
import React, { useEffect, useState } from 'react';



export default function Back2(){
  
 // var date1 = new Date("06/26/2018"); // mm/dd/yyyy format
 // var date2 = new Date(); // current date
 // var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
  //var timeDiffInSecond = Math.ceil(timeDiff / 1500080); // in second
  const [usersRegistered,setUsersRegistered] = useState(87219);
  const [bitcoinsWon,setBitcoinsWon] = useState(parseFloat(150));

  useEffect(()=>{
    var interval = setInterval( ()=>{
      // var date2 = new Date(); // current date
      // var timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
      // var timeDiffInSecond = Math.ceil(timeDiff / 1000); // in second
      setUsersRegistered(prev => prev+15);
    
    setBitcoinsWon(prev=>parseFloat(prev+0.00001).toFixed(6));
    },790)
    return ()=>{
      clearInterval(interval);
    }
  },[])

    return(
       <div>
         <div className="backmax2">
         

        
         <div className="set2">
{/*              <div className="rot2"><img src={require("./images/b4.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b1.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b1.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b3.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b4.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b3.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/doller.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b3.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b1.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b1.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b3.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/doller.png")} alt="" /></div> */}
             <div className="rot2"><img src={require("./images/free2.png")} alt="" /></div>
 {/*             <div className="rot2"><img src={require("./images/dollar.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/dollar.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/doller.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b4.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b1.png")} alt="" /></div>
             <div className="rot2"><img src={require("./images/b4.png")} alt="" /></div> */}
             <div className="rot2"><img src={require("./images/free2.png")} alt="" /></div>
            {/*  <div className="rot2"><img src={require("./images/b3.png")} alt="" /></div> */}
            <div className="rot2"><img src={require("../Wheel/btc.png")} alt="" /><h3 className='randomvals'>Total Bitcoins Won : {bitcoinsWon}</h3></div>
            <div className="rot2"><img src={require("../Wheel/user.png")} alt="" /><h3 className='randomvals'>Total Users Registered : {usersRegistered}</h3></div>

     
     
 {/*     <div className="Stats-sides">
        <div>
        
        </div>
        <div>

        </div>
     </div> */}
      

        

         </div>
     </div>
       </div>
       
           
            

    );
}