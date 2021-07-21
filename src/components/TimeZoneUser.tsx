import React, { useRef } from 'react'
import Toggle from 'react-toggle';
import Clock from './../images/clock.png';
import Button from './Button';

export default function TimeZoneUser() {
  const timeRef = useRef<HTMLInputElement>(null!);
  return (
    <div style={{backgroundColor:"#FE6F87", borderRadius:'0.5em', padding:"2em",margin:"2em"}}>
      <h4 style={{color:'white'}}>TIME ZONE</h4>
      <div style={{display:'flex', alignItems:'center'}}>
        <div style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src={Clock} alt="" />
        </div>
        <div style={{flex:1}}>
          <h4 style={{color:'white'}}>Select Time Zone</h4>
            <select name="" id="" style={{padding:'0.5em', outline:'none',  borderRadius:8, paddingRight:'2em'}}>
              <option value="">Delhi/Mumbai 5:30</option>
              <option value="">Delhi/Mumbai 5:30</option>
              <option value="">Delhi/Mumbai 5:30</option>
              <option value="">Delhi/Mumbai 5:30</option>
              <option value="">Delhi/Mumbai 5:30</option>
            </select>
            <div style={{display:'flex', gap:'2em', marginTop:'1em', alignItems:'center'}}>
              <Button>24x7</Button>
              <Toggle />
            </div>
            <div style={{display:'flex', gap:'2em', marginTop:'1em', alignItems:'center'}}>
              <Button onClick={() => timeRef.current.focus()}>Set Timings</Button>
              <input type="time" ref={timeRef} style={{padding:'0.5em', outline:'none',  borderRadius:8,}} />
            </div>
            <div style={{display:'flex', gap:'2em', marginTop:'1em', alignItems:'center'}}>
              <Button>Permanently Closed</Button>
              <Toggle />
            </div>
        </div>
      </div>
    </div> 
  )
}
