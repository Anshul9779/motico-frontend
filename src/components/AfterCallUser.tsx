import React from 'react'
import Toggle from 'react-toggle';
import UserClock from './../images/UserClock.png';

export default function AfterCallUser() {
  return (
    <div style={{backgroundColor:"#FE6F87", borderRadius:'0.5em', padding:"2em",margin:"2em"}}>
      <h4 style={{color:'white'}}>AFTER CALL WORK</h4>
      <div style={{marginTop:'1em', display:'flex'}}>
        <div style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src={UserClock} alt="" />
        </div>
        <div style={{flex:1}}>
          <p style={{color:'white'}}>Allow some time after every call for your agents to process after call work</p>
          <div>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  )
}
