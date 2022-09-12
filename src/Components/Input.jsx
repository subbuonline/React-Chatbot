import React, { useState,useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import { CardContent } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect } from "react";
  
export default function Input({ onSend,value,lan,d}) {
  const [text, setText] = useState();
  const { transcript, resetTranscript } = useSpeechRecognition();


  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);


  useEffect(() => {
    setText(d)
  
  }, [d])

  
  const handleReset = () => {
     
    resetTranscript();
    setText("")
    

  };

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const handleSend = e => {
    handleReset()
    e.preventDefault();
    var data ={ "message":text,"payload":'empty', key:'empty'}
    onSend(data);


    setText("");
  };



  
  const handleListing = () => {

    console.log(lan)
    if(isListening==false){
      

      resetTranscript();

      setIsListening(true);

      
      microphoneRef.current.classList.add("listening");
 
     SpeechRecognition.startListening({
       continuous: true,language: lan

     });
       
     setText(transcript)
     
    }
    

    else{
      setTimeout(() => {
    
      }, 1000);
       
      resetTranscript();
  
     setIsListening(false);
    
     
     microphoneRef.current.classList.remove("listening");

     SpeechRecognition.stopListening();
     setText(transcript)
     resetTranscript();
    }
 
 
 
   };
  
  return (
    <div className="input">
      <form onSubmit={handleSend}>
      
       
       <span  className="microphone"  ref={microphoneRef}
         onClick={handleListing}>
         {isListening ? <MicIcon/>: <MicOffIcon/>}
        </span>


        <input
        lang={'en-US'}
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder={transcript}
        />
        <button>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>








      <div className="microphone-wrapper">
      
  
       
      {transcript && (
        <div className="microphone-result-container">
         
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>


    </div>
  );
}
