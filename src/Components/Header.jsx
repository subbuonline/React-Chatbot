import React from "react";
import Switch from '@mui/material/Switch';

import { useEffect } from "react";
export default function Header({handlelang}) {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    localStorage.setItem("lang","english")

  }, []);
  

const handleChange = (event) => {

    setChecked(!checked)
if(event.target.checked==true){

      handlelang('hi-IN')
 
}
else{
  handlelang('en-US')
}


  };


  return <div className="header">&nbsp;  Chatbot Assistant
  
  <div className="head">  <span> Hindi</span><Switch
    
    color="default"
    checked={checked}
    onChange={handleChange}
    // inputProps={{ 'aria-label': 'controlled' }}
  /> 
 </div>  </div>;
}
