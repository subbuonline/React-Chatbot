import React, { useState, useEffect, useRef } from "react";
import BotMessage from "./Components/BotMessage";
import UserMessage from "./Components/UserMessage";
import Input from "./Components/Input";
import "./App.css"
import Header from "./Components/Header";
import axios from 'axios'
import Msg from "./Components/Msg.jsx"



export default function App() {

  const el = useRef(null);
  const [messages, setMessages] = useState([]);
  const [data, setdata] = useState('');
  const [lang,setlang]=useState('en-US');
  const [select,setselect]=useState();
  const [options,setoptions]=useState([]);

useEffect(() => {
  loadWelcomeMessage();
  }, [lang]);


  const loadWelcomeMessage=() =>{  
    if(lang=='en-US'){

      send({ "message":'Hi',"payload":'empty', key:'welcome'})
    }
    else{
      send(  { "message":'नमस्ते',"payload":'empty', key:'welcome'})
    }

  }

const handle_options= async text =>{setselect(text)}
const changelang=async val=>{setlang(val) }


const send = async data => {
  if(lang=='en-US')
      
      {
         axios.post('http://127.0.0.1:5000/normal', data)
       
        // .then(response => response.json())       
          .then(response => {
var i;
            for(i=0;i<response['data'].length;i++){
              if(Object.keys(response['data'][i]).includes('buttons') !=true){
                response['data'][i]['buttons']=[]
              } }

            
            if(data['key']=='welcome'){
              const newMessages = messages.concat( 
              response['data'].map((item, index) => (<BotMessage key={ messages.length+index+2}  onSend={send} handle_select={handle_options}  subitems={item["buttons"]}  fetchMessage={async () => item["text"]} /> )) );
              setMessages(newMessages);
            }

            if(data['key']=='empty'){
                
              const newMessages = messages.concat( <UserMessage key={ messages.length + 1} value={data['text']} />,
              response['data'].map((item, index) => (<BotMessage key={ messages.length+index+2}  onSend={send} handle_select={handle_options}  subitems={item["buttons"]}  fetchMessage={async () => item["text"]} /> )) );
              setMessages(newMessages);

            }
            // if( Object.keys(response[0]).includes('buttons'))
            // {        
            //   const newMessages = messages.concat( <UserMessage key={ messages.length + 1} value={text} />,
            //   response.map((item, index) => (<BotMessage key={ messages.length+index+2}  onSend={send} handle_select={handle_options}  subitems={item["buttons"]}  fetchMessage={async () => item["text"]} /> )) );
            //   setMessages(newMessages);
            // }

            // else{
            //   const newMessages = messages.concat(<UserMessage key={messages.length + 1} value={text} />,
            //   response.map((item, index) => (<BotMessage key={messages.length + index + 2}  onSend={send} subitems={[]} fetchMessage={async () => item["text"]} /> )) );
            //   setMessages(newMessages);
            // }
          
          
          } )

            .catch(err => {
             window.alert("Connection error, Please check your server")
              console.log(err);
          });
           
          }
          

    if(lang=='hi-IN')
           
           {
            axios.post('http://127.0.0.1:5000/normal', data)
            
            // .then(response => response.json())       
              .then(response => {

                var i;
            for(i=0;i<response['data'].length;i++){
              if(Object.keys(response['data'][i]).includes('buttons') !=true){
                response['data'][i]['buttons']=[]
              } }

            const newMessages = messages.concat( <UserMessage key={ messages.length + 1} value={data['text']} />,
            response['data'].map((item, index) => (<BotMessage key={ messages.length+index+2}  onSend={send} handle_select={handle_options}  subitems={item["buttons"]}  fetchMessage={async () => item["text"]} /> )) );
            setMessages(newMessages);
            
    
                // if( Object.keys(response[0]).includes('buttons'))
                // {        
                //   const newMessages = messages.concat( <UserMessage key={ messages.length + 1} value={text} />,
                //   response.map((item, index) => (<BotMessage key={ messages.length+index+2}  onSend={send} handle_select={handle_options}  subitems={item["buttons"]}  fetchMessage={async () => item["text"]} /> )) );
                //   setMessages(newMessages);
                // }
    
                // else{
                //   const newMessages = messages.concat(<UserMessage key={messages.length + 1} value={text} />,
                //   response.map((item, index) => (<BotMessage key={messages.length + index + 2}  onSend={send} subitems={[]} fetchMessage={async () => item["text"]} /> )) );
                //   setMessages(newMessages);
                // }
              
              } )
                
            .catch(err => {
              window.alert("Connection error, Please check your server")
               console.log(err);
           });
              }

  };

  return (
    <div className="chatbot" >
      <Header handlelang={changelang} />
      <Msg messages={messages} />
      <Input onSend={send} lan={lang} d={select} />
    </div>

);
}
    

      

    
   
 
