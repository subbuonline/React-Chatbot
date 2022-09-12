import React, { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';

export default function BotMessage({ fetchMessage,subitems ,onSend,handle_select}) {
  const [isLoading, setLoading] = useState(true);
 
  const [message, setMessage] = useState("");

  const [text,settext]=useState();


  useEffect(() => {
   
    
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  } , [fetchMessage]);


  return (<>
  <div className="message-container">  <div className="bot-message"  >{isLoading ? "..." : message}</div></div>
    
    <div className="message-container">
      
   

      {
      subitems.length>0? 
      <>
     
      <div>
        

        {
          subitems.map((item,index)=>( index%2==0  ? <Button key={index}
            sx={{
             borderRadius:'50px',
             marginRight:'8px',
           
             marginTop:'10px',
             boxShado:'10px'
            }}
            variant="contained"   onClick={()=> {
              handle_select(item.title);} }> { item.title } </Button>:"")   )
        }  

 </div></>
      :

     <></>

      }
     
      
    </div>
</>
  );
}
